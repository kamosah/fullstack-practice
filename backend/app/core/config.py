from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "My FastAPI App"
    DEBUG: bool = False
    DATABASE_URL: str = "sqlite:///./test.db"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
