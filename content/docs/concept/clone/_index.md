---
title: Clone
linkTitle: Clone
weight: 50
icon: fa-solid fa-code-branch
---

## Instant Cloning

Piglet Run supports Copy-on-Write (CoW) cloning for rapid database forking.

## How It Works

Copy-on-Write means:
- **Zero copy** at clone time
- Only **changed blocks** consume storage
- TB-scale databases clone in **milliseconds**

```
Original Database
┌─────────────────────┐
│ Block A │ Block B │ Block C │
└────┬────┴────┬────┴────┬────┘
     │         │         │
     ▼         ▼         ▼
┌────────────────────────────┐
│      Shared Storage        │
└────────────────────────────┘
     ▲         ▲         ▲
     │         │         │
┌────┴────┬────┴────┬────┴────┐
│ Block A │ Block B │ Block C │ (shared)
│         │ Block B'│         │ (changed in clone)
└─────────┴─────────┴─────────┘
Cloned Database
```

## Use Cases

| Use Case | Benefit |
|----------|---------|
| **Development** | Clone prod for testing |
| **AI Experiments** | Branch for each experiment |
| **Feature Branches** | Database per branch |
| **Training** | Each learner gets own copy |

## Database Cloning

Using PostgreSQL utilities:

```bash
# Create database from template
pig pg psql -c "CREATE DATABASE dev TEMPLATE prod"

# Or using pg_dump/pg_restore for cross-server clone
pg_dump -Fc prod > prod.dump
pg_restore -d dev prod.dump
```

## Using pgBackRest for Cloning

```bash
# Restore to a new cluster as a clone
pig pb restore --target-pgdata=/data/pg-clone

# Or restore to specific time point
pig pb restore -t "2025-01-29 10:00:00" --target-pgdata=/data/pg-clone
```

## Filesystem Cloning with JuiceFS

```bash
# Clone directory using JuiceFS snapshot
juicefs snapshot create /jfs/workspace ws-snapshot
juicefs snapshot restore /jfs/workspace-clone ws-snapshot
```

## Next Steps

- See [Clone Task](/docs/task/clone/)
- Learn about [Snapshots](/docs/concept/snapshot/)
