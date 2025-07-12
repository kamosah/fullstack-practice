import logging
from typing import List, Optional

import litellm
from litellm import acompletion

from app.core.config import settings
from app.models.chat import Message

logger = logging.getLogger(__name__)


class LLMService:
    def __init__(self):
        # Configure LiteLLM
        litellm.api_key = settings.LITELLM_API_KEY
        litellm.timeout = settings.LITELLM_TIMEOUT

        # Set up logging for LiteLLM
        if settings.DEBUG:
            litellm.set_verbose = True

    async def generate_response(
        self,
        user_message: str,
        conversation_history: Optional[List[Message]] = None,
        context: Optional[str] = None,
        attachments: Optional[List[dict]] = None,
    ) -> str:
        """
        Generate an AI response using LiteLLM with Grok.

        Args:
            user_message: The user's message
            conversation_history: Previous messages in the conversation
            context: Additional context (e.g., document content)
            attachments: List of attachments with the message

        Returns:
            AI-generated response
        """
        try:
            # Build messages for the API call
            messages = await self._build_messages(
                user_message, conversation_history, context, attachments
            )

            # Make the API call
            response = await acompletion(
                model=settings.LITELLM_MODEL,
                messages=messages,
                max_tokens=settings.LITELLM_MAX_TOKENS,
                temperature=settings.LITELLM_TEMPERATURE,
                timeout=settings.LITELLM_TIMEOUT,
                api_key=settings.LITELLM_API_KEY,
                base_url=settings.LITELLM_BASE_URL,
            )

            # Extract the response content
            if response.choices and len(response.choices) > 0:
                return response.choices[0].message.content.strip()
            else:
                logger.warning("No response choices returned from LLM")
                return "I apologize, but I couldn't generate a response at this time. Please try again."

        except Exception as e:
            logger.error(f"Error generating LLM response: {str(e)}")
            return f"I encountered an error while processing your request: {str(e)}"

    async def _build_messages(
        self,
        user_message: str,
        conversation_history: Optional[List[Message]] = None,
        context: Optional[str] = None,
        attachments: Optional[List[dict]] = None,
    ) -> List[dict]:
        """Build the messages array for the LLM API call."""
        messages = [
            {
                "role": "system",
                "content": settings.SYSTEM_PROMPT,
            }
        ]

        # Add context if provided
        if context:
            messages.append(
                {
                    "role": "system",
                    "content": f"Additional context: {context}",
                }
            )

        # Add conversation history (limit to last 10 messages to avoid token limits)
        if conversation_history:
            recent_history = conversation_history[-10:]
            for msg in recent_history:
                role = "user" if msg.type == "user" else "assistant"
                content = msg.content

                # Add attachment content to message if available
                if msg.attachments:
                    attachment_content = await self._get_attachments_content(
                        msg.attachments
                    )
                    if attachment_content:
                        content = f"{content}\n\n{attachment_content}"

                messages.append(
                    {
                        "role": role,
                        "content": content,
                    }
                )

        # Add attachments content to current user message if provided
        current_message_content = user_message
        if attachments:
            attachment_content = await self._get_attachments_content(attachments)
            if attachment_content:
                current_message_content = f"{user_message}\n\n{attachment_content}"

        # Add the current user message
        messages.append(
            {
                "role": "user",
                "content": current_message_content,
            }
        )

        return messages

    async def _get_attachments_content(self, attachments: List[dict]) -> str:
        """Get the actual content of attachments for LLM processing."""
        if not attachments:
            return ""

        # Extract file IDs from attachment URLs
        file_ids = []
        for att in attachments:
            url = att.get("url", "")
            if "/api/files/" in url:
                try:
                    file_id = int(url.split("/api/files/")[-1])
                    file_ids.append(file_id)
                except (ValueError, IndexError):
                    continue

        if not file_ids:
            # Fallback to basic metadata if no file IDs found
            return self._format_attachments_for_context(attachments)

        # Import here to avoid circular imports
        from app.services.file_service import file_service

        # Get actual file content
        files_content = await file_service.get_files_content(file_ids)

        content_parts = []
        for file_content in files_content:
            filename = file_content["filename"]
            content_type = file_content["content_type"]
            extracted_text = file_content.get("extracted_text")
            metadata = file_content.get("metadata", {})

            if extracted_text:
                if content_type.startswith("image/"):
                    # For images, include description and metadata
                    content_parts.append(
                        f"--- Attachment: {filename} ({content_type}) ---\n"
                        f"This is an image file. {extracted_text}\n"
                        f"Metadata: {metadata}\n"
                    )
                else:
                    # For text-based files, include the actual content
                    content_parts.append(
                        f"--- Attachment: {filename} ({content_type}) ---\n"
                        f"{extracted_text}\n"
                    )
            else:
                # If no extracted content, provide basic info
                content_parts.append(
                    f"--- Attachment: {filename} ({content_type}) ---\n"
                    f"File could not be processed for content extraction.\n"
                    f"Metadata: {metadata}\n"
                )

        return "\n".join(content_parts) if content_parts else ""

    def _format_attachments_for_context(self, attachments: List[dict]) -> str:
        """Format attachment information for LLM context."""
        if not attachments:
            return ""

        attachment_descriptions = []
        for att in attachments:
            desc = f"- {att['name']} ({att['type']}"
            if att.get("size"):
                desc += f", {att['size']} bytes"
            desc += ")"

            # Add metadata if available
            if att.get("metadata"):
                metadata = att["metadata"]
                if metadata.get("width") and metadata.get("height"):
                    desc += f" - Dimensions: {metadata['width']}x{metadata['height']}"
                if metadata.get("wordCount"):
                    desc += f" - Words: {metadata['wordCount']}"

            attachment_descriptions.append(desc)

        return "Attachments:\n" + "\n".join(attachment_descriptions)

    async def generate_conversation_title(self, first_message: str) -> str:
        """Generate a title for a conversation based on the first message."""
        try:
            messages = [
                {
                    "role": "system",
                    "content": "Generate a short, descriptive title (max 50 characters) for a conversation that starts with the following user message. Only return the title, nothing else.",
                },
                {
                    "role": "user",
                    "content": first_message,
                },
            ]

            response = await acompletion(
                model=settings.LITELLM_MODEL,
                messages=messages,
                max_tokens=20,
                temperature=0.3,
                timeout=30,
                api_key=settings.LITELLM_API_KEY,
                base_url=settings.LITELLM_BASE_URL,
            )

            if response.choices and len(response.choices) > 0:
                title = response.choices[0].message.content.strip()
                # Clean up the title
                title = title.replace('"', "").replace("'", "")
                return title[:50]  # Ensure max length
            else:
                return f"Conversation {first_message[:30]}..."

        except Exception as e:
            logger.error(f"Error generating conversation title: {str(e)}")
            return f"Conversation {first_message[:30]}..."


# Global instance
llm_service = LLMService()
