---
title: 快照
linkTitle: 快照
weight: 40
icon: fa-solid fa-clock-rotate-left
---

## 时光机器

Piglet Run 为数据库和文件系统都提供时间点恢复功能。

## 数据库 PITR

PostgreSQL 内置的 PITR（时间点恢复）允许您将数据库恢复到任意时间点。由 pgBackRest 管理。

```bash
# 显示备份信息
pig pb info

# 列出所有备份
pig pb ls

# 创建全量备份
pig pb backup full

# 恢复到最新备份
pig pb restore

# 恢复到指定时间
pig pb restore -t "2025-01-29 10:00:00"
```

## 文件系统快照

JuiceFS 快照保存工作区状态：

```bash
# 创建快照（使用 juicefs CLI）
juicefs snapshot create /jfs/data snapshot-before-experiment

# 列出快照
juicefs snapshot list /jfs/data

# 从快照恢复
juicefs snapshot restore /jfs/data snapshot-before-experiment
```

## 使用场景

| 场景 | 解决方案 |
|------|----------|
| AI 写坏代码 | 恢复文件系统快照 |
| 数据库迁移失败 | 使用 `pig pb restore -t <time>` |
| 实验失败 | 回滚整个环境 |
| 需要干净状态 | 恢复到基线快照 |

## 备份管理

```bash
# 查看备份状态
pig pb info

# 查看备份日志
pig pb log tail

# 创建增量备份
pig pb backup incr

# 创建差异备份
pig pb backup diff
```

## 下一步

- 了解 [克隆](/docs/concept/clone/)
- 查看 [恢复任务](/docs/task/restore/)
- 查看 [备份任务](/docs/task/backup/)
