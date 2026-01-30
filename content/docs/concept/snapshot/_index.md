---
title: Snapshot
linkTitle: Snapshot
weight: 40
icon: fa-solid fa-clock-rotate-left
---

## Time Machine

Piglet Run provides point-in-time recovery for both database and filesystem.

## Database PITR

PostgreSQL's built-in PITR (Point-in-Time Recovery) allows you to restore the database to any point in time. Managed by pgBackRest.

```bash
# Show backup information
pig pb info

# List all backups
pig pb ls

# Create a full backup
pig pb backup full

# Restore to latest backup
pig pb restore

# Restore to specific time
pig pb restore -t "2025-01-29 10:00:00"
```

## Filesystem Snapshots

JuiceFS snapshots preserve the state of your workspace:

```bash
# Create a snapshot (using juicefs CLI)
juicefs snapshot create /jfs/data snapshot-before-experiment

# List snapshots
juicefs snapshot list /jfs/data

# Restore from snapshot
juicefs snapshot restore /jfs/data snapshot-before-experiment
```

## Use Cases

| Scenario | Solution |
|----------|----------|
| AI broke code | Restore filesystem snapshot |
| Bad database migration | Use `pig pb restore -t <time>` |
| Experiment failed | Roll back entire environment |
| Need clean state | Restore to baseline snapshot |

## Backup Management

```bash
# View backup status
pig pb info

# View backup logs
pig pb log tail

# Create incremental backup
pig pb backup incr

# Create differential backup
pig pb backup diff
```

## Next Steps

- Learn about [Cloning](/docs/concept/clone/)
- See [Restore Task](/docs/task/restore/)
- See [Backup Task](/docs/task/backup/)
