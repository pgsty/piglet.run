---
title: JuiceFS
linkTitle: JuiceFS
weight: 80
icon: fa-solid fa-folder-tree
---

JuiceFS distributed filesystem configuration for Piglet Run.

## Overview

Piglet Run uses JuiceFS for distributed storage, enabling snapshots and fast cloning.

## Architecture

JuiceFS consists of:

- **Metadata Engine**: PostgreSQL stores file metadata
- **Object Storage**: S3-compatible storage for data blocks
- **FUSE Client**: Mounts filesystem locally

## Configuration

File: `/etc/piglet/juicefs.yml`

```yaml
juicefs:
  name: piglet
  metadata: postgres://dba@localhost:5432/juicefs
  storage: minio
  bucket: http://localhost:9000/piglet
  access_key: ${MINIO_ACCESS_KEY}
  secret_key: ${MINIO_SECRET_KEY}

  # Mount options
  mount_point: /data/jfs
  cache_dir: /var/cache/juicefs
  cache_size: 10240  # 10GB
```

## Mount Configuration

File: `/etc/juicefs/piglet.conf`

```ini
[piglet]
meta = postgres://dba@localhost:5432/juicefs
storage = minio
bucket = http://localhost:9000/piglet
access-key = ${MINIO_ACCESS_KEY}
secret-key = ${MINIO_SECRET_KEY}

# Performance options
cache-dir = /var/cache/juicefs
cache-size = 10240
buffer-size = 300
prefetch = 3
```

## Service Management

```bash
# Mount filesystem
pig mount jfs

# Unmount filesystem
pig umount jfs

# Check status
pig status jfs

# View statistics
juicefs stats /data/jfs
```

## Commands

### Format Filesystem

```bash
juicefs format \
  --storage minio \
  --bucket http://localhost:9000/pig \
  postgres://dba@localhost:5432/juicefs \
  piglet
```

### Mount Filesystem

```bash
juicefs mount \
  postgres://dba@localhost:5432/juicefs \
  /data/jfs \
  --cache-dir /var/cache/juicefs \
  --cache-size 10240
```

### Check Filesystem

```bash
juicefs fsck postgres://dba@localhost:5432/juicefs
```

## Snapshot Operations

### Create Snapshot

```bash
juicefs snapshot create /data/jfs snap-$(date +%Y%m%d)
```

### List Snapshots

```bash
juicefs snapshot list /data/jfs
```

### Restore Snapshot

```bash
juicefs snapshot restore /data/jfs snap-20240115
```

### Delete Snapshot

```bash
juicefs snapshot delete /data/jfs snap-20240115
```

## Clone Operations

```bash
# Clone directory
juicefs clone /data/jfs/source /data/jfs/dest

# Clone with snapshot
juicefs clone /data/jfs/.snapshots/snap-20240115 /data/jfs/restored
```

## Performance Tuning

### Cache Settings

```bash
# Increase cache size
juicefs config /data/jfs --cache-size 20480

# Enable writeback
juicefs config /data/jfs --writeback
```

### Metadata Cache

```bash
# Entry cache TTL
juicefs mount ... --entry-cache 3 --dir-entry-cache 3 --attr-cache 3
```

## Monitoring

### Statistics

```bash
juicefs stats /data/jfs
```

Output:
```
usage: 10.2 GiB (1234567 inodes)
sessions: 1
trash: 0 (0 Bytes)
```

### Prometheus Metrics

```bash
juicefs mount ... --metrics localhost:9567
```

## Troubleshooting

```bash
# Check mount status
mount | grep juicefs

# View logs
journalctl -u juicefs -f

# Debug mode
juicefs mount --debug ...

# Repair filesystem
juicefs fsck --repair postgres://dba@localhost:5432/juicefs
```

## See Also

- [Storage Concept](/docs/concept/storage/)
- [Snapshot Concept](/docs/concept/snapshot/)
- [Clone Task](/docs/task/clone/)
