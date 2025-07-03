from typing import List

from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse

from app.services.file_service import file_service

router = APIRouter()


@router.post("/upload", response_class=JSONResponse)
async def upload_file(files: List[UploadFile] = File(...)):
    """Upload multiple files with validation and return file metadata."""

    uploaded_files = await file_service.upload_files(files)
    return {"files": uploaded_files}
