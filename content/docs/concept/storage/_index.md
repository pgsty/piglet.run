---
title: Storage
linkTitle: Storage
weight: 30
icon: fa-solid fa-hard-drive
---

## JuiceFS Shared Storage

Piglet Run uses **JuiceFS** to provide a distributed filesystem backed by PostgreSQL.

## Why JuiceFS?

- **POSIX Compatible**: Works like a normal filesystem
- **Database-Backed**: Data stored in PostgreSQL
- **Snapshots**: Point-in-time recovery support
- **Multi-User**: Share workspace across sessions

## How It Works

```
┌────────────────────────────────────────────┐
│              Application Layer             │
│   (VS Code, Jupyter, Claude Code, etc.)    │
└──────────────────┬─────────────────────────┘
                   │ POSIX API
                   ▼
┌────────────────────────────────────────────┐
│               JuiceFS FUSE                 │
│         (Filesystem in Userspace)          │
└──────────────────┬─────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌───────────────┐    ┌───────────────┐
│   Metadata    │    │  Data Chunks  │
│  (PostgreSQL) │    │  (PostgreSQL) │
└───────────────┘    └───────────────┘
```

## Features

| Feature | Description |
|---------|-------------|
| **Transparent** | Use like local filesystem |
| **Durable** | Data stored in database |
| **Concurrent** | Multiple users/agents access |
| **Snapshots** | Point-in-time recovery |

## Next Steps

- Learn about [Snapshots](/docs/concept/snapshot/)
- Understand [Cloning](/docs/concept/clone/)
