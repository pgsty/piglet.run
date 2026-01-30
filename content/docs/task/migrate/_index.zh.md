---
title: 迁移
linkTitle: 迁移
weight: 80
icon: fa-solid fa-truck
---

了解如何从其他系统迁移数据到 Piglet Run。

## 概述

Piglet Run 支持从以下系统迁移：

- **其他 PostgreSQL**：从现有 PostgreSQL 实例迁移
- **MySQL/MariaDB**：从 MySQL 转换并迁移
- **云数据库**：AWS RDS、Google Cloud SQL、Azure Database
- **文件**：从 SQL 转储或 CSV 文件导入

## 快速迁移

从另一个 PostgreSQL 迁移：

```bash
pig migrate postgres://user:pass@source-host/dbname
```

## 从 PostgreSQL 迁移

### 直接连接

```bash
pig migrate pg \
  --host source.example.com \
  --port 5432 \
  --user migrate_user \
  --database production
```

### 从 pg_dump 文件

```bash
pig migrate import backup.sql
```

### 仅结构

```bash
pig migrate pg --host source.example.com --schema-only
```

## 从 MySQL 迁移

### 直接迁移

```bash
pig migrate mysql \
  --host mysql.example.com \
  --user migrate_user \
  --database myapp
```

### 带类型映射

```bash
pig migrate mysql --host source --type-map mysql-to-pg.yml
```

## 从云迁移

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

## 导入文件

### SQL 转储

```bash
pig migrate import dump.sql --database mydb
```

### CSV 文件

```bash
pig migrate csv data.csv --table users --database mydb
```

### 多个 CSV 文件

```bash
pig migrate csv ./data/ --database mydb
```

## 迁移选项

| 选项 | 描述 |
|------|------|
| `--schema-only` | 仅迁移结构 |
| `--data-only` | 仅迁移数据 |
| `--no-owner` | 跳过所有权 |
| `--parallel N` | 并行任务数 |
| `--exclude TABLE` | 排除表 |

## 验证

验证迁移：

```bash
pig migrate verify --source postgres://source/db --target postgres://target/db
```

## 下一步

- 了解[备份](/docs/task/backup/)
- 理解 [PostgreSQL 配置](/docs/reference/postgres/)
