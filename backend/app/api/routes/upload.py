from typing import List, Union

from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse

from app.services.file_service import file_service

router = APIRouter()


@router.post("/upload", response_class=JSONResponse)
async def upload_file(files: Union[UploadFile, List[UploadFile]] = File(...)):
    """Upload multiple files with validation and return file metadata."""

    print("=== UPLOAD ENDPOINT CALLED ===")

    # Convert single file to list for consistent processing
    if isinstance(files, UploadFile):
        files = [files]
        print("Single file received")
    else:
        print(f"Multiple files received: {len(files)}")

    for i, file in enumerate(files):
        print(f"File {i}: {file.filename} ({file.content_type})")

    uploaded_files = await file_service.upload_files(files)
    return {"files": uploaded_files}
