from datetime import datetime
from typing import List, Optional

import strawberry


@strawberry.type
class DocumentType:
    id: int
    title: str
    content: str
    category: str
    created_at: datetime


@strawberry.input
class DocumentFilter:
    search: Optional[str] = None
    category: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


@strawberry.input
class DocumentCreateInput:
    title: str
    content: str
    category: str


@strawberry.type
class Query:
    @strawberry.field
    async def get_document(self, id: int) -> DocumentType:
        # Mock database operation
        return DocumentType(
            id=id,
            title="Sample Doc",
            content="Content",
            category="General",
            created_at=datetime.now(),
        )

    @strawberry.field
    async def list_documents(
        self, filter: Optional[DocumentFilter] = None, limit: int = 10, offset: int = 0
    ) -> List[DocumentType]:
        # Mock database operation
        return [
            DocumentType(
                id=i,
                title=f"Doc {i}",
                content="Sample content",
                category="General",
                created_at=datetime.now(),
            )
            for i in range(1, limit + 1)
        ]


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_document(self, document: DocumentCreateInput) -> DocumentType:
        # Mock database operation
        return DocumentType(
            id=1,
            title=document.title,
            content=document.content,
            category=document.category,
            created_at=datetime.now(),
        )


schema = strawberry.Schema(query=Query, mutation=Mutation)
