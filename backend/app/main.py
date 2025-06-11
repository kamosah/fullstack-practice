from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

from app.api.schema import schema
from app.core.config import settings

app = FastAPI(title=settings.APP_NAME, debug=settings.DEBUG)

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")


@app.get("/")
async def root():
    return {"message": "Welcome to My GraphQL App"}
