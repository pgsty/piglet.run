---
title: 扩展
linkTitle: 扩展
weight: 90
icon: fa-solid fa-puzzle-piece
---

Piglet Run 中可用的 PostgreSQL 扩展。

## 概述

Piglet Run 包含来自 Pigsty 生态系统的 340+ PostgreSQL 扩展。

## 预装扩展

### 核心扩展

| 扩展 | 版本 | 描述 |
|------|------|------|
| `pg_stat_statements` | 1.10 | 跟踪执行统计 |
| `pgcrypto` | 1.3 | 加密函数 |
| `uuid-ossp` | 1.1 | UUID 生成 |
| `hstore` | 1.8 | 键值存储 |
| `ltree` | 1.2 | 层次数据 |
| `pg_trgm` | 1.6 | 三元组匹配 |

### 向量与 AI

| 扩展 | 版本 | 描述 |
|------|------|------|
| `pgvector` | 0.7.0 | 向量相似性搜索 |
| `pgvectorscale` | 0.2.0 | 向量索引 |
| `pg_embedding` | 0.3.6 | 嵌入函数 |

### 时序数据

| 扩展 | 版本 | 描述 |
|------|------|------|
| `timescaledb` | 2.14 | 时序数据库 |
| `pg_partman` | 5.0 | 分区管理 |

### 地理空间

| 扩展 | 版本 | 描述 |
|------|------|------|
| `postgis` | 3.4 | 地理对象 |
| `postgis_topology` | 3.4 | 拓扑支持 |
| `postgis_raster` | 3.4 | 栅格数据 |
| `pgrouting` | 3.6 | 路由算法 |

### 全文搜索

| 扩展 | 版本 | 描述 |
|------|------|------|
| `pg_jieba` | 1.1 | 中文分词 |
| `zhparser` | 2.2 | 中文解析器 |

## 安装扩展

### 通过 SQL

```sql
-- 创建扩展
CREATE EXTENSION pgvector;

-- 在指定 schema 创建扩展
CREATE EXTENSION postgis SCHEMA public;

-- 更新扩展
ALTER EXTENSION pgvector UPDATE;
```

### 通过 CLI

```bash
pig ext install pgvector
pig ext install postgis
```

## 列出扩展

### 已安装扩展

```sql
SELECT * FROM pg_extension;
```

### 可用扩展

```sql
SELECT * FROM pg_available_extensions ORDER BY name;
```

### 扩展详情

```sql
SELECT * FROM pg_available_extension_versions
WHERE name = 'pgvector';
```

## 扩展配置

### pg_stat_statements

```sql
-- 启用跟踪
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';

-- 配置
ALTER SYSTEM SET pg_stat_statements.track = 'all';
ALTER SYSTEM SET pg_stat_statements.max = 10000;
```

### pgvector

```sql
-- 创建扩展
CREATE EXTENSION vector;

-- 创建向量列
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    embedding vector(384)
);

-- 创建索引
CREATE INDEX ON items USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

### PostGIS

```sql
-- 创建扩展
CREATE EXTENSION postgis;

-- 创建几何列
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name TEXT,
    geom geometry(Point, 4326)
);

-- 空间查询
SELECT name FROM locations
WHERE ST_DWithin(geom, ST_MakePoint(-122.4, 37.8)::geography, 1000);
```

### TimescaleDB

```sql
-- 创建扩展
CREATE EXTENSION timescaledb;

-- 创建超表
CREATE TABLE metrics (
    time TIMESTAMPTZ NOT NULL,
    device_id INTEGER,
    value DOUBLE PRECISION
);

SELECT create_hypertable('metrics', 'time');
```

## 管理扩展

```bash
# 列出已安装扩展
pig ext list

# 显示扩展信息
pig ext info pgvector

# 移除扩展
pig ext remove pgvector
```

## 另请参阅

- [PostgreSQL 参考](/docs/reference/postgres/)
- [数据库教程](/docs/tutorial/database/)
