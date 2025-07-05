from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from app.core.database import Base


class StoredFile(Base):
    __tablename__ = "stored_files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=False)
    content_type = Column(String(100), nullable=False)
    file_size = Column(Integer, nullable=False)
    s3_key = Column(String(512), nullable=False)  # S3 object key
    file_hash = Column(String(64), nullable=True, index=True)  # For deduplication
    extracted_text = Column(Text, nullable=True)  # Extracted text content for LLM
    file_metadata = Column(Text, nullable=True)  # JSON metadata (renamed from metadata)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<StoredFile(id={self.id}, filename='{self.filename}', size={self.file_size})>"
