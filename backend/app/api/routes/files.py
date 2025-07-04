from fastapi import APIRouter, HTTPException
from fastapi.responses import Response

from app.services.file_service import file_service

router = APIRouter()


@router.get("/files/{file_id}")
async def get_file(file_id: int):
    """Serve a file from the database."""
    file = await file_service.get_file(file_id)

    if not file:
        raise HTTPException(status_code=404, detail="File not found")

    return Response(
        content=file.file_data,
        media_type=file.content_type,
        headers={
            "Content-Disposition": f'inline; filename="{file.original_filename}"',
            "Content-Length": str(file.file_size),
            "Cache-Control": "public, max-age=3600",  # Cache for 1 hour
        },
    )


@router.get("/files/{file_id}/info")
async def get_file_info(file_id: int):
    """Get file metadata without downloading the file."""
    file_info = await file_service.get_file_info(file_id)

    if not file_info:
        raise HTTPException(status_code=404, detail="File not found")

    return file_info


@router.delete("/files/{file_id}")
async def delete_file(file_id: int):
    """Delete a file from the database."""
    success = await file_service.delete_file(file_id)

    if not success:
        raise HTTPException(status_code=404, detail="File not found")

    return {"message": "File deleted successfully"}
