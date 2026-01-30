---
title: PostgreSQL
linkTitle: PostgreSQL
weight: 50
icon: fa-solid fa-database
---

Piglet Run 的 PostgreSQL 数据库配置和详情。

## 概述

Piglet Run 包含 PostgreSQL 17 作为主数据库，并提供优化的默认配置。

## 连接详情

| 参数 | 默认值 |
|------|--------|
| 主机 | `localhost` |
| 端口 | `5432` |
| 用户 | `dba` |
| 数据库 | `postgres` |
| Socket | `/var/run/postgresql` |

## 连接字符串

### 本地连接

```bash
psql -U dba -d postgres
```

### TCP 连接

```
postgresql://dba@localhost:5432/postgres
```

### 带密码

```
postgresql://dba:password@localhost:5432/postgres
```

## 配置

文件：`/data/postgres/postgresql.conf`

### 内存设置

```ini
# 内存
shared_buffers = 256MB
effective_cache_size = 768MB
work_mem = 4MB
maintenance_work_mem = 64MB
huge_pages = try
```

### 连接设置

```ini
# 连接
listen_addresses = 'localhost'
port = 5432
max_connections = 100
superuser_reserved_connections = 3
```

### WAL 设置

```ini
# WAL
wal_level = replica
max_wal_size = 1GB
min_wal_size = 80MB
wal_buffers = 8MB
checkpoint_completion_target = 0.9
```

### 日志

```ini
# 日志
log_destination = 'csvlog'
logging_collector = on
log_directory = 'pg_log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_statement = 'ddl'
log_min_duration_statement = 1000
```

## 客户端认证

文件：`/data/postgres/pg_hba.conf`

```
# 类型   数据库        用户            地址                    方法
local   all             all                                     trust
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             ::1/128                 scram-sha-256
```

## 服务管理

```bash
# 启动 PostgreSQL
pig start postgres

# 停止 PostgreSQL
pig stop postgres

# 重启 PostgreSQL
pig restart postgres

# 重载配置
pig reload postgres

# 查看日志
pig logs postgres
```

## 数据库管理

```bash
# 创建数据库
pig db create mydb

# 列出数据库
pig db list

# 删除数据库
pig db drop mydb

# 连接数据库
pig db connect mydb
```

## 用户管理

```bash
# 创建用户
pig user create myuser

# 授予权限
psql -c "GRANT ALL ON DATABASE mydb TO myuser"

# 修改密码
pig user passwd myuser
```

## 备份和恢复

```bash
# 全量备份
pig backup db --full

# 时间点恢复
pig restore db --time "2024-01-15 14:30:00"
```

## 性能调优

### 按内存推荐设置

| 内存 | shared_buffers | effective_cache_size | work_mem |
|------|----------------|---------------------|----------|
| 4GB | 1GB | 3GB | 32MB |
| 8GB | 2GB | 6GB | 64MB |
| 16GB | 4GB | 12GB | 128MB |
| 32GB | 8GB | 24GB | 256MB |

## 监控

```bash
# 连接统计
psql -c "SELECT * FROM pg_stat_activity"

# 数据库大小
psql -c "SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) FROM pg_database"

# 表统计
psql -c "SELECT * FROM pg_stat_user_tables"
```

## 另请参阅

- [数据库教程](/docs/tutorial/database/)
- [扩展参考](/docs/reference/extensions/)
- [备份任务](/docs/task/backup/)
