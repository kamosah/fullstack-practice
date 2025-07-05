import boto3

from app.core.config import settings

session = (
    boto3.Session(profile_name=settings.AWS_PROFILE)
    if settings.AWS_PROFILE
    else boto3.Session()
)
s3 = session.resource("s3", region_name=settings.AWS_REGION)
bucket = s3.Bucket(settings.S3_BUCKET_NAME)

# List objects in the bucket
print("Objects in bucket:", settings.S3_BUCKET_NAME)
print("Region:", settings.AWS_REGION)
print("Using profile:", settings.AWS_PROFILE if settings.AWS_PROFILE else "default")
print("=====================================")
print("Listing objects in S3 bucket:")
print("=====================================")
print("Bucket Name:", bucket.name)
print("Objects in bucket:", bucket.objects)
print("All Objects in bucket:", bucket.objects.all())
for obj in bucket.objects.all():
    print(obj.key)
