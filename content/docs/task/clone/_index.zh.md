---
title: 克隆
linkTitle: 克隆
weight: 30
icon: fa-solid fa-code-branch
---

了解如何在 Piglet Run 中克隆数据库和环境。

## 概述

克隆允许您创建以下内容的精确副本：

- **数据库**：为测试或开发克隆数据库
- **环境**：克隆整个 Piglet Run 实例
- **仅结构**：克隆结构而不包含数据

## 快速克隆

即时克隆数据库：

```bash
pig clone db mydb mydb_copy
```

## 克隆数据库

### 完整克隆

```bash
pig clone db production development
```

### 仅结构

```bash
pig clone db production development --schema-only
```

### 带数据过滤的克隆

```bash
pig clone db production development --filter "created_at > '2024-01-01'"
```

## 克隆环境

### 创建环境克隆

```bash
pig clone env --name staging
```

### 克隆到远程服务器

```bash
pig clone env --target user@remote-server
```

## 从快照克隆

```bash
pig clone snapshot snap-20240115 --name dev-clone
```

## 克隆选项

| 选项 | 描述 |
|------|------|
| `--schema-only` | 仅克隆结构不含数据 |
| `--no-owner` | 跳过所有权信息 |
| `--no-privileges` | 跳过权限信息 |
| `--parallel N` | 使用 N 个并行任务 |

## 使用场景

- **开发**：克隆生产环境用于本地开发
- **测试**：创建隔离的测试环境
- **分析**：克隆用于报表而不影响生产环境

## 下一步

- 了解[快照](/docs/concept/snapshot/)
- 理解[备份](/docs/task/backup/)
