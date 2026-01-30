---
title: 监控
linkTitle: 监控
weight: 90
icon: fa-solid fa-bell
---

了解如何为 Piglet Run 实例设置告警和监控。

## 概述

Piglet Run 包含全面的监控功能：

- **Grafana 仪表盘**：可视化监控
- **告警**：可配置的告警
- **指标**：基于 Prometheus 的指标
- **日志**：集中式日志

## 快速设置

访问监控仪表盘：

```bash
pig monitor open
# 在 http://<ip>/ui 打开 Grafana
```

## Grafana 仪表盘

### 可用仪表盘

| 仪表盘 | 描述 |
|--------|------|
| Overview | 系统概览和健康状态 |
| PostgreSQL | 数据库性能指标 |
| Node | 服务器资源使用 |
| Nginx | Web 服务器统计 |

### 访问仪表盘

```bash
# 默认凭据
URL: http://<ip>/ui
用户: admin
密码: (安装时显示)
```

## 设置告警

### 启用邮件告警

```bash
pig alert email --to admin@example.com --smtp smtp.example.com
```

### 启用 Slack 告警

```bash
pig alert slack --webhook https://hooks.slack.com/services/...
```

### 启用 Webhook 告警

```bash
pig alert webhook --url https://api.example.com/alerts
```

## 告警规则

### 查看告警规则

```bash
pig alert list
```

### 添加自定义告警

```bash
pig alert add \
  --name "High CPU" \
  --condition "cpu_usage > 80" \
  --duration 5m \
  --severity warning
```

### 默认告警

| 告警 | 条件 | 严重级别 |
|------|------|----------|
| CPU 过高 | > 80% 持续 5 分钟 | 警告 |
| 内存过高 | > 90% 持续 5 分钟 | 警告 |
| 磁盘满 | > 85% | 严重 |
| 数据库宕机 | 连接失败 | 严重 |
| 复制延迟 | > 1 秒 | 警告 |

## 配置

`/etc/piglet/alerts.yml` 中的告警配置：

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

## 查看日志

```bash
# 所有服务日志
pig logs

# 特定服务
pig logs postgres
pig logs nginx
```

## 下一步

- 了解 [Grafana](/docs/reference/grafana/)
- 理解[架构](/docs/concept/arch/)
