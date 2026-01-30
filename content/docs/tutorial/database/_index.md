---
title: Database
linkTitle: Database
weight: 60
icon: fa-solid fa-database
---

## PostgreSQL Basics

Learn to work with PostgreSQL in Piglet Run.

## Connect

### Using psql

```bash
psql postgres://postgres@localhost/postgres
```

### Using Python

```python
import psycopg

conn = psycopg.connect("postgres://postgres@localhost/postgres")
```

## Create Database

```sql
CREATE DATABASE myapp;
```

## Install Extensions

PostgreSQL 18 with 400+ extensions available:

```sql
-- Vector search
CREATE EXTENSION vector;

-- Time series
CREATE EXTENSION timescaledb;

-- Full text search (Chinese)
CREATE EXTENSION zhparser;
```

## Basic Operations

```sql
-- Create table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert data
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- Query
SELECT * FROM users;
```

## Monitoring

View database performance at:
```
http://<ip>/ui/d/pgsql-overview
```

## Next Steps

- Build an [Application](/docs/tutorial/application/)
- Learn about [Backup](/docs/task/backup/)
