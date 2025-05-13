#!/bin/bash

# Variables
LOCAL_DIR="./dist/financial-management-tool/browser"  # Directory containing the UI code (adjust to your actual directory)
S3_BUCKET="s3://finapp.prodifyllp.com"  # Replace with your S3 bucket name
CLOUDFRONT_DISTRIBUTION_ID="E1MFASMD03N9PF"  # Replace with your CloudFront Distribution ID
AWS_REGION="us-east-1"  # Specify your AWS region

# Ensure AWS credentials are set in environment variables
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "Error: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables are required."
  exit 1
fi

# Ensure the local directory exists
if [ ! -d "$LOCAL_DIR" ]; then
  echo "Error: Local directory '$LOCAL_DIR' does not exist."
  exit 1
fi

# Sync UI code to S3 bucket
echo "Uploading UI code from '$LOCAL_DIR' to '$S3_BUCKET'..."
aws s3 sync "$LOCAL_DIR" "$S3_BUCKET" --region "$AWS_REGION" --acl public-read

# Check if the sync was successful
if [ $? -ne 0 ]; then
  echo "Error: Failed to upload UI code to $S3_BUCKET"
  exit 1
fi

echo "UI code successfully uploaded to $S3_BUCKET"

# Create a CloudFront invalidation
echo "Creating CloudFront invalidation for distribution ID $CLOUDFRONT_DISTRIBUTION_ID..."
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths "/*" --region "$AWS_REGION" --query 'Invalidation.Id' --output text)

# Check if the invalidation was successful
if [ $? -ne 0 ]; then
  echo "Error: Failed to create CloudFront invalidation"
  exit 1
else
  echo "CloudFront invalidation created successfully with ID: $INVALIDATION_ID"
fi
