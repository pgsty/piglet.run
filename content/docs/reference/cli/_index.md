---
title: CLI
linkTitle: CLI
weight: 10
icon: fa-solid fa-terminal
---

Command-line interface reference for Piglet Run, powered by **pig** - the PostgreSQL package manager.

## Overview

The `pig` CLI provides complete control over PostgreSQL installation, extension management, and system operations.

## Installation

```bash
# Default (Cloudflare CDN)
curl -fsSL https://repo.pigsty.io/pig | bash

# China Mirror
curl -fsSL https://repo.pigsty.io/pig | bash
```

Verify installation:

```bash
pig --version
pig --help
```

## Global Options

| Option | Description |
|--------|-------------|
| `--help`, `-h` | Show help |
| `--debug` | Enable debug mode |
| `--log-level` | Set log level (debug/info/warn/error) |
| `-H, --home` | Pigsty home directory |
| `-i, --inventory` | Configuration inventory path |

## Main Commands

### Repository Management (`pig repo`)

```bash
pig repo list                    # List available repos and modules
pig repo info                    # Show repository information
pig repo status                  # Display current repo config
pig repo add [modules...]        # Add repositories
pig repo set                     # Setup all required repos (recommended)
pig repo rm [modules...]         # Remove repositories
pig repo update                  # Update package cache
```

### Extension Management (`pig ext`)

```bash
pig ext list [pattern]           # Search/list extensions
pig ext info <name>              # Show extension details
pig ext avail <name>             # Show availability matrix
pig ext status                   # Show installed extensions
pig ext scan                     # Scan installed extensions
pig ext add <name> [-v version]  # Install extension
pig ext rm <name>                # Remove extension
pig ext update                   # Update extensions
```

### Installation Alias (`pig install`)

```bash
pig install pg17                 # Install PostgreSQL 17
pig install pg_duckdb -v 17      # Install extension for PG 17
pig install vector postgis       # Install multiple extensions
```

### PostgreSQL Management (`pig pg`)

```bash
pig pg init                      # Initialize data directory
pig pg start                     # Start PostgreSQL
pig pg stop                      # Stop PostgreSQL
pig pg status                    # Check status
pig pg psql [database]           # Connect to database
pig pg ps                        # Show connections
pig pg vacuum [database]         # Vacuum database
pig pg log tail                  # View logs in real-time
```

### Backup Management (`pig pb`)

```bash
pig pb info                      # Show backup information
pig pb ls                        # List all backups
pig pb backup                    # Create backup
pig pb backup full               # Full backup
pig pb backup incr               # Incremental backup
pig pb restore                   # Restore to latest
pig pb restore -t <time>         # Restore to specific time
pig pb log tail                  # View backup logs
```

### Patroni Cluster (`pig pt`)

```bash
pig pt list                      # List cluster members
pig pt config                    # Show cluster config
pig pt status                    # View service status
pig pt log -f                    # View logs in real-time
```

### Pigsty Management (`pig sty`)

```bash
pig sty init                     # Download and install Pigsty
pig sty boot                     # Install Ansible dependencies
pig sty conf [-m template]       # Generate configuration
pig sty deploy                   # Run deployment playbook
pig sty list                     # List available versions
```

### System Status (`pig status`)

```bash
pig status                       # Show environment status
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PIGSTY_HOME` | Pigsty home directory (default: ~/pigsty) |
| `PIG_LOG_LEVEL` | Log level |

## Examples

```bash
# Quick setup for Piglet Run
pig repo set                     # Setup repositories
pig install pg17                 # Install PostgreSQL 17
pig install vector pg_duckdb    # Install extensions
pig sty init && pig sty deploy  # Deploy Pigsty

# Daily operations
pig pg status                    # Check PostgreSQL
pig pb info                      # Check backups
pig ext status                   # Check extensions
```

## See Also

- [Configuration Reference](/docs/reference/config/)
- [PostgreSQL Reference](/docs/reference/postgres/)
- [Installation Tutorial](/docs/tutorial/install/)
