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
    ) -> str:
        """
        Generate an AI response using LiteLLM with Grok.

        Args:
            user_message: The user's message
            conversation_history: Previous messages in the conversation
            context: Additional context (e.g., document content)

        Returns:
            AI-generated response
        """
        try:
            # Build messages for the API call
            messages = self._build_messages(user_message, conversation_history, context)

            # Make the API call
            response = await acompletion(
                model=settings.LITELLM_MODEL,
                messages=messages,
                max_tokens=settings.LITELLM_MAX_TOKENS,
                temperature=settings.LITELLM_TEMPERATURE,
                timeout=settings.LITELLM_TIMEOUT,
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

    def _build_messages(
        self,
        user_message: str,
        conversation_history: Optional[List[Message]] = None,
        context: Optional[str] = None,
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
                messages.append(
                    {
                        "role": role,
                        "content": msg.content,
                    }
                )

        # Add the current user message
        messages.append(
            {
                "role": "user",
                "content": user_message,
            }
        )

        return messages

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
