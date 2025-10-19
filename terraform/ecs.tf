# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "my-app-cluster"
  tags = local.common_tags
}

# ECR Repositories
resource "aws_ecr_repository" "frontend" {
  name = "my-app-frontend"
  tags = local.common_tags
}

resource "aws_ecr_repository" "backend" {
  name = "my-app-backend"
  tags = local.common_tags
}

# Task Definitions
data "aws_secretsmanager_secret" "jwt_secret" {
  name = "my-app-jwt-secret"
}

data "aws_secretsmanager_secret_version" "jwt_secret_version" {
  secret_id = data.aws_secretsmanager_secret.jwt_secret.id
}

data "aws_secretsmanager_secret" "database_credentials" {
  name = "my-app-database-credentials"
}

data "aws_secretsmanager_secret_version" "database_credentials_version" {
  secret_id = data.aws_secretsmanager_secret.database_credentials.id
}

resource "aws_ecs_task_definition" "frontend" {
  family = "frontend"
  cpu = var.frontend_cpu
  memory = var.frontend_memory
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([
    {
      name = "frontend"
      image = "${aws_ecr_repository.frontend.repository_url}:latest"
      portMappings = [
        {
          containerPort = 3000
          hostPort = 3000
        }
      ]
      environment = [
        {
          name = "REACT_APP_API_URL"
          value = "http://${aws_alb.main.dns_name}/api"
        },
        {
          name = "REACT_APP_ENV"
          value = var.environment
        }
      ]
    }
  ])
}

resource "aws_ecs_task_definition" "backend" {
  family = "backend"
  cpu = var.backend_cpu
  memory = var.backend_memory
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([
    {
      name = "backend"
      image = "${aws_ecr_repository.backend.repository_url}:latest"
      portMappings = [
        {
          containerPort = 8000
          hostPort = 8000
        }
      ]
      environment = [
        {
          name = "DATABASE_URL"
          value = "postgresql://${jsondecode(data.aws_secretsmanager_secret_version.database_credentials_version.secret_string)["username"]}:${jsondecode(data.aws_secretsmanager_secret_version.database_credentials_version.secret_string)["password"]}@${aws_db_instance.main.endpoint}/${aws_db_instance.main.db_name}"
        },
        {
          name = "JWT_SECRET"
          value = data.aws_secretsmanager_secret_version.jwt_secret_version.secret_string
        },
        {
          name = "PORT"
          value = "8000"
        }
      ]
    }
  ])
}

# ECS Services
resource "aws_ecs_service" "frontend" {
  name = "frontend"
  cluster = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count = 2
  launch_type = "FARGATE"
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent = 200
  network_configuration {
    subnets = aws_subnet.private.*.id
    security_groups = [aws_security_group.frontend.id]
    assign_public_ip = false
  }
  load_balancer {
    target_group_arn = aws_alb_target_group.frontend.arn
    container_name = "frontend"
    container_port = 3000
  }
  depends_on = [aws_alb_listener.frontend]
}

resource "aws_ecs_service" "backend" {
  name = "backend"
  cluster = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count = 2
  launch_type = "FARGATE"
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent = 200
  network_configuration {
    subnets = aws_subnet.private.*.id
    security_groups = [aws_security_group.backend.id]
    assign_public_ip = false
  }
  load_balancer {
    target_group_arn = aws_alb_target_group.backend.arn
    container_name = "backend"
    container_port = 8000
  }
  depends_on = [aws_alb_listener.backend]
}

# IAM Roles
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_execution_role.json
}

data "aws_iam_policy_document" "ecs_task_execution_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role" {
  role = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "ecs_task_role" {
  name = "ecs-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_role.json
}

data "aws_iam_policy_document" "ecs_task_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_role" {
  role = aws_iam_role.ecs_task_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskRolePolicy"
}

# CloudWatch Log Groups
resource "aws_cloudwatch_log_group" "frontend" {
  name = "/ecs/my-app/frontend"
  retention_in_days = 30
  tags = local.common_tags
}

resource "aws_cloudwatch_log_group" "backend" {
  name = "/ecs/my-app/backend"
  retention_in_days = 30
  tags = local.common_tags
}