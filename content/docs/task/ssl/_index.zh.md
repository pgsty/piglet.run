---
title: SSL
linkTitle: SSL
weight: 50
icon: fa-solid fa-lock
---

了解如何配置 SSL 证书以启用安全的 HTTPS 连接。

## 概述

Piglet Run 支持多种 SSL 证书选项：

- **Let's Encrypt**：免费自动证书
- **自签名**：用于开发和测试
- **自定义**：使用您自己的证书

## 快速设置

使用 Let's Encrypt 启用 SSL：

```bash
pig ssl enable --domain example.com
```

## Let's Encrypt 证书

### 为域名启用

```bash
pig ssl letsencrypt --domain example.com --email admin@example.com
```

### 多个域名

```bash
pig ssl letsencrypt --domain example.com --domain www.example.com
```

### 通配符证书

```bash
pig ssl letsencrypt --domain "*.example.com" --dns cloudflare
```

## 自签名证书

### 生成自签名证书

```bash
pig ssl self-signed --domain localhost
```

### 用于开发

```bash
pig ssl self-signed --domain dev.local --days 365
```

## 自定义证书

### 安装自定义证书

```bash
pig ssl install --cert /path/to/cert.pem --key /path/to/key.pem
```

### 包含证书链

```bash
pig ssl install \
  --cert /path/to/cert.pem \
  --key /path/to/key.pem \
  --chain /path/to/chain.pem
```

## 证书管理

### 查看证书

```bash
pig ssl list
```

### 检查过期时间

```bash
pig ssl status
```

### 续期证书

```bash
pig ssl renew
```

## 配置

`/etc/piglet/ssl.yml` 中的 SSL 设置：

```yaml
ssl:
  provider: letsencrypt
  email: admin@example.com
  auto_renew: true
  renew_days: 30
```

## 下一步

- 设置[自定义域名](/docs/task/domain/)
- 了解[安全](/docs/concept/security/)
