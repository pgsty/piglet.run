---
title: 数据库
linkTitle: 数据库
weight: 60
icon: fa-solid fa-database
---

## PostgreSQL 基础

学习在 Piglet Run 中使用 PostgreSQL。

## 连接

### 使用 psql

```bash
psql postgres://postgres@localhost/postgres
```

### 使用 Python

```python
import psycopg

conn = psycopg.connect("postgres://postgres@localhost/postgres")
```

## 创建数据库

```sql
CREATE DATABASE myapp;
```

## 安装扩展

PostgreSQL 18 有 400+ 扩展可用：

```sql
-- 向量搜索
CREATE EXTENSION vector;

-- 时序数据
CREATE EXTENSION timescaledb;

-- 全文搜索（中文）
CREATE EXTENSION zhparser;
```

## 基本操作

```sql
-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 插入数据
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- 查询
SELECT * FROM users;
```

## 监控

在以下位置查看数据库性能：
```
http://<ip>/ui/d/pgsql-overview
```

## 下一步

- 构建 [应用](/docs/tutorial/application/)
- 了解 [备份](/docs/task/backup/)
