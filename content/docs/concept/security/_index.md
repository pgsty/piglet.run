---
title: Security
linkTitle: Security
weight: 70
icon: fa-solid fa-shield-halved
---

## Security Model

Piglet Run provides multiple layers of security for your development environment.

## Access Control

| Layer | Mechanism |
|-------|-----------|
| **Network** | Firewall, VPN support |
| **Web** | Nginx authentication |
| **Database** | PostgreSQL roles |
| **Filesystem** | Unix permissions |

## Authentication

Default authentication methods:
- **VS Code**: Password or token
- **Jupyter**: Token-based
- **Grafana**: Username/password
- **PostgreSQL**: Role-based access

## Encryption

| Type | Support |
|------|---------|
| **In Transit** | SSL/TLS |
| **At Rest** | Database encryption |
| **Backup** | Encrypted backups |

## Best Practices

1. Change default passwords immediately
2. Enable SSL for all services
3. Restrict network access
4. Regular security updates

## Next Steps

- Configure [SSL](/docs/task/ssl/)
- Set up [Domain](/docs/task/domain/)
