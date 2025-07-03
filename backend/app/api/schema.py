from datetime import datetime
from typing import List, Optional

import strawberry
from sqlalchemy import desc, select
from sqlalchemy.orm import selectinload

from app.core.database import AsyncSessionLocal
from app.models.chat import Conversation, Message
from app.services.llm_service import llm_service


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
    type: str  # We keep this as str for backward compatibility, but we'll validate it's a MessageTypeGQL value
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
class AttachmentInput:
    type: str
    name: str
    url: str
    size: Optional[int] = None
    mime_type: Optional[str] = None
    metadata: Optional[strawberry.scalars.JSON] = None


@strawberry.input
class MessageInput:
    conversation_id: int
    type: str = strawberry.field(
        description="Message type, must be either 'user' or 'agent'"
    )
    content: str
    attachments: Optional[List[AttachmentInput]] = None


@strawberry.input
class ConversationInput:
    title: Optional[str] = None


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
            # Use provided title or create a default one
            title = (
                input.title
                or f"New Conversation {datetime.now().strftime('%Y-%m-%d %H:%M')}"
            )

            conversation = Conversation(title=title)
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
    async def create_conversation_with_message(
        self, title: Optional[str], first_message: str
    ) -> ConversationGQL:
        """Create a conversation and send the first message, generating AI response and smart title."""
        async with AsyncSessionLocal() as session:
            # Generate smart title if not provided
            if not title:
                try:
                    title = await llm_service.generate_conversation_title(first_message)
                except Exception:
                    title = f"Conversation {datetime.now().strftime('%Y-%m-%d %H:%M')}"

            # Create conversation
            conversation = Conversation(title=title)
            session.add(conversation)
            await session.commit()
            await session.refresh(conversation)

            # Create user message
            user_message = Message(
                conversation_id=conversation.id,
                type="user",
                content=first_message,
            )
            session.add(user_message)

            # Generate AI response
            try:
                ai_response = await llm_service.generate_response(
                    user_message=first_message,
                    conversation_history=None,
                )

                # Create AI message
                ai_message = Message(
                    conversation_id=conversation.id,
                    type="agent",
                    content=ai_response,
                )
                session.add(ai_message)

            except Exception as e:
                print(f"Error generating AI response: {e}")
                # Create fallback response
                ai_message = Message(
                    conversation_id=conversation.id,
                    type="agent",
                    content="I'm having trouble connecting to the AI service right now. Please try again in a moment.",
                )
                session.add(ai_message)

            # Update conversation timestamp
            conversation.updated_at = datetime.utcnow()
            await session.commit()

            # Refresh to get the messages
            await session.refresh(conversation)
            result = await session.execute(
                select(Conversation)
                .options(selectinload(Conversation.messages))
                .where(Conversation.id == conversation.id)
            )
            conversation_with_messages = result.scalar_one()

            return ConversationGQL(
                id=conversation_with_messages.id,
                title=conversation_with_messages.title,
                created_at=conversation_with_messages.created_at,
                updated_at=conversation_with_messages.updated_at,
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
                    for msg in conversation_with_messages.messages
                ],
            )

    @strawberry.mutation
    async def send_message(self, input: MessageInput) -> MessageGQL:
        # Validate message type
        if input.type not in ["user", "agent"]:
            raise ValueError(
                f"Invalid message type: {input.type}. Must be either 'user' or 'agent'"
            )

        async with AsyncSessionLocal() as session:
            # Convert AttachmentInput to dict format for JSON storage
            attachments_data = None
            if input.attachments:
                attachments_data = [
                    {
                        "type": att.type,
                        "name": att.name,
                        "url": att.url,
                        "size": att.size,
                        "mime_type": att.mime_type,
                        "metadata": att.metadata,
                    }
                    for att in input.attachments
                ]

            # Create user message
            message = Message(
                conversation_id=input.conversation_id,
                type=input.type,
                content=input.content,
                attachments=attachments_data,
            )
            session.add(message)

            # Update conversation timestamp
            conversation = await session.get(Conversation, input.conversation_id)
            if conversation:
                conversation.updated_at = datetime.utcnow()

            await session.commit()
            await session.refresh(message)

            # If this is a user message, generate an AI response
            if input.type == "user":
                try:
                    # Get conversation history for context
                    history_result = await session.execute(
                        select(Message)
                        .where(Message.conversation_id == input.conversation_id)
                        .order_by(Message.created_at)
                    )
                    conversation_history = list(history_result.scalars().all())

                    # Generate AI response
                    ai_response = await llm_service.generate_response(
                        user_message=input.content,
                        conversation_history=conversation_history[
                            :-1
                        ],  # Exclude current message
                    )

                    # Create AI message
                    ai_message = Message(
                        conversation_id=input.conversation_id,
                        type="agent",
                        content=ai_response,
                    )
                    session.add(ai_message)

                    # Update conversation timestamp again
                    conversation.updated_at = datetime.utcnow()
                    await session.commit()

                except Exception as e:
                    # Log the error but don't fail the user message creation
                    print(f"Error generating AI response: {e}")

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
