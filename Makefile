
include .env
export $(SHELL sed 's/=.*//' .env)

.DEFAULT_GOAL := dev

DB_URL=postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)

db-provision:
	cd ~/vms/postgres; vagrant halt; vagrant up --provision
db-create: db-up
	cd ~/vms/postgres; vagrant ssh -c 'PGPASSWORD=$(DB_PASS) psql -h $(DB_HOST) -U $(DB_USER) -d postgres -c "CREATE DATABASE $(DB_NAME);"'
db-up:
	cd ~/vms/postgres; vagrant up
db-halt:
	cd ~/vms/postgres; vagrant halt
migration:
	node-pg-migrate create $(m) --migrations-dir db/migrations --migration-file-language sql
migrate-up:
	DATABASE_URL=$(DB_URL) npx node-pg-migrate up --migrations-dir db/migrations
migrate-down:
	DATABASE_URL=$(DB_URL) npx node-pg-migrate down --migrations-dir db/migrations
dev:
	npx tsx src/index.ts
test:
	jest