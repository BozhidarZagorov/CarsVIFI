terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.56.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

# App Service Plan (Linux, F1 Free)
resource "azurerm_service_plan" "asp" {
  name                = var.app_service_plan_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku_name            = "F1"
  os_type             = "Linux"
}

# Linux Web App for SPA
resource "azurerm_linux_web_app" "lwa" {
  name                = var.web_app_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.asp.id

  site_config {
    # Rewrite all routes to index.html (React SPA)
    default_documents = ["index.html"]
    always_on = false
  }

  app_settings = {
    VITE_FIREBASE_API_KEY            = var.firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN        = var.firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID         = var.firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET     = var.firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDERID = var.firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID             = var.firebase_app_id
  }

  https_only = true
}

resource "azurerm_app_service_source_control" "github" {
  app_id                 = azurerm_linux_web_app.lwa.id
  repo_url               = var.github_repo_url
  branch                 = "main"
  use_manual_integration = true
}

output "web_app_url" {
  description = "The fully qualified domain name of the Linux Web App"
  value       = azurerm_linux_web_app.lwa.default_hostname
}

output "ip_address" {
  description = "The outbound IP addresses of the Web App"
  value       = azurerm_linux_web_app.lwa.outbound_ip_addresses
}
