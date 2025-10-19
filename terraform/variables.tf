variable "aws_region" {
  default = "us-east-1"
}

variable "environment" {
  default = "dev"
}

variable "vpc_cidr_block" {
  default = "10.0.0.0/16"
}

variable "frontend_cpu" {
  default = 256
}

variable "frontend_memory" {
  default = 512
}

variable "backend_cpu" {
  default = 256
}

variable "backend_memory" {
  default = 512
}

variable "db_instance_class" {
  default = "db.t3.micro"
}