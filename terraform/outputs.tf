output "alb_dns_name" {
  value = aws_alb.main.dns_name
  description = "Application Load Balancer DNS Name"
}

output "database_endpoint" {
  value = aws_db_instance.main.endpoint
  description = "Database Endpoint"
}