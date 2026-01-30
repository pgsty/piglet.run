---
title: 备份
linkTitle: 备份
weight: 10
icon: fa-solid fa-cloud-arrow-up
---

了解如何在 Piglet Run 中备份数据库和文件。

## 概述

Piglet Run 提供多种备份方式来保护您的数据：

- **数据库备份**：PostgreSQL 全量和增量备份
- **文件备份**：用户文件和配置
- **快照**：完整系统状态捕获

## 快速备份

使用单个命令创建完整备份：

```bash
pig backup create
```

## 备份数据库

### 全量数据库备份

```bash
pig backup db --full
```

### 增量备份

```bash
pig backup db --incremental
```

### 备份指定数据库

```bash
pig backup db mydb
```

## 备份文件

### 备份用户文件

```bash
pig backup files
```

### 备份配置

```bash
pig backup config
```

## 定时备份

在 `/etc/piglet/backup.yml` 中配置自动备份：

```yaml
backup:
  schedule: "0 2 * * *"  # 每天凌晨 2 点
  retention: 7           # 保留 7 天
  type: incremental
```

## 备份存储

备份存储位置：

| 类型 | 位置 |
|------|------|
| 数据库 | `/data/backup/postgres/` |
| 文件 | `/data/backup/files/` |
| 配置 | `/data/backup/config/` |

## 下一步

- 了解[恢复](/docs/task/restore/)
- 理解[快照](/docs/concept/snapshot/)
