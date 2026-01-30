---
title: 安全
linkTitle: 安全
weight: 70
icon: fa-solid fa-shield-halved
---

## 安全模型

Piglet Run 为开发环境提供多层安全保护。

## 访问控制

| 层级 | 机制 |
|------|------|
| **网络** | 防火墙、VPN 支持 |
| **Web** | Nginx 认证 |
| **数据库** | PostgreSQL 角色 |
| **文件系统** | Unix 权限 |

## 认证

默认认证方式：
- **VS Code**：密码或令牌
- **Jupyter**：基于令牌
- **Grafana**：用户名/密码
- **PostgreSQL**：基于角色访问

## 加密

| 类型 | 支持 |
|------|------|
| **传输中** | SSL/TLS |
| **静态** | 数据库加密 |
| **备份** | 加密备份 |

## 最佳实践

1. 立即更改默认密码
2. 为所有服务启用 SSL
3. 限制网络访问
4. 定期安全更新

## 下一步

- 配置 [SSL](/docs/task/ssl/)
- 设置 [域名](/docs/task/domain/)
