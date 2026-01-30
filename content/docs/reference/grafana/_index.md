---
title: Grafana
linkTitle: Grafana
weight: 70
icon: fa-solid fa-chart-pie
---

Grafana monitoring dashboard configuration for Piglet Run.

## Overview

Piglet Run includes Grafana for comprehensive monitoring and visualization.

## Access

Default URL: `http://<ip>/ui`

Default credentials:
- Username: `admin`
- Password: (shown during installation)

## Configuration

File: `/etc/grafana/grafana.ini`

```ini
[server]
http_port = 3000
root_url = %(protocol)s://%(domain)s/ui/
serve_from_sub_path = true

[security]
admin_user = admin
admin_password = ${GRAFANA_PASSWORD}

[auth.anonymous]
enabled = false

[dashboards]
default_home_dashboard_path = /var/lib/grafana/dashboards/home.json

[database]
type = postgres
host = localhost:5432
name = grafana
user = grafana
```

## Pre-installed Dashboards

| Dashboard | Description |
|-----------|-------------|
| Home | System overview |
| PostgreSQL | Database metrics |
| Node Exporter | Server resources |
| Nginx | Web server metrics |
| Logs | Log viewer |

## Data Sources

### Prometheus

```yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://localhost:9090
    access: proxy
    isDefault: true
```

### PostgreSQL

```yaml
datasources:
  - name: PostgreSQL
    type: postgres
    url: localhost:5432
    database: postgres
    user: grafana
    secureJsonData:
      password: ${GRAFANA_DB_PASSWORD}
```

### Loki (Logs)

```yaml
datasources:
  - name: Loki
    type: loki
    url: http://localhost:3100
    access: proxy
```

## Service Management

```bash
# Start Grafana
pig start grafana

# Stop Grafana
pig stop grafana

# Restart Grafana
pig restart grafana

# View logs
pig logs grafana
```

## Creating Dashboards

### Via UI

1. Click "+" in left sidebar
2. Select "Dashboard"
3. Add panels with queries
4. Save dashboard

### Via Provisioning

Place JSON dashboard files in `/var/lib/grafana/dashboards/`

```yaml
# /etc/grafana/provisioning/dashboards/default.yaml
apiVersion: 1
providers:
  - name: default
    folder: ''
    type: file
    options:
      path: /var/lib/grafana/dashboards
```

## Alerting

### Configure Email

```ini
[smtp]
enabled = true
host = smtp.example.com:587
user = alerts@example.com
password = ${SMTP_PASSWORD}
from_address = alerts@example.com
```

### Create Alert Rule

1. Edit panel query
2. Go to "Alert" tab
3. Set conditions
4. Configure notifications

## Useful Queries

### PostgreSQL Connections

```promql
pg_stat_activity_count
```

### CPU Usage

```promql
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

### Memory Usage

```promql
(1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100
```

### Disk Usage

```promql
(1 - node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100
```

## API Access

Generate API key:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"mykey", "role": "Admin"}' \
  http://admin:password@localhost:3000/api/auth/keys
```

## Troubleshooting

```bash
# Check service status
systemctl status grafana-server

# View logs
journalctl -u grafana-server -f

# Test database connection
psql -U grafana -d grafana -c "SELECT 1"
```

## See Also

- [Monitoring Task](/docs/task/monitor/)
- [PostgreSQL Reference](/docs/reference/postgres/)
