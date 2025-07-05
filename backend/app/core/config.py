import os

from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "My FastAPI App"
    DEBUG: bool = False
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")

    # LiteLLM Configuration
    LITELLM_MODEL: str = "grok/grok-beta"
    LITELLM_API_KEY: str = ""
    LITELLM_BASE_URL: str = "r"
    LITELLM_MAX_TOKENS: int = 1000
    LITELLM_TEMPERATURE: float = 0.7
    LITELLM_TIMEOUT: int = 60

    # System prompt for the AI assistant
    # SYSTEM_PROMPT: str = """You are a helpful AI assistant specialized in financial analysis and document review. You help users analyze financial documents, investment risks, and market considerations. Provide clear, concise, and professional responses based on the context provided."""
    SYSTEM_PROMPT: str = """You are a helpful AI assistant. Provide clear, concise, and professional responses based on the context provided."""

    # File Upload Configuration
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_TYPES: list = [
        "text/plain",
        "application/pdf",
        "application/json",
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    ALLOWED_EXTENSIONS: list = [
        ".txt",
        ".pdf",
        ".json",
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".docx",
    ]
    MAX_FILES_PER_MESSAGE: int = 5

    # AWS S3 Configuration
    AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET_NAME", "fs-hebbia")
    AWS_PROFILE: str = os.getenv("AWS_PROFILE", "hebbia-kwame")

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",  # This allows extra fields to be ignored instead of causing errors
    )


settings = Settings()
