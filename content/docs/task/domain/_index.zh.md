---
title: 域名
linkTitle: 域名
weight: 60
icon: fa-solid fa-globe
---

了解如何为 Piglet Run 服务设置自定义域名。

## 概述

为以下内容配置自定义域名：

- **主应用**：您的主域名
- **子域名**：服务专用子域名
- **多域名**：支持多个域名

## 快速设置

添加自定义域名：

```bash
pig domain add example.com
```

## DNS 配置

### 所需 DNS 记录

将您的域名指向 Piglet Run：

| 类型 | 名称 | 值 |
|------|------|-----|
| A | @ | 您的服务器 IP |
| A | www | 您的服务器 IP |
| CNAME | code | @ |
| CNAME | jupyter | @ |

### 使用 Cloudflare

```bash
pig domain add example.com --dns cloudflare --api-key YOUR_API_KEY
```

## 添加自定义域名

### 主域名

```bash
pig domain add example.com --primary
```

### 服务子域名

```bash
pig domain add code.example.com --service vscode
pig domain add jupyter.example.com --service jupyter
```

## 域名管理

### 列出域名

```bash
pig domain list
```

### 移除域名

```bash
pig domain remove old-domain.com
```

### 设置主域名

```bash
pig domain primary example.com
```

## 配置

`/etc/piglet/domains.yml` 中的域名设置：

```yaml
domains:
  primary: example.com
  aliases:
    - www.example.com
  services:
    vscode: code.example.com
    jupyter: jupyter.example.com
    grafana: monitor.example.com
```

## 验证域名

检查域名配置：

```bash
pig domain verify example.com
```

## 下一步

- 配置 [SSL](/docs/task/ssl/) 启用 HTTPS
- 了解 [Nginx 配置](/docs/reference/nginx/)
