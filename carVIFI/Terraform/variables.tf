variable "subscription_id" {
  type        = string
  description = "Azure subscription ID"
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name"
}

variable "location" {
  type        = string
  description = "Region"
}

variable "app_service_plan_name" {
  type        = string
  description = "App Service Plan name"
}

variable "web_app_name" {
  type        = string
  description = "Linux Web App name"
}

variable "github_repo_url" {
  type        = string
  description = "GitHub repo for optional CI/CD deployment"
}

# Firebase env vars
variable "firebase_api_key" {
  type      = string
  sensitive = true
}
variable "firebase_auth_domain" {
  type = string
}
variable "firebase_project_id" {
  type = string
}
variable "firebase_storage_bucket" {
  type = string
}
variable "firebase_messaging_sender_id" {
  type = string
}
variable "firebase_app_id" {
  type = string
}
