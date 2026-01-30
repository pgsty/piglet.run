---
title: Restore
linkTitle: Restore
weight: 20
icon: fa-solid fa-clock-rotate-left
---

Learn how to restore your database and files from backups or snapshots.

## Overview

Piglet Run supports multiple restore scenarios:

- **Point-in-Time Recovery**: Restore to any moment in time
- **Full Restore**: Restore from a complete backup
- **Selective Restore**: Restore specific databases or files

## Quick Restore

Restore from the latest backup:

```bash
pig restore latest
```

## Restore Database

### List Available Backups

```bash
pig backup list
```

### Restore Full Backup

```bash
pig restore db --backup 2024-01-15
```

### Point-in-Time Recovery

```bash
pig restore db --time "2024-01-15 14:30:00"
```

### Restore Specific Database

```bash
pig restore db mydb --backup 2024-01-15
```

## Restore Files

### Restore All Files

```bash
pig restore files --backup 2024-01-15
```

### Restore Specific Directory

```bash
pig restore files /home/dba/projects --backup 2024-01-15
```

## Restore from Snapshot

```bash
pig snapshot restore snap-20240115
```

## Verification

After restore, verify data integrity:

```bash
pig verify db
pig verify files
```

## Next Steps

- Learn about [Backup](/docs/task/backup/)
- Understand [Clone](/docs/task/clone/)
