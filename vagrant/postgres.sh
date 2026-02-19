#!/bin/bash

DB_NAME="it_asset"
DB_USER="admin"
DB_PASS="admin123"

echo "starting postgres installation..."
# Update System and Install Postgres
sudo apt-get update -y
sudo apt-get install -y postgresql postgresql-contrib git
# Ensure Postgres is running
sudo systemctl start postgresql
sudo systemctl enable postgresql
# Create Database and User
# In Postgres, we use 'sudo -u postgres' to execute commands as the superuser
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
# Get the version of postgres installed (e.g., 14, 15, or 16)
PG_VER=$(psql --version | grep -oE '[0-9]+' | head -n 1)
# Modify postgresql.conf to listen on all interfaces
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/$PG_VER/main/postgresql.conf
# Modify pg_hba.conf to allow the private network to connect
# This adds a line to allow all IPs to connect via password auth (SCRAM-SHA-256)
echo "host    all             all             0.0.0.0/0               scram-sha-256" | sudo tee -a /etc/postgresql/$PG_VER/main/pg_hba.conf
# Configure Firewall
sudo ufw allow 5432/tcp

sudo systemctl restart postgresql
echo "PostgreSQL setup complete. Database '$DB_NAME' is ready for connections on port 5432."