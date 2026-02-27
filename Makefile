
include .env
export $(SHELL sed 's/=.*//' .env)

.DEFAULT_GOAL := dev

DB_URL=postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)

db-provision:
	cd ./vagrant; vagrant halt; vagrant up --provision
db-up:
	cd ./vagrant; vagrant up
db-halt:
	cd ./vagrant; vagrant halt
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