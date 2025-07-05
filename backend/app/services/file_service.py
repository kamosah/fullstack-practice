import hashlib
import json
import uuid
from typing import Dict, List, Optional

from fastapi import HTTPException, UploadFile
from sqlalchemy import select

from app.core.database import AsyncSessionLocal
from app.models.file import StoredFile
from app.services.content_extraction import content_extraction_service
from app.services.s3_service import s3_service


class FileService:
    """Service for handling file uploads and storage in database as BLOBs."""

    def __init__(self):
        self.max_file_size = 50 * 1024 * 1024  # 50MB
        self.allowed_extensions = {
            "txt",
            "pdf",
            "doc",
            "docx",
            "jpg",
            "jpeg",
            "png",
            "gif",
            "csv",
            "xlsx",
            "xls",
            "ppt",
            "pptx",
            "md",
            "json",
            "xml",
        }
        self.allowed_mime_types = {
            "text/plain",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/jpg",
            "text/csv",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "text/markdown",
            "application/json",
            "application/xml",
        }

    def _get_file_extension(self, filename: str) -> str:
        """Extract file extension from filename."""
        return filename.split(".")[-1].lower() if "." in filename else ""

    def _calculate_file_hash(self, file_data: bytes) -> str:
        """Calculate SHA-256 hash of file data for deduplication."""
        return hashlib.sha256(file_data).hexdigest()

    def _validate_file(self, file: UploadFile, file_data: bytes) -> None:
        """Validate file size, extension, and content type."""
        # Check file size
        if len(file_data) > self.max_file_size:
            raise HTTPException(
                status_code=413,
                detail=f"File size ({len(file_data)} bytes) exceeds maximum allowed size ({self.max_file_size} bytes)",
            )

        # Check file extension
        extension = self._get_file_extension(file.filename or "")
        if extension not in self.allowed_extensions:
            raise HTTPException(
                status_code=415,
                detail=f"File extension '.{extension}' is not allowed. Allowed: {', '.join(self.allowed_extensions)}",
            )

        # Check MIME type
        if file.content_type not in self.allowed_mime_types:
            raise HTTPException(
                status_code=415,
                detail=f"MIME type '{file.content_type}' is not allowed",
            )

    async def upload_files(self, files: List[UploadFile]) -> List[Dict]:
        """Upload files to S3 and store metadata in the database."""
        uploaded_files = []

        async with AsyncSessionLocal() as session:
            for file in files:
                try:
                    # Read file data
                    file_data = await file.read()

                    # Validate file
                    self._validate_file(file, file_data)

                    # Calculate hash for deduplication
                    file_hash = self._calculate_file_hash(file_data)

                    # Check if file already exists (deduplication)
                    existing_file = await session.execute(
                        select(StoredFile).where(StoredFile.file_hash == file_hash)
                    )
                    existing_file = existing_file.scalar_one_or_none()

                    if existing_file:
                        # File already exists, return existing file info
                        uploaded_files.append(
                            {
                                "id": existing_file.id,
                                "fileName": existing_file.original_filename,
                                "fileUrl": s3_service.get_s3_url(existing_file.s3_key),
                                "fileSize": existing_file.file_size,
                                "mimeType": existing_file.content_type,
                                "metadata": json.loads(existing_file.file_metadata)
                                if existing_file.file_metadata
                                else None,
                                "isDuplicate": True,
                            }
                        )
                        continue

                    # Extract content from file
                    (
                        extracted_text,
                        extraction_metadata,
                    ) = await content_extraction_service.extract_content(
                        file_data,
                        file.content_type or "application/octet-stream",
                        file.filename or "unknown",
                    )

                    # Generate unique filename
                    extension = self._get_file_extension(file.filename or "")
                    unique_filename = (
                        f"{uuid.uuid4()}.{extension}"
                        if extension
                        else str(uuid.uuid4())
                    )

                    # Upload to S3
                    from io import BytesIO

                    s3_key = f"uploads/{unique_filename}"
                    s3_service.upload_file(
                        BytesIO(file_data),
                        unique_filename,
                        file.content_type or "application/octet-stream",
                    )

                    # Prepare metadata (combine extraction metadata with basic info)
                    metadata = {
                        "upload_timestamp": str(
                            hashlib.sha256(file_data).hexdigest()[:16]
                        ),
                        "original_size": len(file_data),
                        "extension": extension,
                        **extraction_metadata,  # Include extraction results
                    }

                    # Create database record
                    stored_file = StoredFile(
                        filename=unique_filename,
                        original_filename=file.filename or "unknown",
                        content_type=file.content_type or "application/octet-stream",
                        file_size=len(file_data),
                        s3_key=s3_key,
                        file_hash=file_hash,
                        extracted_text=extracted_text,  # Store extracted content
                        file_metadata=json.dumps(metadata),
                    )

                    session.add(stored_file)
                    await session.flush()  # Get the ID

                    uploaded_files.append(
                        {
                            "id": stored_file.id,
                            "fileName": stored_file.original_filename,
                            "fileUrl": s3_service.get_s3_url(stored_file.s3_key),
                            "fileSize": stored_file.file_size,
                            "mimeType": stored_file.content_type,
                            "metadata": metadata,
                            "hasExtractedContent": extracted_text is not None,
                            "isDuplicate": False,
                        }
                    )

                except Exception as e:
                    print(f"Error uploading file {file.filename}: {str(e)}")
                    raise HTTPException(
                        status_code=500,
                        detail=f"Failed to upload file {file.filename}: {str(e)}",
                    )

            await session.commit()

        return uploaded_files

    async def get_file(self, file_id: int) -> Optional[StoredFile]:
        """Retrieve a file's metadata from the database by ID."""
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(StoredFile).where(StoredFile.id == file_id)
            )
            return result.scalar_one_or_none()

    async def get_files_content(self, file_ids: List[int]) -> List[Dict]:
        """Get extracted content for multiple files for LLM processing."""
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(StoredFile).where(StoredFile.id.in_(file_ids))
            )
            files = result.scalars().all()

            content_list = []
            for file in files:
                content_list.append(
                    {
                        "id": file.id,
                        "filename": file.original_filename,
                        "content_type": file.content_type,
                        "extracted_text": file.extracted_text,
                        "metadata": json.loads(file.file_metadata)
                        if file.file_metadata
                        else {},
                    }
                )

            return content_list

    async def delete_file(self, file_id: int) -> bool:
        """Delete a file from S3 and the database."""
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(StoredFile).where(StoredFile.id == file_id)
            )
            file = result.scalar_one_or_none()

            if not file:
                return False

            # Delete from S3
            s3_service.delete_file(file.s3_key)
            await session.delete(file)
            await session.commit()
            return True

    async def get_file_info(self, file_id: int) -> Optional[Dict]:
        """Get file metadata and S3 URL without the actual file data."""
        file = await self.get_file(file_id)
        if not file:
            return None

        return {
            "id": file.id,
            "fileName": file.original_filename,
            "fileUrl": s3_service.get_s3_url(file.s3_key),
            "fileSize": file.file_size,
            "mimeType": file.content_type,
            "metadata": json.loads(file.file_metadata) if file.file_metadata else None,
            "hasExtractedContent": file.extracted_text is not None,
            "createdAt": file.created_at.isoformat(),
            "updatedAt": file.updated_at.isoformat(),
        }


# Global instance
file_service = FileService()
