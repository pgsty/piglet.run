---
title: Migrate
linkTitle: Migrate
weight: 80
icon: fa-solid fa-truck
---

Learn how to migrate data from other systems to Piglet Run.

## Overview

Piglet Run supports migration from:

- **Other PostgreSQL**: Migrate from existing PostgreSQL instances
- **MySQL/MariaDB**: Convert and migrate from MySQL
- **Cloud Databases**: AWS RDS, Google Cloud SQL, Azure Database
- **Files**: Import from SQL dumps or CSV files

## Quick Migration

Migrate from another PostgreSQL:

```bash
pig migrate postgres://user:pass@source-host/dbname
```

## Migrate from PostgreSQL

### Direct Connection

```bash
pig migrate pg \
  --host source.example.com \
  --port 5432 \
  --user migrate_user \
  --database production
```

### From pg_dump File

```bash
pig migrate import backup.sql
```

### Schema Only

```bash
pig migrate pg --host source.example.com --schema-only
```

## Migrate from MySQL

### Direct Migration

```bash
pig migrate mysql \
  --host mysql.example.com \
  --user migrate_user \
  --database myapp
```

### With Type Mapping

```bash
pig migrate mysql --host source --type-map mysql-to-pg.yml
```

## Migrate from Cloud

### AWS RDS

```bash
pig migrate rds \
  --instance mydb-instance \
  --region us-west-2 \
  --profile aws-profile
```

### Google Cloud SQL

```bash
pig migrate cloudsql \
  --instance myproject:region:instance \
  --credentials /path/to/credentials.json
```

## Import Files

### SQL Dump

```bash
pig migrate import dump.sql --database mydb
```

### CSV Files

```bash
pig migrate csv data.csv --table users --database mydb
```

### Multiple CSV Files

```bash
pig migrate csv ./data/ --database mydb
```

## Migration Options

| Option | Description |
|--------|-------------|
| `--schema-only` | Migrate structure only |
| `--data-only` | Migrate data only |
| `--no-owner` | Skip ownership |
| `--parallel N` | Parallel jobs |
| `--exclude TABLE` | Exclude tables |

## Verification

Verify migration:

```bash
pig migrate verify --source postgres://source/db --target postgres://target/db
```

## Next Steps

- Learn about [Backup](/docs/task/backup/)
- Understand [PostgreSQL Configuration](/docs/reference/postgres/)
