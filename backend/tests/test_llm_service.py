from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from app.models.chat import Message, MessageType
from app.services.llm_service import LLMService

pytestmark = pytest.mark.asyncio


class TestLLMService:
    @pytest.fixture
    def llm_service(self):
        return LLMService()

    @pytest.fixture
    def mock_response(self):
        response = MagicMock()
        response.choices = [MagicMock()]
        response.choices[0].message.content = "Test response"
        return response

    @pytest.fixture
    def sample_messages(self):
        return [
            Message(id=1, type=MessageType.USER, content="Hello"),
            Message(id=2, type=MessageType.AGENT, content="Hi there!"),
        ]

    @pytest.mark.asyncio
    async def test_generate_response_success(self, llm_service, mock_response):
        with patch("app.services.llm_service.acompletion", return_value=mock_response):
            result = await llm_service.generate_response("Test message")
            assert result == "Test response"

    @pytest.mark.asyncio
    async def test_generate_response_no_choices(self, llm_service):
        mock_response = MagicMock()
        mock_response.choices = []

        with patch("app.services.llm_service.acompletion", return_value=mock_response):
            result = await llm_service.generate_response("Test message")
            assert "couldn't generate a response" in result

    @pytest.mark.asyncio
    async def test_generate_response_exception(self, llm_service):
        with patch(
            "app.services.llm_service.acompletion", side_effect=Exception("API Error")
        ):
            result = await llm_service.generate_response("Test message")
            assert "encountered an error" in result
            assert "API Error" in result

    @pytest.mark.asyncio
    async def test_build_messages_basic(self, llm_service):
        messages = await llm_service._build_messages("Hello")

        assert len(messages) == 2
        assert messages[0]["role"] == "system"
        assert messages[1]["role"] == "user"
        assert messages[1]["content"] == "Hello"

    @pytest.mark.asyncio
    async def test_build_messages_with_context(self, llm_service):
        messages = await llm_service._build_messages(
            "Hello", context="Document context"
        )

        assert len(messages) == 3
        assert messages[1]["role"] == "system"
        assert "Additional context: Document context" in messages[1]["content"]

    @pytest.mark.asyncio
    async def test_build_messages_with_history(self, llm_service, sample_messages):
        messages = await llm_service._build_messages(
            "New message", conversation_history=sample_messages
        )

        assert len(messages) == 4  # system + 2 history + current
        assert messages[1]["role"] == "user"
        assert messages[1]["content"] == "Hello"
        assert messages[2]["role"] == "assistant"
        assert messages[2]["content"] == "Hi there!"

    @pytest.mark.asyncio
    async def test_build_messages_limits_history(self, llm_service):
        # Create 15 messages to test the 10-message limit
        long_history = [
            Message(
                id=i,
                type=MessageType.USER if i % 2 == 0 else MessageType.AGENT,
                content=f"Message {i}",
            )
            for i in range(15)
        ]

        messages = await llm_service._build_messages(
            "New message", conversation_history=long_history
        )

        # Should be system + 10 recent history + current = 12
        assert len(messages) == 12

    @pytest.mark.asyncio
    async def test_get_attachments_content_empty(self, llm_service):
        result = await llm_service._get_attachments_content([])
        assert result == ""

    @pytest.mark.asyncio
    async def test_get_attachments_content_with_file_service(self, llm_service):
        attachments = [{"url": "/api/files/123", "name": "test.txt"}]
        mock_content = [
            {
                "filename": "test.txt",
                "content_type": "text/plain",
                "extracted_text": "File content",
                "metadata": {},
            }
        ]

        with patch("app.services.llm_service.file_service") as mock_file_service:
            mock_file_service.get_files_content = AsyncMock(return_value=mock_content)

            result = await llm_service._get_attachments_content(attachments)

            assert "test.txt" in result
            assert "File content" in result
            mock_file_service.get_files_content.assert_called_once_with([123])

    @pytest.mark.asyncio
    async def test_get_attachments_content_image_file(self, llm_service):
        attachments = [{"url": "/api/files/456", "name": "image.jpg"}]
        mock_content = [
            {
                "filename": "image.jpg",
                "content_type": "image/jpeg",
                "extracted_text": "Image description",
                "metadata": {"width": 800, "height": 600},
            }
        ]

        with patch("app.services.llm_service.file_service") as mock_file_service:
            mock_file_service.get_files_content = AsyncMock(return_value=mock_content)

            result = await llm_service._get_attachments_content(attachments)

            assert "This is an image file" in result
            assert "Image description" in result

    @pytest.mark.asyncio
    async def test_get_attachments_content_fallback(self, llm_service):
        attachments = [{"name": "test.txt", "type": "text/plain", "size": 1024}]

        result = await llm_service._get_attachments_content(attachments)

        assert "test.txt" in result
        assert "1024 bytes" in result

    def test_format_attachments_for_context_empty(self, llm_service):
        result = llm_service._format_attachments_for_context([])
        assert result == ""

    def test_format_attachments_for_context_with_metadata(self, llm_service):
        attachments = [
            {
                "name": "test.jpg",
                "type": "image/jpeg",
                "size": 2048,
                "metadata": {"width": 800, "height": 600, "wordCount": 100},
            }
        ]

        result = llm_service._format_attachments_for_context(attachments)

        assert "test.jpg" in result
        assert "2048 bytes" in result
        assert "800x600" in result
        assert "Words: 100" in result

    @pytest.mark.asyncio
    async def test_generate_conversation_title_success(
        self, llm_service, mock_response
    ):
        mock_response.choices[0].message.content = "Financial Analysis Discussion"

        with patch("app.services.llm_service.acompletion", return_value=mock_response):
            result = await llm_service.generate_conversation_title(
                "Analyze this financial report"
            )
            assert result == "Financial Analysis Discussion"

    @pytest.mark.asyncio
    async def test_generate_conversation_title_cleans_quotes(
        self, llm_service, mock_response
    ):
        mock_response.choices[0].message.content = '"Financial Analysis"'

        with patch("app.services.llm_service.acompletion", return_value=mock_response):
            result = await llm_service.generate_conversation_title("Test message")
            assert result == "Financial Analysis"

    @pytest.mark.asyncio
    async def test_generate_conversation_title_limits_length(
        self, llm_service, mock_response
    ):
        long_title = "A" * 60  # 60 characters
        mock_response.choices[0].message.content = long_title

        with patch("app.services.llm_service.acompletion", return_value=mock_response):
            result = await llm_service.generate_conversation_title("Test message")
            assert len(result) == 50

    @pytest.mark.asyncio
    async def test_generate_conversation_title_fallback_on_error(self, llm_service):
        with patch(
            "app.services.llm_service.acompletion", side_effect=Exception("API Error")
        ):
            result = await llm_service.generate_conversation_title(
                "Test message for fallback"
            )
            assert result.startswith("Conversation Test message for")

    @pytest.mark.asyncio
    async def test_generate_conversation_title_fallback_no_choices(self, llm_service):
        mock_response = MagicMock()
        mock_response.choices = []

        with patch("app.services.llm_service.acompletion", return_value=mock_response):
            result = await llm_service.generate_conversation_title(
                "Test message for fallback"
            )
            assert result.startswith("Conversation Test message for")

    @pytest.mark.asyncio
    async def test_build_messages_with_attachments_in_history(self, llm_service):
        message_with_attachments = Message(
            id=1,
            type=MessageType.USER,
            content="Check this file",
            attachments=[{"url": "/api/files/123", "name": "test.txt"}],
        )

        with patch.object(
            llm_service, "_get_attachments_content", return_value="File content"
        ):
            messages = await llm_service._build_messages(
                "New message", conversation_history=[message_with_attachments]
            )

            # Find the user message in history
            user_msg = next(
                msg
                for msg in messages
                if msg["role"] == "user" and "Check this file" in msg["content"]
            )
            assert "File content" in user_msg["content"]

    @pytest.mark.asyncio
    async def test_build_messages_with_current_attachments(self, llm_service):
        attachments = [{"url": "/api/files/456", "name": "current.txt"}]

        with patch.object(
            llm_service, "_get_attachments_content", return_value="Current file content"
        ):
            messages = await llm_service._build_messages(
                "Check this", attachments=attachments
            )

            # The last message should contain both user message and attachment content
            assert "Check this" in messages[-1]["content"]
            assert "Current file content" in messages[-1]["content"]
