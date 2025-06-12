from datetime import datetime

from pydantic import BaseModel


class DocumentBase(BaseModel):
    title: str
    content: str
    category: str
    created_at: datetime


class DocumentCreate(DocumentBase):
    pass


class Document(DocumentBase):
    id: int

    class Config:
        from_attributes = True
