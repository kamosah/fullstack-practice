import uuid
from typing import Optional

import boto3
from botocore.exceptions import ClientError

from app.core.config import settings


class S3Service:
    def __init__(self):
        session = (
            boto3.Session(profile_name=settings.AWS_PROFILE)
            if settings.AWS_PROFILE
            else boto3.Session()
        )
        self.s3 = session.resource("s3", region_name=settings.AWS_REGION)
        self.bucket = self.s3.Bucket(settings.S3_BUCKET_NAME)
        self.client = session.client("s3", region_name=settings.AWS_REGION)

    def upload_file(self, file_obj, filename: str, content_type: str) -> str:
        """
        Uploads a file object to S3 and returns the S3 object URL.
        """
        # Generate a unique key for the file
        key = f"uploads/{uuid.uuid4()}_{filename}"
        self.bucket.upload_fileobj(
            file_obj, key, ExtraArgs={"ContentType": content_type}
        )
        return key

    def get_s3_url(self, key: str) -> str:
        """
        Returns the public S3 URL for a given key.
        """
        return f"https://{settings.S3_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{key}"

    def generate_presigned_url(self, key: str, expires_in: int = 3600) -> Optional[str]:
        """
        Generates a presigned URL for a given S3 object key.
        """
        try:
            url = self.client.generate_presigned_url(
                "get_object",
                Params={"Bucket": settings.S3_BUCKET_NAME, "Key": key},
                ExpiresIn=expires_in,
            )
            return url
        except ClientError:
            return None

    def delete_file(self, key: str) -> bool:
        """
        Deletes a file from S3 by key.
        """
        try:
            self.bucket.Object(key).delete()
            return True
        except ClientError:
            return False


s3_service = S3Service()
