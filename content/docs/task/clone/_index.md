---
title: Clone
linkTitle: Clone
weight: 30
icon: fa-solid fa-code-branch
---

Learn how to clone databases and environments in Piglet Run.

## Overview

Cloning allows you to create exact copies of:

- **Database**: Clone a database for testing or development
- **Environment**: Clone the entire Piglet Run instance
- **Schema Only**: Clone structure without data

## Quick Clone

Clone a database instantly:

```bash
pig clone db mydb mydb_copy
```

## Clone Database

### Full Clone

```bash
pig clone db production development
```

### Schema Only

```bash
pig clone db production development --schema-only
```

### Clone with Data Filter

```bash
pig clone db production development --filter "created_at > '2024-01-01'"
```

## Clone Environment

### Create Environment Clone

```bash
pig clone env --name staging
```

### Clone to Remote Server

```bash
pig clone env --target user@remote-server
```

## Clone from Snapshot

```bash
pig clone snapshot snap-20240115 --name dev-clone
```

## Clone Options

| Option | Description |
|--------|-------------|
| `--schema-only` | Clone structure without data |
| `--no-owner` | Skip ownership information |
| `--no-privileges` | Skip privilege information |
| `--parallel N` | Use N parallel jobs |

## Use Cases

- **Development**: Clone production for local development
- **Testing**: Create isolated test environments
- **Analytics**: Clone for reporting without impacting production

## Next Steps

- Learn about [Snapshots](/docs/concept/snapshot/)
- Understand [Backup](/docs/task/backup/)
