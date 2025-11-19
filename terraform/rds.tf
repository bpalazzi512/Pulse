# RDS Instance
resource "aws_db_instance" "main" {
  identifier = "my-app-db"
  allocated_storage = 20
  storage_type = "gp2"
  engine = "postgres"
  engine_version = "13.7"
  instance_class = var.db_instance_class
  name = "myapp"
  username = jsondecode(data.aws_secretsmanager_secret_version.database_credentials_version.secret_string)["username"]
  password = jsondecode(data.aws_secretsmanager_secret_version.database_credentials_version.secret_string)["password"]
  db_subnet_group_name = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.database.id]
  backup_retention_period = 7
  multi_az = false
  skip_final_snapshot = true
  tags = local.common_tags
}

# DB Subnet Group
resource "aws_db_subnet_group" "main" {
  name = "my-app-db-subnet-group"
  subnet_ids = aws_subnet.private.*.id
  tags = local.common_tags
}