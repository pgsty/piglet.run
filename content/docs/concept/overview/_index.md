---
title: Overview
linkTitle: Overview
weight: 10
icon: fa-solid fa-eye
---

## What is Piglet Run?

**Piglet Run** is a lightweight runtime environment from Pigsty, designed as a **cloud coding sandbox for AI Web Coding**. It integrates PostgreSQL database, JuiceFS distributed storage, VS Code, JupyterLab, and more into a unified environment.

## Why Piglet Run?

In the age of AI-assisted development, developers need:

- **Instant development environments** that just work
- **Powerful databases** with all extensions available
- **Safe experimentation** with easy rollback
- **Seamless collaboration** between humans and AI agents

Piglet Run provides all of this in a single package.

## Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Coding** | Pre-installed Claude Code, OpenCode, VS Code, Jupyter |
| 🐘 **Data Powerhouse** | PostgreSQL 18 + 400+ extensions |
| 💾 **Shared Storage** | JuiceFS stores workspace in database |
| ⏱️ **Time Machine** | Database PITR + filesystem snapshots |
| 🔀 **Instant Clone** | Copy-on-Write database forking |
| 🌐 **One-Click Deploy** | Built-in Nginx with auto SSL |
| 📊 **Full Observability** | VictoriaMetrics + Grafana |
| 🇨🇳 **China Friendly** | Global CDN + China mirrors |

## Who is it for?

- **Solo developers** who want a powerful dev environment
- **Teams** that need shared development infrastructure
- **AI developers** using Claude Code or similar tools
- **Data scientists** working with PostgreSQL and Jupyter
- **Learners** exploring PostgreSQL and web development

## How it works

```
┌─────────────────────────────────────────────────────────────┐
│                      Piglet Run                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ VS Code │  │ Jupyter │  │ Claude  │  │  Nginx  │       │
│  │ Server  │  │   Lab   │  │  Code   │  │ Proxy   │       │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘       │
│       │            │            │            │             │
│       └────────────┴────────────┴────────────┘             │
│                         │                                   │
│  ┌──────────────────────┴──────────────────────┐           │
│  │              JuiceFS (Shared Storage)       │           │
│  └──────────────────────┬──────────────────────┘           │
│                         │                                   │
│  ┌──────────────────────┴──────────────────────┐           │
│  │         PostgreSQL 18 + 400+ Extensions     │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │      VictoriaMetrics + Grafana (Monitoring) │           │
│  └─────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Next Steps

- [Install Piglet Run](/docs/tutorial/install/) to get started
- Learn about the [Architecture](/docs/concept/arch/)
- Explore the [Storage](/docs/concept/storage/) system
