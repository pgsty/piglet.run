---
title: 扩容
linkTitle: 扩容
weight: 70
icon: fa-solid fa-arrows-left-right
---

了解如何扩展或缩减 Piglet Run 资源。

## 概述

Piglet Run 支持扩展：

- **数据库**：调整 PostgreSQL 资源
- **存储**：扩展磁盘容量
- **服务**：扩展服务资源

## 快速扩容

扩展数据库资源：

```bash
pig scale db --cpu 4 --memory 8G
```

## 扩展数据库

### 增加资源

```bash
pig scale db --cpu 4 --memory 16G
```

### 调整连接限制

```bash
pig scale db --max-connections 200
```

### 配置共享缓冲区

```bash
pig scale db --shared-buffers 4G
```

## 扩展存储

### 扩展磁盘

```bash
pig scale storage --size 100G
```

### 添加存储卷

```bash
pig scale storage add --mount /data/extra --size 50G
```

## 扩展服务

### VS Code 服务器

```bash
pig scale service vscode --memory 4G
```

### JupyterLab

```bash
pig scale service jupyter --memory 8G
```

## 资源限制

查看当前资源分配：

```bash
pig scale status
```

示例输出：

```
服务        CPU    内存     存储
---------   ----   ------   -------
PostgreSQL  2      4G       20G
VS Code     1      2G       -
Jupyter     1      2G       -
Nginx       0.5    512M     -
```

## 配置

`/etc/piglet/resources.yml` 中的扩展设置：

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

## 最佳实践

- 扩展前监控资源使用情况
- 逐步扩展以避免中断
- 先在开发环境测试更改

## 下一步

- 设置[监控](/docs/task/monitor/)
- 了解[架构](/docs/concept/arch/)
