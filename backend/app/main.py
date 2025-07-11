import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

from app.api.routes.files import router as files_router
from app.api.routes.upload import router as upload_router
from app.api.schema import schema
from app.core.config import settings
from app.core.database import init_db


@asynccontextmanager
async def lifespan(app):
    await init_db()
    # Ensure upload directory exists
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    yield


app = FastAPI(title=settings.APP_NAME, debug=settings.DEBUG, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust depending on frontend needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API routes
app.include_router(upload_router, prefix="/api", tags=["upload"])
app.include_router(files_router, prefix="/api", tags=["files"])

# GraphQL endpoint
graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")

# Note: We no longer need static file serving since files are served from database


@app.get("/")
async def root():
    return {"message": "Welcome to My GraphQL App"}
