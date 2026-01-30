---
title: REST API
linkTitle: API
weight: 100
icon: fa-solid fa-plug
---

REST API reference for Piglet Run.

## Overview

Piglet Run provides a REST API for programmatic access to all features.

## Base URL

```
http://<ip>/api/v1
```

## Authentication

### API Key

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  http://localhost/api/v1/status
```

### Generate API Key

```bash
pig api key create --name mykey
```

## Endpoints

### System

#### Get Status

```http
GET /api/v1/status
```

Response:

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

#### Get System Info

```http
GET /api/v1/system
```

Response:

```json
{
  "hostname": "piglet",
  "os": "Ubuntu 22.04",
  "cpu": 4,
  "memory": "8GB",
  "disk": "100GB"
}
```

### Databases

#### List Databases

```http
GET /api/v1/databases
```

Response:

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

#### Create Database

```http
POST /api/v1/databases
Content-Type: application/json

{
  "name": "mydb",
  "owner": "dba"
}
```

#### Delete Database

```http
DELETE /api/v1/databases/{name}
```

### Backups

#### List Backups

```http
GET /api/v1/backups
```

Response:

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

#### Create Backup

```http
POST /api/v1/backups
Content-Type: application/json

{
  "type": "full",
  "databases": ["postgres"]
}
```

#### Restore Backup

```http
POST /api/v1/backups/{id}/restore
Content-Type: application/json

{
  "target_time": "2024-01-15T14:30:00Z"
}
```

### Services

#### List Services

```http
GET /api/v1/services
```

Response:

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

#### Control Service

```http
POST /api/v1/services/{name}/{action}
```

Actions: `start`, `stop`, `restart`

### Snapshots

#### List Snapshots

```http
GET /api/v1/snapshots
```

#### Create Snapshot

```http
POST /api/v1/snapshots
Content-Type: application/json

{
  "name": "snap-20240115",
  "description": "Before upgrade"
}
```

#### Restore Snapshot

```http
POST /api/v1/snapshots/{name}/restore
```

### Users

#### List Users

```http
GET /api/v1/users
```

#### Create User

```http
POST /api/v1/users
Content-Type: application/json

{
  "username": "newuser",
  "password": "secure_password",
  "databases": ["mydb"]
}
```

## Error Responses

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Database not found",
    "details": {
      "database": "nonexistent"
    }
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing API key |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

- Default: 100 requests per minute
- Burst: 20 requests

Headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704067200
```

## SDK Examples

### Python

```python
import requests

api_key = "YOUR_API_KEY"
base_url = "http://localhost/api/v1"

headers = {"Authorization": f"Bearer {api_key}"}

# Get status
response = requests.get(f"{base_url}/status", headers=headers)
print(response.json())

# Create database
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

// Get status
fetch(`${baseUrl}/status`, {
  headers: { Authorization: `Bearer ${apiKey}` }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## See Also

- [CLI Reference](/docs/reference/cli/)
- [Configuration Reference](/docs/reference/config/)
