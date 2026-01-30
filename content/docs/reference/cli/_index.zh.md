---
title: CLI
linkTitle: CLI
weight: 10
icon: fa-solid fa-terminal
---

Piglet Run 命令行接口参考。

## 概述

`pig` CLI 提供对 Piglet Run 实例的完整控制。

## 安装

CLI 随 Piglet Run 自动安装。验证安装：

```bash
pig --version
```

## 全局选项

| 选项 | 描述 |
|------|------|
| `--help`, `-h` | 显示帮助 |
| `--version`, `-v` | 显示版本 |
| `--config`, `-c` | 配置文件路径 |
| `--verbose` | 详细输出 |
| `--quiet`, `-q` | 静默模式 |
| `--json` | JSON 输出 |

## 命令

### 状态命令

```bash
pig status              # 显示系统状态
pig status db           # 数据库状态
pig status services     # 所有服务状态
```

### 服务命令

```bash
pig start [service]     # 启动服务
pig stop [service]      # 停止服务
pig restart [service]   # 重启服务
pig logs [service]      # 查看日志
```

### 数据库命令

```bash
pig db list             # 列出数据库
pig db create NAME      # 创建数据库
pig db drop NAME        # 删除数据库
pig db connect [NAME]   # 连接数据库
```

### 备份命令

```bash
pig backup create       # 创建备份
pig backup list         # 列出备份
pig backup restore ID   # 恢复备份
```

### 用户命令

```bash
pig user list           # 列出用户
pig user create NAME    # 创建用户
pig user delete NAME    # 删除用户
pig user passwd NAME    # 修改密码
```

### 配置命令

```bash
pig config show         # 显示配置
pig config set KEY VAL  # 设置配置
pig config get KEY      # 获取配置
```

## 环境变量

| 变量 | 描述 |
|------|------|
| `PIG_HOME` | Piglet Run 主目录 |
| `PIG_CONFIG` | 配置文件路径 |
| `PIG_LOG_LEVEL` | 日志级别 (debug, info, warn, error) |

## 配置文件

默认位置：`/etc/piglet/piglet.yml`

```yaml
database:
  host: localhost
  port: 5432
  user: dba

services:
  vscode: true
  jupyter: true
  grafana: true

log:
  level: info
  file: /var/log/piglet/piglet.log
```

## 退出码

| 代码 | 描述 |
|------|------|
| 0 | 成功 |
| 1 | 一般错误 |
| 2 | 参数无效 |
| 3 | 服务未找到 |
| 4 | 权限拒绝 |

## 另请参阅

- [配置参考](/docs/reference/config/)
- [API 参考](/docs/reference/api/)
