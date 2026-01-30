---
title: 升级
linkTitle: 升级
weight: 100
icon: fa-solid fa-arrow-up
---

了解如何升级 Piglet Run 安装。

## 概述

Piglet Run 升级包括：

- **小版本更新**：Bug 修复和安全补丁
- **大版本升级**：新功能和改进
- **PostgreSQL 升级**：数据库版本升级

## 快速升级

升级到最新版本：

```bash
pig upgrade
```

## 检查更新

### 查看当前版本

```bash
pig version
```

### 检查可用更新

```bash
pig upgrade check
```

## 执行升级

### 标准升级

```bash
pig upgrade --backup
```

### 升级到特定版本

```bash
pig upgrade --version 2.5.0
```

### 试运行

```bash
pig upgrade --dry-run
```

## 升级 PostgreSQL

### 检查兼容版本

```bash
pig upgrade pg --list
```

### 升级数据库版本

```bash
pig upgrade pg --version 17
```

### 带完整备份

```bash
pig upgrade pg --version 17 --backup
```

## 升级前准备

1. **创建备份**
   ```bash
   pig backup create --full
   ```

2. **检查兼容性**
   ```bash
   pig upgrade check --verbose
   ```

3. **查看发布说明**
   ```bash
   pig upgrade notes
   ```

## 回滚

如果升级失败：

### 从备份恢复

```bash
pig restore --backup pre-upgrade
```

### 回滚到之前版本

```bash
pig upgrade rollback
```

## 升级历史

查看升级历史：

```bash
pig upgrade history
```

示例输出：

```
版本       日期         状态
-------    ----------   -------
2.5.0      2024-01-15   当前
2.4.1      2024-01-01   之前
2.4.0      2023-12-15   已归档
```

## 配置

`/etc/piglet/upgrade.yml` 中的升级设置：

```yaml
upgrade:
  auto_backup: true
  notify: true
  channel: stable  # stable, beta, nightly
```

## 下一步

- 了解[备份](/docs/task/backup/)
- 理解[恢复](/docs/task/restore/)
