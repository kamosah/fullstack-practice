import os
from unittest.mock import patch

import pytest


# Mock environment variables for testing
@pytest.fixture(autouse=True)
def mock_env_vars():
    with patch.dict(
        os.environ,
        {
            "LITELLM_API_KEY": "test-api-key",
            "LITELLM_MODEL": "grok/grok-beta",
            "LITELLM_TIMEOUT": "60",
            "DEBUG": "True",
            # AWS mocks for all tests
            "AWS_ACCESS_KEY_ID": "testing",
            "AWS_SECRET_ACCESS_KEY": "testing",
            "AWS_REGION": "us-east-1",
            "S3_BUCKET_NAME": "test-bucket",
            "AWS_PROFILE": "",
        },
    ):
        yield


# Mock litellm module to avoid actual API calls during tests
@pytest.fixture(autouse=True)
def mock_litellm():
    with patch("app.services.llm_service.litellm") as mock:
        mock.api_key = "test-key"
        mock.timeout = 60
        mock.set_verbose = True
        yield mock
