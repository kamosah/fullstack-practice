import io
import mimetypes
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

import aiofiles
from fastapi import HTTPException, UploadFile
from PIL import Image

from app.core.config import settings


class FileUploadService:
    """Service for handling file uploads, validation, and metadata extraction."""

    def __init__(self):
        self.upload_dir = Path(settings.UPLOAD_DIR)
        self.upload_dir.mkdir(exist_ok=True)

    async def upload_files(self, files: List[UploadFile]) -> List[Dict[str, Any]]:
        """Upload multiple files and return their metadata."""

        if len(files) > settings.MAX_FILES_PER_MESSAGE:
            raise HTTPException(
                status_code=400,
                detail=f"Too many files. Maximum {settings.MAX_FILES_PER_MESSAGE} files allowed.",
            )

        uploaded_files = []

        for file in files:
            file_metadata = await self._process_single_file(file)
            uploaded_files.append(file_metadata)

        return uploaded_files

    async def _process_single_file(self, file: UploadFile) -> Dict[str, Any]:
        """Process and save a single uploaded file."""

        # Read file content once for validation and saving
        content = await file.read()
        await file.seek(0)  # Reset for potential re-reading

        # Validate file
        self._validate_file(file, content)

        # Generate unique filename
        file_extension = Path(file.filename).suffix.lower()
        unique_filename = f"{uuid.uuid4().hex}_{datetime.now().strftime('%Y%m%d_%H%M%S')}{file_extension}"
        file_path = self.upload_dir / unique_filename

        # Save file
        async with aiofiles.open(file_path, "wb") as out_file:
            await out_file.write(content)

        # Extract metadata
        metadata = await self._extract_metadata(file, content, file_path)

        return {
            "uploadId": uuid.uuid4().hex,
            "fileName": file.filename,
            "fileUrl": f"/uploads/{unique_filename}",
            "fileType": file.content_type,
            "fileSize": len(content),
            "mimeType": file.content_type,
            "metadata": metadata,
        }

    def _validate_file(self, file: UploadFile, content: bytes) -> None:
        """Validate file type, size, and extension."""

        # Check file size
        if len(content) > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size: {settings.MAX_FILE_SIZE / (1024 * 1024):.1f}MB",
            )

        # Check file type
        if file.content_type not in settings.ALLOWED_FILE_TYPES:
            raise HTTPException(
                status_code=400, detail=f"Unsupported file type: {file.content_type}"
            )

        # Check file extension
        if not any(
            file.filename.lower().endswith(ext) for ext in settings.ALLOWED_EXTENSIONS
        ):
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file extension. Allowed: {', '.join(settings.ALLOWED_EXTENSIONS)}",
            )

        # Additional security check - verify MIME type matches extension
        guessed_type, _ = mimetypes.guess_type(file.filename)
        if guessed_type and guessed_type != file.content_type:
            # Log suspicious files but don't block (browsers can send different MIME types)
            print(
                f"Warning: MIME type mismatch for {file.filename}: {file.content_type} vs {guessed_type}"
            )

    async def _extract_metadata(
        self, file: UploadFile, content: bytes, file_path: Path
    ) -> Dict[str, Any]:
        """Extract metadata from uploaded file based on its type."""

        metadata = {
            "originalName": file.filename,
            "uploadedAt": datetime.utcnow().isoformat(),
            "contentType": file.content_type,
        }

        # Image metadata
        if file.content_type.startswith("image/"):
            try:
                with Image.open(io.BytesIO(content)) as img:
                    metadata.update(
                        {
                            "width": img.width,
                            "height": img.height,
                            "format": img.format,
                            "mode": img.mode,
                        }
                    )
            except Exception as e:
                print(f"Error extracting image metadata: {e}")

        # Text file metadata
        elif file.content_type == "text/plain":
            try:
                text_content = content.decode("utf-8")
                metadata.update(
                    {
                        "encoding": "utf-8",
                        "lineCount": len(text_content.splitlines()),
                        "characterCount": len(text_content),
                        "wordCount": len(text_content.split()),
                    }
                )
            except Exception as e:
                print(f"Error extracting text metadata: {e}")

        # PDF metadata (placeholder - would need PyPDF2 or similar)
        elif file.content_type == "application/pdf":
            metadata.update(
                {
                    "type": "pdf",
                    "pages": "unknown",  # Would extract with PDF library
                }
            )

        return metadata

    def get_file_type_category(self, mime_type: str) -> str:
        """Categorize file type for frontend display."""

        if mime_type.startswith("image/"):
            return "image"
        elif mime_type == "application/pdf":
            return "document"
        elif mime_type == "text/plain":
            return "text"
        elif "wordprocessingml" in mime_type:
            return "document"
        else:
            return "file"


# Global instance
file_service = FileUploadService()
