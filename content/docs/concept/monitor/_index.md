---
title: Monitoring
linkTitle: Monitor
weight: 60
icon: fa-solid fa-chart-line
---

## Full Observability

Piglet Run includes a complete monitoring stack based on VictoriaMetrics and Grafana.

## Components

| Component | Role |
|-----------|------|
| **VictoriaMetrics** | Time-series database |
| **Grafana** | Visualization dashboards |
| **node_exporter** | System metrics |
| **pg_exporter** | PostgreSQL metrics |

## Dashboards

Access Grafana at `http://<ip>/ui`

Available dashboards:
- **Claude Code**: AI agent monitoring
- **PostgreSQL**: Database performance
- **System**: Host metrics
- **JuiceFS**: Filesystem statistics

## Metrics

Over **3000+** metrics collected:
- Database queries, connections, locks
- System CPU, memory, disk, network
- Application-specific metrics

## Alerts

Configure alerts for:
- High CPU/memory usage
- Database connection limits
- Disk space warnings
- Query performance issues

## Next Steps

- See [Monitor Task](/docs/task/monitor/)
- Learn about [Grafana Reference](/docs/reference/grafana/)
