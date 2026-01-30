---
title: Grafana
linkTitle: Grafana
weight: 70
icon: fa-solid fa-chart-pie
---

Piglet Run 的 Grafana 监控仪表盘配置。

## 概述

Piglet Run 包含 Grafana，用于全面的监控和可视化。

## 访问

默认 URL：`http://<ip>/ui`

默认凭据：
- 用户名：`admin`
- 密码：（安装时显示）

## 配置

文件：`/etc/grafana/grafana.ini`

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

## 预装仪表盘

| 仪表盘 | 描述 |
|--------|------|
| Home | 系统概览 |
| PostgreSQL | 数据库指标 |
| Node Exporter | 服务器资源 |
| Nginx | Web 服务器指标 |
| Logs | 日志查看器 |

## 数据源

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

### Loki (日志)

```yaml
datasources:
  - name: Loki
    type: loki
    url: http://localhost:3100
    access: proxy
```

## 服务管理

```bash
# 启动 Grafana
pig start grafana

# 停止 Grafana
pig stop grafana

# 重启 Grafana
pig restart grafana

# 查看日志
pig logs grafana
```

## 创建仪表盘

### 通过 UI

1. 点击左侧边栏的 "+"
2. 选择 "Dashboard"
3. 添加带查询的面板
4. 保存仪表盘

### 通过配置

将 JSON 仪表盘文件放在 `/var/lib/grafana/dashboards/`

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

## 告警

### 配置邮件

```ini
[smtp]
enabled = true
host = smtp.example.com:587
user = alerts@example.com
password = ${SMTP_PASSWORD}
from_address = alerts@example.com
```

### 创建告警规则

1. 编辑面板查询
2. 进入 "Alert" 标签
3. 设置条件
4. 配置通知

## 常用查询

### PostgreSQL 连接

```promql
pg_stat_activity_count
```

### CPU 使用率

```promql
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

### 内存使用率

```promql
(1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100
```

### 磁盘使用率

```promql
(1 - node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100
```

## API 访问

生成 API 密钥：

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"mykey", "role": "Admin"}' \
  http://admin:password@localhost:3000/api/auth/keys
```

## 故障排除

```bash
# 检查服务状态
systemctl status grafana-server

# 查看日志
journalctl -u grafana-server -f

# 测试数据库连接
psql -U grafana -d grafana -c "SELECT 1"
```

## 另请参阅

- [监控任务](/docs/task/monitor/)
- [PostgreSQL 参考](/docs/reference/postgres/)
