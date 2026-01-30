---
title: 恢复
linkTitle: 恢复
weight: 20
icon: fa-solid fa-clock-rotate-left
---

了解如何从备份或快照恢复数据库和文件。

## 概述

Piglet Run 支持多种恢复场景：

- **时间点恢复**：恢复到任意时间点
- **全量恢复**：从完整备份恢复
- **选择性恢复**：恢复特定数据库或文件

## 快速恢复

从最新备份恢复：

```bash
pig restore latest
```

## 恢复数据库

### 列出可用备份

```bash
pig backup list
```

### 恢复全量备份

```bash
pig restore db --backup 2024-01-15
```

### 时间点恢复

```bash
pig restore db --time "2024-01-15 14:30:00"
```

### 恢复指定数据库

```bash
pig restore db mydb --backup 2024-01-15
```

## 恢复文件

### 恢复所有文件

```bash
pig restore files --backup 2024-01-15
```

### 恢复指定目录

```bash
pig restore files /home/dba/projects --backup 2024-01-15
```

## 从快照恢复

```bash
pig snapshot restore snap-20240115
```

## 验证

恢复后验证数据完整性：

```bash
pig verify db
pig verify files
```

## 下一步

- 了解[备份](/docs/task/backup/)
- 理解[克隆](/docs/task/clone/)
