---
title: 监控
linkTitle: 监控
weight: 60
icon: fa-solid fa-chart-line
---

## 全栈可观测性

Piglet Run 包含基于 VictoriaMetrics 和 Grafana 的完整监控栈。

## 组件

| 组件 | 角色 |
|------|------|
| **VictoriaMetrics** | 时序数据库 |
| **Grafana** | 可视化仪表盘 |
| **node_exporter** | 系统指标 |
| **pg_exporter** | PostgreSQL 指标 |

## 仪表盘

访问 Grafana：`http://<ip>/ui`

可用仪表盘：
- **Claude Code**：AI Agent 监控
- **PostgreSQL**：数据库性能
- **System**：主机指标
- **JuiceFS**：文件系统统计

## 指标

收集超过 **3000+** 指标：
- 数据库查询、连接、锁
- 系统 CPU、内存、磁盘、网络
- 应用特定指标

## 告警

配置告警用于：
- 高 CPU/内存使用
- 数据库连接限制
- 磁盘空间警告
- 查询性能问题

## 下一步

- 查看 [监控任务](/docs/task/monitor/)
- 了解 [Grafana 参考](/docs/reference/grafana/)
