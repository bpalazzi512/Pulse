#!/bin/bash

# Error handling
set -e

# Authenticate with AWS ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build frontend Docker image
docker build -t my-app-frontend frontend

# Build backend Docker image
docker build -t my-app-backend backend

# Tag images with commit SHA and 'latest'
COMMIT_SHA=$(git rev-parse --short HEAD)
docker tag my-app-frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:$COMMIT_SHA
docker tag my-app-frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:latest
docker tag my-app-backend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-app-backend:$COMMIT_SHA
docker tag my-app-backend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-app-backend:latest

# Push images to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:$COMMIT_SHA
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-app-backend:$COMMIT_SHA
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-app-backend:latest

# Apply Terraform changes
read -p "Apply Terraform changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  terraform init
  terraform apply -auto-approve
else
  echo "Deployment cancelled."
  exit 1
fi

# Update ECS services with new images
aws ecs update-service --cluster my-app-cluster --service frontend --force-new-deployment
aws ecs update-service --cluster my-app-cluster --service backend --force-new-deployment

# Show deployment status and output URLs
echo "Deployment in progress..."
echo "Frontend URL: http://$(terraform output -raw alb_dns_name)"
echo "Backend URL: http://$(terraform output -raw alb_dns_name)/api"