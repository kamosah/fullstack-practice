from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "My FastAPI App"
    DEBUG: bool = False
    DATABASE_URL: str = "sqlite:///./test.db"

    # LiteLLM Configuration
    LITELLM_MODEL: str = "grok/grok-beta"
    LITELLM_API_KEY: str = ""
    LITELLM_BASE_URL: str = "r"
    LITELLM_MAX_TOKENS: int = 1000
    LITELLM_TEMPERATURE: float = 0.7
    LITELLM_TIMEOUT: int = 60

    # System prompt for the AI assistant
    SYSTEM_PROMPT: str = """You are a helpful AI assistant specialized in financial analysis and document review. You help users analyze financial documents, investment risks, and market considerations. Provide clear, concise, and professional responses based on the context provided."""

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",  # This allows extra fields to be ignored instead of causing errors
    )


settings = Settings()
