---
title: Upgrade
linkTitle: Upgrade
weight: 100
icon: fa-solid fa-arrow-up
---

Learn how to upgrade your Piglet Run installation.

## Overview

Piglet Run upgrades include:

- **Minor Updates**: Bug fixes and security patches
- **Major Upgrades**: New features and improvements
- **PostgreSQL Upgrades**: Database version upgrades

## Quick Upgrade

Upgrade to latest version:

```bash
pig upgrade
```

## Check for Updates

### View Current Version

```bash
pig version
```

### Check Available Updates

```bash
pig upgrade check
```

## Perform Upgrade

### Standard Upgrade

```bash
pig upgrade --backup
```

### Upgrade to Specific Version

```bash
pig upgrade --version 2.5.0
```

### Dry Run

```bash
pig upgrade --dry-run
```

## Upgrade PostgreSQL

### Check Compatible Versions

```bash
pig upgrade pg --list
```

### Upgrade Database Version

```bash
pig upgrade pg --version 17
```

### With Full Backup

```bash
pig upgrade pg --version 17 --backup
```

## Before Upgrading

1. **Create Backup**
   ```bash
   pig backup create --full
   ```

2. **Check Compatibility**
   ```bash
   pig upgrade check --verbose
   ```

3. **Review Release Notes**
   ```bash
   pig upgrade notes
   ```

## Rollback

If upgrade fails:

### Restore from Backup

```bash
pig restore --backup pre-upgrade
```

### Rollback to Previous Version

```bash
pig upgrade rollback
```

## Upgrade History

View upgrade history:

```bash
pig upgrade history
```

Example output:

```
Version    Date         Status
-------    ----------   -------
2.5.0      2024-01-15   Current
2.4.1      2024-01-01   Previous
2.4.0      2023-12-15   Archived
```

## Configuration

Upgrade settings in `/etc/piglet/upgrade.yml`:

```yaml
upgrade:
  auto_backup: true
  notify: true
  channel: stable  # stable, beta, nightly
```

## Next Steps

- Learn about [Backup](/docs/task/backup/)
- Understand [Restore](/docs/task/restore/)
