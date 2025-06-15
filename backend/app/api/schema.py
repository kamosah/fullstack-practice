from datetime import datetime
from typing import List, Optional

import strawberry
from sqlalchemy import desc, select
from sqlalchemy.orm import selectinload

from app.core.database import AsyncSessionLocal
from app.models.chat import Conversation, Message


@strawberry.type
class AttachmentGQL:
    type: str
    name: str
    url: str
    size: Optional[int] = None
    mime_type: Optional[str] = None
    metadata: Optional[strawberry.scalars.JSON] = None


@strawberry.type
class MessageGQL:
    id: int
    conversation_id: int
    type: str
    content: str
    attachments: Optional[List[AttachmentGQL]] = None
    created_at: datetime = strawberry.field(name="createdAt")


@strawberry.type
class ConversationGQL:
    id: int
    title: str
    created_at: datetime = strawberry.field(name="createdAt")
    updated_at: datetime = strawberry.field(name="updatedAt")
    messages: List[MessageGQL] = strawberry.field(default_factory=list)


@strawberry.input
class MessageInput:
    conversation_id: int
    type: str
    content: str
    attachments: Optional[List[strawberry.scalars.JSON]] = None


@strawberry.input
class ConversationInput:
    title: str


@strawberry.type
class DocumentType:
    id: int
    title: str
    content: str
    category: str
    created_at: datetime = strawberry.field(name="createdAt")


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
    @strawberry.field(name="getConversations")
    async def get_conversations(self) -> List[ConversationGQL]:
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(Conversation)
                .options(selectinload(Conversation.messages))
                .order_by(desc(Conversation.updated_at))
            )
            conversations = result.scalars().all()

            return [
                ConversationGQL(
                    id=conv.id,
                    title=conv.title,
                    created_at=conv.created_at,
                    updated_at=conv.updated_at,
                    messages=[
                        MessageGQL(
                            id=msg.id,
                            conversation_id=msg.conversation_id,
                            type=msg.type,
                            content=msg.content,
                            attachments=[
                                AttachmentGQL(**att) for att in (msg.attachments or [])
                            ],
                            created_at=msg.created_at,
                        )
                        for msg in conv.messages
                    ],
                )
                for conv in conversations
            ]

    @strawberry.field(name="getConversation")
    async def get_conversation(self, id: int) -> Optional[ConversationGQL]:
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(Conversation)
                .options(selectinload(Conversation.messages))
                .where(Conversation.id == id)
            )
            conversation = result.scalar_one_or_none()

            if not conversation:
                return None

            return ConversationGQL(
                id=conversation.id,
                title=conversation.title,
                created_at=conversation.created_at,
                updated_at=conversation.updated_at,
                messages=[
                    MessageGQL(
                        id=msg.id,
                        conversation_id=msg.conversation_id,
                        type=msg.type,
                        content=msg.content,
                        attachments=[
                            AttachmentGQL(**att) for att in (msg.attachments or [])
                        ],
                        created_at=msg.created_at,
                    )
                    for msg in conversation.messages
                ],
            )

    @strawberry.field(name="getDocument")
    async def get_document(self, id: int) -> DocumentType:
        # Mock database operation
        return DocumentType(
            id=id,
            title="Sample Doc",
            content="Content",
            category="General",
            created_at=datetime.now(),
        )

    @strawberry.field(name="listDocuments")
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
    async def create_conversation(self, input: ConversationInput) -> ConversationGQL:
        async with AsyncSessionLocal() as session:
            conversation = Conversation(title=input.title)
            session.add(conversation)
            await session.commit()
            await session.refresh(conversation)

            return ConversationGQL(
                id=conversation.id,
                title=conversation.title,
                created_at=conversation.created_at,
                updated_at=conversation.updated_at,
                messages=[],
            )

    @strawberry.mutation
    async def send_message(self, input: MessageInput) -> MessageGQL:
        async with AsyncSessionLocal() as session:
            # Create user message
            message = Message(
                conversation_id=input.conversation_id,
                type=input.type,
                content=input.content,
                attachments=input.attachments,
            )
            session.add(message)

            # Update conversation timestamp
            conversation = await session.get(Conversation, input.conversation_id)
            if conversation:
                conversation.updated_at = datetime.utcnow()

            await session.commit()
            await session.refresh(message)

            return MessageGQL(
                id=message.id,
                conversation_id=message.conversation_id,
                type=message.type,
                content=message.content,
                attachments=[
                    AttachmentGQL(**att) for att in (message.attachments or [])
                ],
                created_at=message.created_at,
            )

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
