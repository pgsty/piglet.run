---
title: 完整安装
linkTitle: 安装
weight: 10
icon: fa-solid fa-download
description: Piglet 安装的完整流程
---

## 准备工作

### 你需要什么

| 项目 | 最低要求 | 推荐配置 |
|------|---------|---------|
| **云服务器** | 1 核 2GB | 2 核 4GB+ |
| **操作系统** | Ubuntu 22.04 / Debian 12 / Rocky 8 | Ubuntu 24.04 |
| **磁盘** | 40GB | 100GB+ |
| **网络** | 能上网 | 有公网 IP |

> **还没有服务器？** 参考 [采购云服务器](/docs/task/scale/) 指南，各大云厂商最低 0.64 元/小时起。

### 获取服务器访问权限

你需要能 SSH 登录到服务器：

```bash
ssh root@your-server-ip
```

---

## 一键安装（推荐）

最快的方式，适合大多数用户：

```bash
# 中国用户（推荐）
curl -fsSL https://repo.pigsty.io/pig | bash && pig sty install -m piglet

# 海外用户
curl -fsSL https://repo.pigsty.io/pig | bash && pig sty install -m piglet
```

就这一行命令。等它跑完，你的 Agentic Postgres 运行时就准备好了。

---

## 分步安装

如果你想了解每一步在做什么，或者需要自定义配置：

### 第一步：安装 Pig CLI

```bash
# 中国镜像
curl -fsSL https://repo.pigsty.io/pig | bash

# 海外 CDN
curl -fsSL https://repo.pigsty.io/pig | bash
```

Pig 是 Piglet 的命令行工具，安装完成后会自动添加到 PATH。

### 第二步：配置软件源

```bash
pig repo set                          # 自动检测系统，配置所有必要的软件源
```

如果你在中国大陆，使用镜像源会更快：

```bash
pig repo add all --region china       # 使用中国镜像
```

### 第三步：初始化并安装

```bash
pig sty init                          # 下载 Pigsty 到 ~/pigsty
pig sty boot                          # 安装 Ansible（自动化工具）
pig sty conf -m piglet                # 生成 Piglet 专用配置
pig sty deploy                        # 运行安装（这一步可能需要几分钟）
```

---

## 验证安装

安装完成后，检查一切是否正常：

```bash
pig status                            # 整体状态
pig pg status                         # PostgreSQL 状态
```

### 访问你的服务

打开浏览器，访问服务器 IP：

| 服务 | 地址 | 说明 |
|------|------|------|
| **首页** | `http://<ip>/` | Piglet 欢迎页 |
| **VS Code** | `http://<ip>/code` | 网页版 IDE |
| **Jupyter** | `http://<ip>/jupyter` | 数据科学笔记本 |
| **Grafana** | `http://<ip>/grafana` | 监控仪表盘 |
| **PostgreSQL** | `<ip>:5432` | 数据库连接 |

### 默认凭据

| 服务 | 用户名 | 密码 |
|------|-------|------|
| PostgreSQL | `postgres` | `piglet` |
| Grafana | `admin` | `piglet` |
| VS Code | - | `piglet` |

> **安全提示**：首次登录后请立即修改密码！

---

## 配置 Claude Code（可选）

如果你要用 Claude Code 进行 AI 辅助编程：

```bash
# 在你的本地机器上
claude config set apiKey YOUR_ANTHROPIC_API_KEY

# 连接到 Piglet 服务器
claude connect ssh root@your-server-ip
```

详见 [Claude Code 配置](/docs/task/domain/)。

---

## 故障排除

### 查看日志

```bash
pig pg log tail                       # PostgreSQL 日志
journalctl -u nginx -f                # Nginx 日志
journalctl -u code-server -f          # VS Code 日志
```

### 常见问题

| 症状 | 可能原因 | 解决方案 |
|------|---------|---------|
| 软件源报错 | 源配置过期 | `pig repo set -u` 刷新 |
| 包冲突 | 已有其他源 | `pig repo rm && pig repo set` |
| 权限拒绝 | 非 root 用户 | 使用 `sudo` 或切换到 root |
| 端口无法访问 | 防火墙限制 | 开放 80, 443, 5432 端口 |
| 内存不足 | 服务器配置低 | 升级到 4GB+ 内存 |

### 重新安装

如果需要从头开始：

```bash
pig sty destroy                       # 清理现有安装
pig sty deploy                        # 重新部署
```

---

## 下一步

安装完成了！接下来：

1. **[快速开始教程](/docs/tutorial/quickstart/)** - 做你的第一个静态网页
2. **[配置 Claude Code](/docs/task/domain/)** - 开启 AI 结对编程
3. **[架构概述](/docs/concept/arch/)** - 了解 Piglet 里有什么
