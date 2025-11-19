# My App Deployment Guide

This guide provides instructions for deploying the My App full-stack application to AWS using containerization and Terraform.

## Prerequisites

- AWS CLI installed and configured with appropriate credentials
- Docker installed
- Terraform installed

## Architecture Overview

The application is deployed using the following architecture:

- Frontend and backend are deployed as separate ECS services
- An Application Load Balancer (ALB) routes traffic:
  - `/` to the frontend service
  - `/api/*` to the backend service
- The backend service can communicate with an RDS PostgreSQL database in a private subnet
- The frontend makes API calls through the ALB to the backend service

## Deployment Instructions

1. Clone the repository and navigate to the project root directory.

2. Create a `.env` file based on the `.env.example` template and fill in the required environment variables.

3. Run the `deploy.sh` script:

   ```bash
   bash deploy.sh
   ```

   This script will:
   - Build the frontend and backend Docker images
   - Push the images to ECR
   - Apply Terraform changes to provision the infrastructure
   - Update the ECS services to use the new container images

4. After the deployment is complete, the script will output the frontend and backend URLs.

5. Access the frontend application by visiting the frontend URL in your web browser.

## Environment Variable Configuration

The following environment variables need to be configured:

### Frontend

- `REACT_APP_API_URL`: The URL of the backend API (e.g., `http://my-app-alb-123456789.us-east-1.elb.amazonaws.com/api`)
- `REACT_APP_ENV`: The environment (e.g., `dev`, `prod`)

### Backend

- `DATABASE_URL`: The connection URL for the RDS PostgreSQL database (e.g., `postgresql://myapp:password@my-app-db.abcdefghijkl.us-east-1.rds.amazonaws.com/myapp`)
- `JWT_SECRET`: The secret key for JWT authentication
- `PORT`: The port on which the backend server listens (e.g., `8000`)

## Troubleshooting

- If the deployment fails, check the CloudWatch logs for the ECS services and the Terraform output for any error messages.
- Ensure that the required environment variables are correctly configured in the `.env` file.
- Verify that the Docker images are built and pushed correctly to ECR.

## Cost Estimates

The cost of running this application will depend on the AWS resources provisioned and the usage patterns. Here are some rough estimates for the development environment:

- ECS Fargate: $0.05 per hour (2 tasks x 256 CPU units x $0.00416 per CPU-hour)
- RDS PostgreSQL (db.t3.micro): $0.017 per hour
- ALB: $0.0225 per hour (assuming minimal traffic)
- ECR: $0.10 per GB of data transfer (minimal cost for small images)
- VPC, subnets, security groups: Minimal cost

Note: These estimates are for illustrative purposes only and do not include data transfer costs or other potential charges. Always refer to the AWS Pricing Calculator for accurate cost estimates based on your specific usage.

## Tear Down Infrastructure

To tear down the infrastructure and delete all resources, run the following Terraform command:

```bash
terraform destroy
```

This will prompt you to confirm the destruction of resources. Review the plan carefully before proceeding.

After the infrastructure is destroyed, you can optionally delete the ECR repositories and any other remaining resources manually.