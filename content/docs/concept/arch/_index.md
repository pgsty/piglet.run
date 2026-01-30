---
title: Architecture
linkTitle: Architecture
weight: 20
icon: fa-solid fa-sitemap
---

## System Architecture

Piglet Run is built on top of Pigsty, providing a streamlined development environment.

## Components

| Component | Role | Port |
|-----------|------|------|
| **Nginx** | Reverse proxy, SSL termination | 80, 443 |
| **VS Code Server** | Web-based IDE | /code |
| **JupyterLab** | Data science notebook | /jupyter |
| **PostgreSQL** | Primary database | 5432 |
| **JuiceFS** | Distributed filesystem | - |
| **VictoriaMetrics** | Metrics storage | 8428 |
| **Grafana** | Monitoring dashboards | /ui |

## Network Architecture

```
Internet
    │
    ▼
┌─────────┐
│  Nginx  │ :80, :443
└────┬────┘
     │
     ├──────────────┬──────────────┬──────────────┐
     │              │              │              │
     ▼              ▼              ▼              ▼
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ VS Code │   │ Jupyter │   │ Grafana │   │   App   │
│ /code   │   │/jupyter │   │  /ui    │   │   /*    │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
```

## Storage Architecture

All development work is stored in PostgreSQL via JuiceFS:

```
┌─────────────────────────────────────┐
│          Working Directory          │
│         ~/workspace                 │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│            JuiceFS                  │
│     (POSIX-compatible FS)           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│          PostgreSQL                 │
│     (Metadata + Data Chunks)        │
└─────────────────────────────────────┘
```

## Next Steps

- Learn about [Storage](/docs/concept/storage/)
- Understand [Snapshots](/docs/concept/snapshot/)
