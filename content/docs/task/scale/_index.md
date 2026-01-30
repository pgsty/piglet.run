---
title: Scale
linkTitle: Scale
weight: 70
icon: fa-solid fa-arrows-left-right
---

Learn how to scale your Piglet Run resources up or down.

## Overview

Piglet Run supports scaling:

- **Database**: Adjust PostgreSQL resources
- **Storage**: Expand disk capacity
- **Services**: Scale service resources

## Quick Scale

Scale database resources:

```bash
pig scale db --cpu 4 --memory 8G
```

## Scale Database

### Increase Resources

```bash
pig scale db --cpu 4 --memory 16G
```

### Adjust Connection Limits

```bash
pig scale db --max-connections 200
```

### Configure Shared Buffers

```bash
pig scale db --shared-buffers 4G
```

## Scale Storage

### Expand Disk

```bash
pig scale storage --size 100G
```

### Add Storage Volume

```bash
pig scale storage add --mount /data/extra --size 50G
```

## Scale Services

### VS Code Server

```bash
pig scale service vscode --memory 4G
```

### JupyterLab

```bash
pig scale service jupyter --memory 8G
```

## Resource Limits

View current resource allocation:

```bash
pig scale status
```

Example output:

```
Service     CPU    Memory   Storage
---------   ----   ------   -------
PostgreSQL  2      4G       20G
VS Code     1      2G       -
Jupyter     1      2G       -
Nginx       0.5    512M     -
```

## Configuration

Scale settings in `/etc/piglet/resources.yml`:

```yaml
resources:
  postgres:
    cpu: 2
    memory: 4G
    storage: 20G
  vscode:
    cpu: 1
    memory: 2G
  jupyter:
    cpu: 1
    memory: 2G
```

## Best Practices

- Monitor resource usage before scaling
- Scale gradually to avoid disruption
- Test changes in development first

## Next Steps

- Set up [Monitoring](/docs/task/monitor/)
- Learn about [Architecture](/docs/concept/arch/)
