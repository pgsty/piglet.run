---
title: Backup
linkTitle: Backup
weight: 10
icon: fa-solid fa-cloud-arrow-up
---

Learn how to backup your database and files in Piglet Run.

## Overview

Piglet Run provides multiple backup methods to protect your data:

- **Database Backup**: Full and incremental PostgreSQL backups
- **File Backup**: User files and configurations
- **Snapshot**: Complete system state capture

## Quick Backup

Create a full backup with a single command:

```bash
pig backup create
```

## Backup Database

### Full Database Backup

```bash
pig backup db --full
```

### Incremental Backup

```bash
pig backup db --incremental
```

### Backup Specific Database

```bash
pig backup db mydb
```

## Backup Files

### Backup User Files

```bash
pig backup files
```

### Backup Configurations

```bash
pig backup config
```

## Scheduled Backups

Configure automatic backups in `/etc/piglet/backup.yml`:

```yaml
backup:
  schedule: "0 2 * * *"  # Daily at 2 AM
  retention: 7           # Keep 7 days
  type: incremental
```

## Backup Storage

Backups are stored in:

| Type | Location |
|------|----------|
| Database | `/data/backup/postgres/` |
| Files | `/data/backup/files/` |
| Config | `/data/backup/config/` |

## Next Steps

- Learn about [Restore](/docs/task/restore/)
- Understand [Snapshots](/docs/concept/snapshot/)
