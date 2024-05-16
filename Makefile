.PHONY: bootstrap init test build destroy ami tf-outputs

bootstrap:
	cd terraform && touch main.tf variables.tf backend.tf outputs.tf

init:
	cd terraform && terraform init

fmt:
	cd terraform && terraform fmt
	cd terraform && terraform validate

test:
	cd terraform && terraform plan -var-file=$${TF_VARS_FILE}

build:
	cd terraform && terraform apply --auto-approve -var-file=$${TF_VARS_FILE}

destroy:
	cd terraform && terraform destroy --auto-approve


	