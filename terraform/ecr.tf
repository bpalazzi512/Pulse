# ECR Repositories
resource "aws_ecr_repository" "frontend" {
  name = "my-app-frontend"
  tags = local.common_tags
}

resource "aws_ecr_repository" "backend" {
  name = "my-app-backend"
  tags = local.common_tags
}