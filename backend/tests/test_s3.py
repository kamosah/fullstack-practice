import io
from unittest.mock import MagicMock, patch

import pytest

from app.core.config import settings
from app.services.s3_service import S3Service


class MockS3Object:
    def __init__(self, key, body=None, exists=True):
        self.key = key
        self.body = body
        self._deleted = False
        self.exists = exists

    def delete(self):
        if not self.exists:
            from botocore.exceptions import ClientError

            raise ClientError({"Error": {"Code": "NoSuchKey"}}, "delete_object")
        self._deleted = True

    def get(self):
        return {"Body": io.BytesIO(self.body)}


class MockS3Bucket:
    def __init__(self, name):
        self.name = name
        self._objects = {}

    def upload_fileobj(self, file_obj, key, ExtraArgs=None):
        file_obj.seek(0)
        content = file_obj.read()
        self._objects[key] = MockS3Object(key, content)

    def Object(self, key):
        if key in self._objects:
            return self._objects[key]
        # Return a new object that will fail deletion
        obj = MockS3Object(key, exists=False)
        return obj

    class ObjectCollection:
        def __init__(self, objects_dict):
            self._objects_dict = objects_dict

        def all(self):
            return [obj for obj in self._objects_dict.values() if not obj._deleted]

    @property
    def objects(self):
        return self.ObjectCollection(self._objects)


class MockS3Client:
    def __init__(self, bucket_name, region):
        self.bucket_name = bucket_name
        self.region = region

    def generate_presigned_url(self, operation_name, Params=None, ExpiresIn=3600):
        if operation_name != "get_object":
            return None
        key = Params.get("Key", "")
        bucket = Params.get("Bucket", "")
        return f"https://{bucket}.s3.{self.region}.amazonaws.com/{key}?AWSAccessKeyId=test&Signature=test&Expires={ExpiresIn}"


@pytest.fixture
def mock_s3_bucket():
    """Create a mock S3 bucket."""
    return MockS3Bucket(settings.S3_BUCKET_NAME)


@pytest.fixture
def mock_s3_client():
    """Create a mock S3 client."""
    return MockS3Client(settings.S3_BUCKET_NAME, settings.AWS_REGION)


@pytest.fixture
def s3_service(mock_s3_bucket, mock_s3_client):
    """Create an S3Service with mocked components."""
    with patch("app.services.s3_service.boto3.Session") as mock_session:
        mock_s3 = MagicMock()
        mock_s3.Bucket.return_value = mock_s3_bucket

        session_instance = mock_session.return_value
        session_instance.resource.return_value = mock_s3
        session_instance.client.return_value = mock_s3_client

        service = S3Service()
        service.s3 = mock_s3
        service.bucket = mock_s3_bucket
        service.client = mock_s3_client

        yield service


class TestS3Service:
    def test_upload_file(self, s3_service):
        """Test uploading a file to S3"""
        # Create a file-like object for testing
        file_content = b"This is a test file content"
        file_obj = io.BytesIO(file_content)
        filename = "test_file.txt"
        content_type = "text/plain"

        # Upload the file
        key = s3_service.upload_file(file_obj, filename, content_type)

        # Verify the key follows expected format
        assert key.startswith("uploads/")
        assert filename in key

        # Verify the file was uploaded to S3
        content = s3_service.bucket._objects[key].body
        assert content == file_content

    def test_get_s3_url(self, s3_service):
        """Test generating an S3 URL for a given key"""
        test_key = "uploads/test_key.txt"
        url = s3_service.get_s3_url(test_key)

        expected_url = f"https://{settings.S3_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{test_key}"
        assert url == expected_url

    def test_generate_presigned_url(self, s3_service):
        """Test generating a presigned URL"""
        # Upload a test file first
        file_obj = io.BytesIO(b"Test content")
        key = s3_service.upload_file(file_obj, "presigned_test.txt", "text/plain")

        # Generate presigned URL
        url = s3_service.generate_presigned_url(key)

        # Verify URL was generated and contains expected parts
        assert url is not None
        assert settings.S3_BUCKET_NAME in url
        assert key in url
        assert "Signature=test" in url

    def test_delete_file(self, s3_service):
        """Test deleting a file from S3"""
        # Upload a test file first
        file_obj = io.BytesIO(b"Test content for deletion")
        key = s3_service.upload_file(file_obj, "file_to_delete.txt", "text/plain")

        # Verify file exists
        objects = list(s3_service.bucket.objects.all())
        assert any(obj.key == key for obj in objects)

        # Delete the file
        result = s3_service.delete_file(key)
        assert result is True

        # Verify file no longer exists
        objects = list(s3_service.bucket.objects.all())
        assert not any(obj.key == key for obj in objects)

    def test_delete_nonexistent_file(self, s3_service):
        """Test deleting a file that doesn't exist"""
        # Try to delete a non-existent file
        result = s3_service.delete_file("nonexistent_key.txt")
        # Should return False indicating failure
        assert result is False
