import boto3
from moto import mock_s3

from app.core.config import settings


@mock_s3
def test_list_s3_objects():
    # Set up mock S3
    s3 = boto3.resource("s3", region_name=settings.AWS_REGION)
    bucket = s3.Bucket(settings.S3_BUCKET_NAME)
    bucket.create()

    # Add a test object
    test_key = "test.txt"
    bucket.put_object(Key=test_key, Body=b"hello world")

    # List objects in the bucket
    print("Objects in bucket:", settings.S3_BUCKET_NAME)
    print("Region:", settings.AWS_REGION)
    print("Listing objects in S3 bucket:")
    print("Bucket Name:", bucket.name)
    print("All Objects in bucket:", list(bucket.objects.all()))
    for obj in bucket.objects.all():
        print(obj.key)
    # Assert the test object is present
    assert any(obj.key == test_key for obj in bucket.objects.all())


if __name__ == "__main__":
    test_list_s3_objects()

# List objects in the bucket
