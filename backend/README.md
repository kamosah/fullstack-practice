# Data API

This backend service provides a FastAPI application that allows querying data.

## Requirements

- Python 3.11+
- Poetry (for dependency management)

## Setup

### Using Poetry

```bash
# Install dependencies
poetry install

# Run the application
poetry run uvicorn main:app --reload
```

### Using Docker

```bash
# Build and run using Docker Compose
docker-compose up --build
```

## API Endpoints

Once running, the following endpoints are available:

- `GET /` - API root with welcome message
