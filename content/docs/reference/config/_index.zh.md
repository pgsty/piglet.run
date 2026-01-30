---
title: 配置
linkTitle: 配置
weight: 20
icon: fa-solid fa-sliders
---

Piglet Run 配置文件参考。

## 概述

Piglet Run 使用位于 `/etc/piglet/` 的 YAML 配置文件。

## 主配置

文件：`/etc/piglet/piglet.yml`

```yaml
# Piglet Run 配置

# 系统设置
system:
  hostname: piglet
  timezone: UTC
  locale: en_US.UTF-8

# 数据库设置
database:
  host: localhost
  port: 5432
  user: dba
  database: postgres
  max_connections: 100
  shared_buffers: 256MB

# 服务
services:
  vscode:
    enabled: true
    port: 8080
  jupyter:
    enabled: true
    port: 8888
  grafana:
    enabled: true
    port: 3000

# 存储
storage:
  data_dir: /data
  backup_dir: /data/backup
  temp_dir: /tmp/piglet

# 日志
logging:
  level: info
  file: /var/log/piglet/piglet.log
  max_size: 100M
  max_files: 10
```

## 数据库配置

文件：`/etc/piglet/database.yml`

```yaml
# PostgreSQL 配置

postgresql:
  version: 17
  data_directory: /data/postgres

  # 连接设置
  listen_addresses: localhost
  port: 5432
  max_connections: 100

  # 内存设置
  shared_buffers: 256MB
  effective_cache_size: 768MB
  work_mem: 4MB
  maintenance_work_mem: 64MB

  # WAL 设置
  wal_level: replica
  max_wal_size: 1GB
  min_wal_size: 80MB

  # 日志
  log_destination: csvlog
  logging_collector: on
  log_directory: pg_log
```

## 服务配置

### VS Code 服务器

文件：`/etc/piglet/vscode.yml`

```yaml
vscode:
  enabled: true
  port: 8080
  auth: password
  extensions:
    - ms-python.python
    - rust-lang.rust-analyzer
```

### JupyterLab

文件：`/etc/piglet/jupyter.yml`

```yaml
jupyter:
  enabled: true
  port: 8888
  notebook_dir: /home/dba/notebooks
  kernels:
    - python3
    - ir
```

## 备份配置

文件：`/etc/piglet/backup.yml`

```yaml
backup:
  enabled: true
  schedule: "0 2 * * *"
  retention: 7

  database:
    type: full
    compress: true

  files:
    enabled: true
    paths:
      - /home/dba
      - /etc/piglet
```

## 网络配置

文件：`/etc/piglet/network.yml`

```yaml
network:
  # 域名设置
  domain: localhost

  # SSL 设置
  ssl:
    enabled: false
    cert: /etc/piglet/ssl/cert.pem
    key: /etc/piglet/ssl/key.pem

  # 代理设置
  proxy:
    enabled: false
    host: proxy.example.com
    port: 8080
```

## 环境变量

使用环境变量覆盖配置：

```bash
export PIG_DATABASE_PORT=5433
export PIG_SERVICES_VSCODE_ENABLED=false
export PIG_LOGGING_LEVEL=debug
```

## 另请参阅

- [CLI 参考](/docs/reference/cli/)
- [PostgreSQL 配置](/docs/reference/postgres/)
