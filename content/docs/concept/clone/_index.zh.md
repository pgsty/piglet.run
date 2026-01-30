---
title: 克隆
linkTitle: 克隆
weight: 50
icon: fa-solid fa-code-branch
---

## 瞬间克隆

Piglet Run 支持 Copy-on-Write（写时复制）克隆，实现快速数据库分支。

## 工作原理

Copy-on-Write 意味着：
- 克隆时**零拷贝**
- 只有**修改的块**才消耗存储
- TB 级数据库**毫秒级**克隆

```
原始数据库
┌─────────────────────┐
│ Block A │ Block B │ Block C │
└────┬────┴────┬────┴────┬────┘
     │         │         │
     ▼         ▼         ▼
┌────────────────────────────┐
│        共享存储             │
└────────────────────────────┘
     ▲         ▲         ▲
     │         │         │
┌────┴────┬────┴────┬────┴────┐
│ Block A │ Block B │ Block C │ (共享)
│         │ Block B'│         │ (克隆中修改)
└─────────┴─────────┴─────────┘
克隆数据库
```

## 使用场景

| 场景 | 优势 |
|------|------|
| **开发** | 克隆生产环境用于测试 |
| **AI 实验** | 每个实验一个分支 |
| **功能分支** | 每个分支一个数据库 |
| **培训** | 每个学员一份副本 |

## 数据库克隆

使用 PostgreSQL 工具：

```bash
# 从模板创建数据库
pig pg psql -c "CREATE DATABASE dev TEMPLATE prod"

# 或使用 pg_dump/pg_restore 跨服务器克隆
pg_dump -Fc prod > prod.dump
pg_restore -d dev prod.dump
```

## 使用 pgBackRest 克隆

```bash
# 恢复到新集群作为克隆
pig pb restore --target-pgdata=/data/pg-clone

# 或恢复到特定时间点
pig pb restore -t "2025-01-29 10:00:00" --target-pgdata=/data/pg-clone
```

## 使用 JuiceFS 克隆文件系统

```bash
# 使用 JuiceFS 快照克隆目录
juicefs snapshot create /jfs/workspace ws-snapshot
juicefs snapshot restore /jfs/workspace-clone ws-snapshot
```

## 下一步

- 查看 [克隆任务](/docs/task/clone/)
- 了解 [快照](/docs/concept/snapshot/)
