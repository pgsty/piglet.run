---
title: Installation
linkTitle: Install
weight: 10
icon: fa-solid fa-download
---

## Install Piglet Run

This tutorial guides you through installing Piglet Run on a fresh server.

## Prerequisites

- **OS**: Linux (Ubuntu 22.04+, Debian 12+, RHEL 8+, Rocky 8+)
- **CPU**: 2+ cores recommended
- **RAM**: 4GB minimum, 8GB+ recommended
- **Disk**: 40GB+ free space
- **Network**: Internet access for package download

## Quick Install

### 1. Install Pig CLI

```bash
# Default (Cloudflare CDN)
curl -fsSL https://repo.pigsty.io/pig | bash

# China Mirror
curl -fsSL https://repo.pigsty.cc/pig | bash
```

### 2. Setup Repositories

```bash
pig repo set          # Setup all required repositories
```

### 3. Install Pigsty with Piglet Profile

```bash
pig sty init          # Download Pigsty to ~/pigsty
cd ~/pigsty
./configure -m piglet # Configure with piglet preset
./install.yml         # Run installation playbook
```

## Step-by-Step Installation

### Download and Install Pig

```bash
curl -fsSL https://repo.pigsty.io/pig | bash
```

### Setup Repositories

```bash
pig repo set                          # One-step repo setup
pig repo add all --region china       # Use China mirrors if needed
```

### Install PostgreSQL and Extensions

```bash
pig install pg17                      # Install PostgreSQL 17
pig install pg_duckdb vector -v 17    # Install extensions
```

### Install Pigsty Distribution

```bash
pig sty init                          # Download Pigsty
pig sty boot                          # Install Ansible
pig sty conf -m piglet                # Generate piglet config
pig sty deploy                        # Run deployment
```

## Verify Installation

After installation, check status:

```bash
pig status                            # Check pig environment
pig ext status                        # Check installed extensions
pig pg status                         # Check PostgreSQL status
```

Access the services:

| Service | URL |
|---------|-----|
| Homepage | `http://<ip>/` |
| VS Code | `http://<ip>/code` |
| Jupyter | `http://<ip>/jupyter` |
| Grafana | `http://<ip>/ui` |
| PostgreSQL | `postgres://<ip>:5432` |

## Troubleshooting

### Check Logs

```bash
pig pg log tail                       # PostgreSQL logs
pig pt log -f                         # Patroni logs (if HA enabled)
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Repository error | `pig repo set -u` to refresh |
| Package conflict | `pig repo rm` then `pig repo set` |
| Permission denied | Run with sudo or as root |

## Next Steps

- Continue with [Quick Start](/docs/tutorial/quickstart/)
- Learn about [VS Code](/docs/tutorial/vscode/)
