---
title: Extensions
linkTitle: Extensions
weight: 90
icon: fa-solid fa-puzzle-piece
---

PostgreSQL extensions available in Piglet Run.

## Overview

Piglet Run includes 340+ PostgreSQL extensions from the Pigsty ecosystem.

## Pre-installed Extensions

### Core Extensions

| Extension | Version | Description |
|-----------|---------|-------------|
| `pg_stat_statements` | 1.10 | Track execution statistics |
| `pgcrypto` | 1.3 | Cryptographic functions |
| `uuid-ossp` | 1.1 | UUID generation |
| `hstore` | 1.8 | Key-value store |
| `ltree` | 1.2 | Hierarchical data |
| `pg_trgm` | 1.6 | Trigram matching |

### Vector & AI

| Extension | Version | Description |
|-----------|---------|-------------|
| `pgvector` | 0.7.0 | Vector similarity search |
| `pgvectorscale` | 0.2.0 | Vector indexing |
| `pg_embedding` | 0.3.6 | Embedding functions |

### Time Series

| Extension | Version | Description |
|-----------|---------|-------------|
| `timescaledb` | 2.14 | Time-series database |
| `pg_partman` | 5.0 | Partition management |

### Geospatial

| Extension | Version | Description |
|-----------|---------|-------------|
| `postgis` | 3.4 | Geographic objects |
| `postgis_topology` | 3.4 | Topology support |
| `postgis_raster` | 3.4 | Raster data |
| `pgrouting` | 3.6 | Routing algorithms |

### Full Text Search

| Extension | Version | Description |
|-----------|---------|-------------|
| `pg_jieba` | 1.1 | Chinese word segmentation |
| `zhparser` | 2.2 | Chinese parser |

## Installing Extensions

### Via SQL

```sql
-- Create extension
CREATE EXTENSION pgvector;

-- Create extension in specific schema
CREATE EXTENSION postgis SCHEMA public;

-- Update extension
ALTER EXTENSION pgvector UPDATE;
```

### Via CLI

```bash
pig ext install pgvector
pig ext install postgis
```

## Listing Extensions

### Installed Extensions

```sql
SELECT * FROM pg_extension;
```

### Available Extensions

```sql
SELECT * FROM pg_available_extensions ORDER BY name;
```

### Extension Details

```sql
SELECT * FROM pg_available_extension_versions
WHERE name = 'pgvector';
```

## Extension Configuration

### pg_stat_statements

```sql
-- Enable tracking
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';

-- Configure
ALTER SYSTEM SET pg_stat_statements.track = 'all';
ALTER SYSTEM SET pg_stat_statements.max = 10000;
```

### pgvector

```sql
-- Create extension
CREATE EXTENSION vector;

-- Create vector column
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    embedding vector(384)
);

-- Create index
CREATE INDEX ON items USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

### PostGIS

```sql
-- Create extension
CREATE EXTENSION postgis;

-- Create geometry column
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name TEXT,
    geom geometry(Point, 4326)
);

-- Spatial query
SELECT name FROM locations
WHERE ST_DWithin(geom, ST_MakePoint(-122.4, 37.8)::geography, 1000);
```

### TimescaleDB

```sql
-- Create extension
CREATE EXTENSION timescaledb;

-- Create hypertable
CREATE TABLE metrics (
    time TIMESTAMPTZ NOT NULL,
    device_id INTEGER,
    value DOUBLE PRECISION
);

SELECT create_hypertable('metrics', 'time');
```

## Managing Extensions

```bash
# List installed extensions
pig ext list

# Show extension info
pig ext info pgvector

# Remove extension
pig ext remove pgvector
```

## See Also

- [PostgreSQL Reference](/docs/reference/postgres/)
- [Database Tutorial](/docs/tutorial/database/)
