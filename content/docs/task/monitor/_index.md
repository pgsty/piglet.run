---
title: Monitor
linkTitle: Monitor
weight: 90
icon: fa-solid fa-bell
---

Learn how to set up alerts and monitoring for your Piglet Run instance.

## Overview

Piglet Run includes comprehensive monitoring:

- **Grafana Dashboards**: Visual monitoring
- **Alerting**: Configurable alerts
- **Metrics**: Prometheus-based metrics
- **Logs**: Centralized logging

## Quick Setup

Access monitoring dashboard:

```bash
pig monitor open
# Opens Grafana at http://<ip>/ui
```

## Grafana Dashboards

### Available Dashboards

| Dashboard | Description |
|-----------|-------------|
| Overview | System overview and health |
| PostgreSQL | Database performance metrics |
| Node | Server resource usage |
| Nginx | Web server statistics |

### Access Dashboards

```bash
# Default credentials
URL: http://<ip>/ui
User: admin
Password: (shown during install)
```

## Set Up Alerts

### Enable Email Alerts

```bash
pig alert email --to admin@example.com --smtp smtp.example.com
```

### Enable Slack Alerts

```bash
pig alert slack --webhook https://hooks.slack.com/services/...
```

### Enable Webhook Alerts

```bash
pig alert webhook --url https://api.example.com/alerts
```

## Alert Rules

### View Alert Rules

```bash
pig alert list
```

### Add Custom Alert

```bash
pig alert add \
  --name "High CPU" \
  --condition "cpu_usage > 80" \
  --duration 5m \
  --severity warning
```

### Default Alerts

| Alert | Condition | Severity |
|-------|-----------|----------|
| High CPU | > 80% for 5m | Warning |
| High Memory | > 90% for 5m | Warning |
| Disk Full | > 85% | Critical |
| DB Down | Connection failed | Critical |
| Replication Lag | > 1s | Warning |

## Configuration

Alert configuration in `/etc/piglet/alerts.yml`:

```yaml
alerts:
  email:
    enabled: true
    to: admin@example.com
    smtp:
      host: smtp.example.com
      port: 587
  slack:
    enabled: false
    webhook: ""
  rules:
    - name: high_cpu
      expr: cpu_usage > 80
      for: 5m
      severity: warning
```

## View Logs

```bash
# All service logs
pig logs

# Specific service
pig logs postgres
pig logs nginx
```

## Next Steps

- Learn about [Grafana](/docs/reference/grafana/)
- Understand [Architecture](/docs/concept/arch/)
