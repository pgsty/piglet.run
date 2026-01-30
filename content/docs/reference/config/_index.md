---
title: Configuration
linkTitle: Config
weight: 20
icon: fa-solid fa-sliders
---

Configuration file reference for Piglet Run.

## Overview

Piglet Run uses YAML configuration files located in `/etc/piglet/`.

## Main Configuration

File: `/etc/piglet/piglet.yml`

```yaml
# Piglet Run Configuration

# System settings
system:
  hostname: piglet
  timezone: UTC
  locale: en_US.UTF-8

# Database settings
database:
  host: localhost
  port: 5432
  user: dba
  database: postgres
  max_connections: 100
  shared_buffers: 256MB

# Services
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

# Storage
storage:
  data_dir: /data
  backup_dir: /data/backup
  temp_dir: /tmp/piglet

# Logging
logging:
  level: info
  file: /var/log/piglet/piglet.log
  max_size: 100M
  max_files: 10
```

## Database Configuration

File: `/etc/piglet/database.yml`

```yaml
# PostgreSQL Configuration

postgresql:
  version: 17
  data_directory: /data/postgres

  # Connection settings
  listen_addresses: localhost
  port: 5432
  max_connections: 100

  # Memory settings
  shared_buffers: 256MB
  effective_cache_size: 768MB
  work_mem: 4MB
  maintenance_work_mem: 64MB

  # WAL settings
  wal_level: replica
  max_wal_size: 1GB
  min_wal_size: 80MB

  # Logging
  log_destination: csvlog
  logging_collector: on
  log_directory: pg_log
```

## Service Configuration

### VS Code Server

File: `/etc/piglet/vscode.yml`

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

File: `/etc/piglet/jupyter.yml`

```yaml
jupyter:
  enabled: true
  port: 8888
  notebook_dir: /home/dba/notebooks
  kernels:
    - python3
    - ir
```

## Backup Configuration

File: `/etc/piglet/backup.yml`

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

## Network Configuration

File: `/etc/piglet/network.yml`

```yaml
network:
  # Domain settings
  domain: localhost

  # SSL settings
  ssl:
    enabled: false
    cert: /etc/piglet/ssl/cert.pem
    key: /etc/piglet/ssl/key.pem

  # Proxy settings
  proxy:
    enabled: false
    host: proxy.example.com
    port: 8080
```

## Environment Variables

Override configuration with environment variables:

```bash
export PIG_DATABASE_PORT=5433
export PIG_SERVICES_VSCODE_ENABLED=false
export PIG_LOGGING_LEVEL=debug
```

## See Also

- [CLI Reference](/docs/reference/cli/)
- [PostgreSQL Configuration](/docs/reference/postgres/)
