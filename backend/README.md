# Financial Analysis Chat API

This backend service provides a FastAPI application with GraphQL support for a financial analysis chat application. It features real-time AI-powered conversations using LiteLLM with Grok Cloud integration.

## Features

- 🤖 **AI-Powered Chat**: Real-time responses using Grok Cloud via LiteLLM
- 💬 **Conversation Management**: Persistent chat history with SQLAlchemy
- 🚀 **GraphQL API**: Modern API with Strawberry GraphQL
- 📊 **Financial Focus**: Specialized for financial document analysis
- 🔄 **Async Support**: Non-blocking AI response generation

## Requirements

- Python 3.11+
- Poetry (for dependency management)
- Grok API key from [x.ai](https://x.ai)

## Quick Setup

### 1. Install Dependencies

```bash
poetry install # Install dependencies

poetry env use 3.11 # use the expected python version

source $(poetry env info --path)/bin/activate # activate the virtual env
```

### 2. Configure LiteLLM + Grok

```bash
# Run the setup script
./setup_llm.sh

# Or manually:
# 1. Copy environment template
cp .env.example .env

# 2. Edit .env and add your Grok API key
# LITELLM_API_KEY=your_actual_grok_api_key_here
```

### []. Install AWSCLI

### 3. Setup Database

```bash
# Create database tables
python setup_database.py
```

### 4. Test Integration

```bash
# Test LiteLLM connection
python test_llm_integration.py
```

### 5. Start the Server

```bash
# Run the application
poetry run uvicorn app.main:app --reload
```

## API Endpoints

Once running, the following endpoints are available:

- `GET /` - API root with welcome message
- `POST /graphql` - GraphQL endpoint for all chat operations
- `GET /graphql` - GraphQL Playground (in development mode)

## GraphQL Operations

### Query Conversations

```graphql
query GetConversations {
  getConversations {
    id
    title
    createdAt
    messages {
      id
      type
      content
      createdAt
    }
  }
}
```

### Create Conversation with AI Response

```graphql
mutation CreateConversationWithMessage($firstMessage: String!) {
  createConversationWithMessage(firstMessage: $firstMessage) {
    id
    title
    messages {
      id
      type
      content
    }
  }
}
```

### Send Message (Auto-generates AI response)

```graphql
mutation SendMessage($input: MessageInput!) {
  sendMessage(input: $input) {
    id
    type
    content
    createdAt
  }
}
```

## Configuration

Key environment variables:

```bash
# LiteLLM Configuration
LITELLM_MODEL=grok/grok-beta              # AI model to use
LITELLM_API_KEY=your_key_here             # Grok API key
LITELLM_MAX_TOKENS=1000                   # Max response length
LITELLM_TEMPERATURE=0.7                   # Response creativity
LITELLM_TIMEOUT=60                        # Request timeout

# Database
DATABASE_URL=sqlite:///./test.db          # Database connection

# Application
DEBUG=True                                # Debug mode
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Testing

```bash
# Test LiteLLM integration
python test_llm_integration.py

# Run unit tests
poetry run pytest tests/
```

## Troubleshooting

1. **Import errors**: Ensure you're in the backend directory and dependencies are installed
2. **API key issues**: Verify your Grok API key is valid and properly set in .env
3. **Database errors**: Run `python setup_database.py` to create tables
4. **Connection timeouts**: Check internet connection and increase LITELLM_TIMEOUT

For detailed setup instructions, see [LITELLM_SETUP.md](../LITELLM_SETUP.md).
