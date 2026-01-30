---
title: REST API
linkTitle: API
weight: 100
icon: fa-solid fa-plug
---

Piglet Run 的 REST API 参考。

## 概述

Piglet Run 提供 REST API，用于编程访问所有功能。

## 基础 URL

```
http://<ip>/api/v1
```

## 认证

### API 密钥

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  http://localhost/api/v1/status
```

### 生成 API 密钥

```bash
pig api key create --name mykey
```

## 端点

### 系统

#### 获取状态

```http
GET /api/v1/status
```

响应：

```json
{
  "status": "healthy",
  "version": "2.5.0",
  "uptime": 86400,
  "services": {
    "postgres": "running",
    "vscode": "running",
    "jupyter": "running"
  }
}
```

#### 获取系统信息

```http
GET /api/v1/system
```

响应：

```json
{
  "hostname": "piglet",
  "os": "Ubuntu 22.04",
  "cpu": 4,
  "memory": "8GB",
  "disk": "100GB"
}
```

### 数据库

#### 列出数据库

```http
GET /api/v1/databases
```

响应：

```json
{
  "databases": [
    {
      "name": "postgres",
      "owner": "dba",
      "size": "50MB"
    }
  ]
}
```

#### 创建数据库

```http
POST /api/v1/databases
Content-Type: application/json

{
  "name": "mydb",
  "owner": "dba"
}
```

#### 删除数据库

```http
DELETE /api/v1/databases/{name}
```

### 备份

#### 列出备份

```http
GET /api/v1/backups
```

响应：

```json
{
  "backups": [
    {
      "id": "backup-20240115",
      "type": "full",
      "size": "1.2GB",
      "created_at": "2024-01-15T02:00:00Z"
    }
  ]
}
```

#### 创建备份

```http
POST /api/v1/backups
Content-Type: application/json

{
  "type": "full",
  "databases": ["postgres"]
}
```

#### 恢复备份

```http
POST /api/v1/backups/{id}/restore
Content-Type: application/json

{
  "target_time": "2024-01-15T14:30:00Z"
}
```

### 服务

#### 列出服务

```http
GET /api/v1/services
```

响应：

```json
{
  "services": [
    {
      "name": "postgres",
      "status": "running",
      "port": 5432
    },
    {
      "name": "vscode",
      "status": "running",
      "port": 8080
    }
  ]
}
```

#### 控制服务

```http
POST /api/v1/services/{name}/{action}
```

操作：`start`、`stop`、`restart`

### 快照

#### 列出快照

```http
GET /api/v1/snapshots
```

#### 创建快照

```http
POST /api/v1/snapshots
Content-Type: application/json

{
  "name": "snap-20240115",
  "description": "升级前"
}
```

#### 恢复快照

```http
POST /api/v1/snapshots/{name}/restore
```

### 用户

#### 列出用户

```http
GET /api/v1/users
```

#### 创建用户

```http
POST /api/v1/users
Content-Type: application/json

{
  "username": "newuser",
  "password": "secure_password",
  "databases": ["mydb"]
}
```

## 错误响应

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "数据库未找到",
    "details": {
      "database": "nonexistent"
    }
  }
}
```

### 错误代码

| 代码 | HTTP 状态 | 描述 |
|------|-----------|------|
| `UNAUTHORIZED` | 401 | 无效或缺少 API 密钥 |
| `FORBIDDEN` | 403 | 权限不足 |
| `NOT_FOUND` | 404 | 资源未找到 |
| `CONFLICT` | 409 | 资源已存在 |
| `INTERNAL_ERROR` | 500 | 服务器错误 |

## 速率限制

- 默认：每分钟 100 个请求
- 突发：20 个请求

响应头：

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704067200
```

## SDK 示例

### Python

```python
import requests

api_key = "YOUR_API_KEY"
base_url = "http://localhost/api/v1"

headers = {"Authorization": f"Bearer {api_key}"}

# 获取状态
response = requests.get(f"{base_url}/status", headers=headers)
print(response.json())

# 创建数据库
response = requests.post(
    f"{base_url}/databases",
    headers=headers,
    json={"name": "mydb", "owner": "dba"}
)
```

### JavaScript

```javascript
const apiKey = "YOUR_API_KEY";
const baseUrl = "http://localhost/api/v1";

// 获取状态
fetch(`${baseUrl}/status`, {
  headers: { Authorization: `Bearer ${apiKey}` }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 另请参阅

- [CLI 参考](/docs/reference/cli/)
- [配置参考](/docs/reference/config/)
