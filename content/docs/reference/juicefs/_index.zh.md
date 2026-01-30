---
title: JuiceFS
linkTitle: JuiceFS
weight: 80
icon: fa-solid fa-folder-tree
---

Piglet Run 的 JuiceFS 分布式文件系统配置。

## 概述

Piglet Run 使用 JuiceFS 作为分布式存储，支持快照和快速克隆。

## 架构

JuiceFS 由以下组件组成：

- **元数据引擎**：PostgreSQL 存储文件元数据
- **对象存储**：S3 兼容存储用于数据块
- **FUSE 客户端**：本地挂载文件系统

## 配置

文件：`/etc/piglet/juicefs.yml`

```yaml
juicefs:
  name: piglet
  metadata: postgres://dba@localhost:5432/juicefs
  storage: minio
  bucket: http://localhost:9000/piglet
  access_key: ${MINIO_ACCESS_KEY}
  secret_key: ${MINIO_SECRET_KEY}

  # 挂载选项
  mount_point: /data/jfs
  cache_dir: /var/cache/juicefs
  cache_size: 10240  # 10GB
```

## 挂载配置

文件：`/etc/juicefs/piglet.conf`

```ini
[piglet]
meta = postgres://dba@localhost:5432/juicefs
storage = minio
bucket = http://localhost:9000/piglet
access-key = ${MINIO_ACCESS_KEY}
secret-key = ${MINIO_SECRET_KEY}

# 性能选项
cache-dir = /var/cache/juicefs
cache-size = 10240
buffer-size = 300
prefetch = 3
```

## 服务管理

```bash
# 挂载文件系统
pig mount jfs

# 卸载文件系统
pig umount jfs

# 检查状态
pig status jfs

# 查看统计
juicefs stats /data/jfs
```

## 命令

### 格式化文件系统

```bash
juicefs format \
  --storage minio \
  --bucket http://localhost:9000/pig \
  postgres://dba@localhost:5432/juicefs \
  piglet
```

### 挂载文件系统

```bash
juicefs mount \
  postgres://dba@localhost:5432/juicefs \
  /data/jfs \
  --cache-dir /var/cache/juicefs \
  --cache-size 10240
```

### 检查文件系统

```bash
juicefs fsck postgres://dba@localhost:5432/juicefs
```

## 快照操作

### 创建快照

```bash
juicefs snapshot create /data/jfs snap-$(date +%Y%m%d)
```

### 列出快照

```bash
juicefs snapshot list /data/jfs
```

### 恢复快照

```bash
juicefs snapshot restore /data/jfs snap-20240115
```

### 删除快照

```bash
juicefs snapshot delete /data/jfs snap-20240115
```

## 克隆操作

```bash
# 克隆目录
juicefs clone /data/jfs/source /data/jfs/dest

# 从快照克隆
juicefs clone /data/jfs/.snapshots/snap-20240115 /data/jfs/restored
```

## 性能调优

### 缓存设置

```bash
# 增加缓存大小
juicefs config /data/jfs --cache-size 20480

# 启用写回
juicefs config /data/jfs --writeback
```

### 元数据缓存

```bash
# 条目缓存 TTL
juicefs mount ... --entry-cache 3 --dir-entry-cache 3 --attr-cache 3
```

## 监控

### 统计

```bash
juicefs stats /data/jfs
```

输出：
```
usage: 10.2 GiB (1234567 inodes)
sessions: 1
trash: 0 (0 Bytes)
```

### Prometheus 指标

```bash
juicefs mount ... --metrics localhost:9567
```

## 故障排除

```bash
# 检查挂载状态
mount | grep juicefs

# 查看日志
journalctl -u juicefs -f

# 调试模式
juicefs mount --debug ...

# 修复文件系统
juicefs fsck --repair postgres://dba@localhost:5432/juicefs
```

## 另请参阅

- [存储概念](/docs/concept/storage/)
- [快照概念](/docs/concept/snapshot/)
- [克隆任务](/docs/task/clone/)
