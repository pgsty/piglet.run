---
title: 快速开始
linkTitle: 快速开始
weight: 20
icon: fa-solid fa-rocket
---

## 前 5 分钟

本教程让你在 5 分钟内开始使用 Piglet Run。

## 访问环境

安装后，访问你的环境：

| 服务 | URL | 默认凭证 |
|------|-----|----------|
| 首页 | `http://<ip>/` | 无 |
| VS Code | `http://<ip>/code` | 见 `/data/code/config.yaml` |
| Jupyter | `http://<ip>/jupyter` | 日志中的 Token |
| Grafana | `http://<ip>/ui` | admin / admin |

## 创建第一个项目

### 1. 打开 VS Code

在浏览器中访问 `http://<ip>/code`。

### 2. 打开终端

按 `` Ctrl+` `` 打开集成终端。

### 3. 创建项目

```bash
cd ~/workspace
mkdir my-first-project
cd my-first-project
```

### 4. 创建简单应用

创建 `app.py`：

```python
from http.server import HTTPServer, SimpleHTTPRequestHandler

print("Server running on http://localhost:8000")
HTTPServer(('', 8000), SimpleHTTPRequestHandler).serve_forever()
```

### 5. 运行

```bash
python app.py
```

## 连接 PostgreSQL

```bash
psql postgres://postgres@localhost/postgres
```

或在 Python 中：

```python
import psycopg
conn = psycopg.connect("postgres://postgres@localhost/postgres")
```

## 下一步

- 深入了解 [VS Code](/docs/tutorial/vscode/)
- 探索 [Jupyter](/docs/tutorial/jupyter/)
- 尝试 [Claude Code](/docs/tutorial/claude/)
