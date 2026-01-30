---
title: 安装
linkTitle: 安装
weight: 10
icon: fa-solid fa-download
---

## 安装 Piglet Run

本教程指导您在全新服务器上安装 Piglet Run。

## 前置要求

- **操作系统**: Linux (Ubuntu 22.04+, Debian 12+, RHEL 8+, Rocky 8+)
- **CPU**: 建议 2 核以上
- **内存**: 最低 4GB，建议 8GB+
- **磁盘**: 40GB+ 可用空间
- **网络**: 能够访问互联网下载软件包

## 快速安装

### 1. 安装 Pig CLI

```bash
# 默认源 (Cloudflare CDN)
curl -fsSL https://repo.pigsty.io/pig | bash

# 中国镜像
curl -fsSL https://repo.pigsty.cc/pig | bash
```

### 2. 配置软件源

```bash
pig repo set          # 一键配置所有必要的软件源
```

### 3. 使用 Piglet 配置安装 Pigsty

```bash
pig sty init          # 下载 Pigsty 到 ~/pigsty
cd ~/pigsty
./configure -m piglet # 使用 piglet 预设配置
./install.yml         # 运行安装剧本
```

## 分步安装

### 下载安装 Pig

```bash
curl -fsSL https://repo.pigsty.cc/pig | bash
```

### 配置软件源

```bash
pig repo set                          # 一键配置软件源
pig repo add all --region china       # 使用中国镜像
```

### 安装 PostgreSQL 和扩展

```bash
pig install pg17                      # 安装 PostgreSQL 17
pig install pg_duckdb vector -v 17    # 安装扩展
```

### 安装 Pigsty 发行版

```bash
pig sty init                          # 下载 Pigsty
pig sty boot                          # 安装 Ansible
pig sty conf -m piglet                # 生成 piglet 配置
pig sty deploy                        # 运行部署
```

## 验证安装

安装完成后，检查状态：

```bash
pig status                            # 检查 pig 环境
pig ext status                        # 检查已安装扩展
pig pg status                         # 检查 PostgreSQL 状态
```

访问服务：

| 服务 | URL |
|------|-----|
| 首页 | `http://<ip>/` |
| VS Code | `http://<ip>/code` |
| Jupyter | `http://<ip>/jupyter` |
| Grafana | `http://<ip>/ui` |
| PostgreSQL | `postgres://<ip>:5432` |

## 故障排除

### 查看日志

```bash
pig pg log tail                       # PostgreSQL 日志
pig pt log -f                         # Patroni 日志（如启用 HA）
```

### 常见问题

| 问题 | 解决方案 |
|------|----------|
| 软件源错误 | `pig repo set -u` 刷新 |
| 包冲突 | `pig repo rm` 然后 `pig repo set` |
| 权限拒绝 | 使用 sudo 或 root 运行 |

## 下一步

- 继续 [快速开始](/docs/tutorial/quickstart/)
- 了解 [VS Code](/docs/tutorial/vscode/)
