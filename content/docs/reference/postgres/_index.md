---
title: PostgreSQL
linkTitle: PostgreSQL
weight: 50
icon: fa-solid fa-database
---

PostgreSQL database configuration and details for Piglet Run.

## Overview

Piglet Run includes PostgreSQL 17 as the primary database with optimized defaults.

## Connection Details

| Parameter | Default Value |
|-----------|---------------|
| Host | `localhost` |
| Port | `5432` |
| User | `dba` |
| Database | `postgres` |
| Socket | `/var/run/postgresql` |

## Connection Strings

### Local Connection

```bash
psql -U dba -d postgres
```

### TCP Connection

```
postgresql://dba@localhost:5432/postgres
```

### With Password

```
postgresql://dba:password@localhost:5432/postgres
```

## Configuration

File: `/data/postgres/postgresql.conf`

### Memory Settings

```ini
# Memory
shared_buffers = 256MB
effective_cache_size = 768MB
work_mem = 4MB
maintenance_work_mem = 64MB
huge_pages = try
```

### Connection Settings

```ini
# Connections
listen_addresses = 'localhost'
port = 5432
max_connections = 100
superuser_reserved_connections = 3
```

### WAL Settings

```ini
# WAL
wal_level = replica
max_wal_size = 1GB
min_wal_size = 80MB
wal_buffers = 8MB
checkpoint_completion_target = 0.9
```

### Logging

```ini
# Logging
log_destination = 'csvlog'
logging_collector = on
log_directory = 'pg_log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_statement = 'ddl'
log_min_duration_statement = 1000
```

## Client Authentication

File: `/data/postgres/pg_hba.conf`

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     trust
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             ::1/128                 scram-sha-256
```

## Service Management

```bash
# Start PostgreSQL
pig start postgres

# Stop PostgreSQL
pig stop postgres

# Restart PostgreSQL
pig restart postgres

# Reload configuration
pig reload postgres

# View logs
pig logs postgres
```

## Database Management

```bash
# Create database
pig db create mydb

# List databases
pig db list

# Drop database
pig db drop mydb

# Connect to database
pig db connect mydb
```

## User Management

```bash
# Create user
pig user create myuser

# Grant privileges
psql -c "GRANT ALL ON DATABASE mydb TO myuser"

# Change password
pig user passwd myuser
```

## Backup and Restore

```bash
# Full backup
pig backup db --full

# Point-in-time recovery
pig restore db --time "2024-01-15 14:30:00"
```

## Performance Tuning

### Recommended Settings by RAM

| RAM | shared_buffers | effective_cache_size | work_mem |
|-----|----------------|---------------------|----------|
| 4GB | 1GB | 3GB | 32MB |
| 8GB | 2GB | 6GB | 64MB |
| 16GB | 4GB | 12GB | 128MB |
| 32GB | 8GB | 24GB | 256MB |

## Monitoring

```bash
# Connection statistics
psql -c "SELECT * FROM pg_stat_activity"

# Database size
psql -c "SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) FROM pg_database"

# Table statistics
psql -c "SELECT * FROM pg_stat_user_tables"
```

## See Also

- [Database Tutorial](/docs/tutorial/database/)
- [Extensions Reference](/docs/reference/extensions/)
- [Backup Task](/docs/task/backup/)
