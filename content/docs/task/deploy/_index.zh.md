---
title: 部署
linkTitle: 部署
weight: 40
icon: fa-solid fa-paper-plane
---

了解如何在 Piglet Run 上部署 Web 应用。

## 概述

Piglet Run 支持部署多种 Web 应用：

- **静态站点**：HTML、CSS、JavaScript
- **Node.js**：Express、Next.js、React
- **Python**：Flask、Django、FastAPI
- **PHP**：Laravel、WordPress

## 快速部署

部署静态站点：

```bash
pig deploy ./my-site
```

## 部署静态站点

### 从本地目录

```bash
pig deploy ./dist --name my-site
```

### 从 Git 仓库

```bash
pig deploy https://github.com/user/repo --name my-site
```

## 部署 Node.js 应用

### 基本部署

```bash
cd my-node-app
pig deploy --type nodejs
```

### 自定义端口

```bash
pig deploy --type nodejs --port 3000
```

### 配置

在项目中创建 `piglet.yml`：

```yaml
type: nodejs
entry: server.js
port: 3000
env:
  NODE_ENV: production
```

## 部署 Python 应用

### Flask 应用

```bash
pig deploy --type python --framework flask
```

### Django 应用

```bash
pig deploy --type python --framework django
```

## 部署管理

### 列出部署

```bash
pig deploy list
```

### 查看日志

```bash
pig deploy logs my-site
```

### 重启应用

```bash
pig deploy restart my-site
```

### 移除部署

```bash
pig deploy remove my-site
```

## 下一步

- 配置 [SSL](/docs/task/ssl/) 启用 HTTPS
- 设置[自定义域名](/docs/task/domain/)
