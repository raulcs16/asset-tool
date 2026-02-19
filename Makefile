
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
	node-pg-migrate create $(m)
migrate-up:
	DATABASE_URL=$(DB_URL) npx node-pg-migrate up
migrate-down:
	DATABASE_URL=$(DB_URL) npx node-pg-migrate down
dev:
	ts-node src/index.ts
test:
	jest