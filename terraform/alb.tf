# Application Load Balancer
resource "aws_alb" "main" {
  name = "my-app-alb"
  subnets = aws_subnet.public.*.id
  security_groups = [aws_security_group.frontend.id]
  tags = local.common_tags
}

# Target Groups
resource "aws_alb_target_group" "frontend" {
  name = "frontend"
  port = 3000
  protocol = "HTTP"
  vpc_id = aws_vpc.main.id
  target_type = "ip"
  health_check {
    path = "/"
    healthy_threshold = 2
    unhealthy_threshold = 10
  }
  tags = local.common_tags
}

resource "aws_alb_target_group" "backend" {
  name = "backend"
  port = 8000
  protocol = "HTTP"
  vpc_id = aws_vpc.main.id
  target_type = "ip"
  health_check {
    path = "/healthz"
    healthy_threshold = 2
    unhealthy_threshold = 10
  }
  tags = local.common_tags
}

# Listeners
resource "aws_alb_listener" "frontend" {
  load_balancer_arn = aws_alb.main.arn
  port = 80
  protocol = "HTTP"
  default_action {
    type = "forward"
    target_group_arn = aws_alb_target_group.frontend.arn
  }
}

resource "aws_alb_listener" "backend" {
  load_balancer_arn = aws_alb.main.arn
  port = 80
  protocol = "HTTP"
  default_action {
    type = "forward"
    target_group_arn = aws_alb_target_group.backend.arn
  }
  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}