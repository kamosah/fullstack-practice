from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import JSON, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.core.database import Base


class MessageType(str, Enum):
    USER = "user"
    AGENT = "agent"


class AttachmentType(str, Enum):
    TEXT = "text"
    IMAGE = "image"
    FILE = "file"
    DOCUMENT = "document"


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to messages
    messages = relationship(
        "Message", back_populates="conversation", cascade="all, delete-orphan"
    )


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False)
    type = Column(String(10), nullable=False)  # USER or AGENT
    content = Column(Text, nullable=False)
    attachments = Column(JSON, nullable=True)  # JSON array of attachment objects
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to conversation
    conversation = relationship("Conversation", back_populates="messages")


class Attachment:
    """
    Structure for attachment data stored in JSON format:
    {
        "type": "text|image|file|document",
        "name": "filename or title",
        "url": "file url or path",
        "size": 12345,  # optional, in bytes
        "mime_type": "image/png",  # optional
        "metadata": {}  # optional, additional data
    }
    """

    def __init__(
        self,
        type: AttachmentType,
        name: str,
        url: str,
        size: Optional[int] = None,
        mime_type: Optional[str] = None,
        metadata: Optional[dict] = None,
    ):
        self.type = type
        self.name = name
        self.url = url
        self.size = size
        self.mime_type = mime_type
        self.metadata = metadata or {}

    def to_dict(self) -> dict:
        return {
            "type": self.type,
            "name": self.name,
            "url": self.url,
            "size": self.size,
            "mime_type": self.mime_type,
            "metadata": self.metadata,
        }
