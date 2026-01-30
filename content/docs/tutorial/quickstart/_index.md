---
title: Quick Start
linkTitle: Quick Start
weight: 20
icon: fa-solid fa-rocket
---

## Your First 5 Minutes

This tutorial gets you productive with Piglet Run in 5 minutes.

## Access Your Environment

After installation, access your environment:

| Service | URL | Default Credentials |
|---------|-----|---------------------|
| Homepage | `http://<ip>/` | None |
| VS Code | `http://<ip>/code` | See `/data/code/config.yaml` |
| Jupyter | `http://<ip>/jupyter` | Token in logs |
| Grafana | `http://<ip>/ui` | admin / admin |

## Create Your First Project

### 1. Open VS Code

Navigate to `http://<ip>/code` in your browser.

### 2. Open Terminal

Press `` Ctrl+` `` to open the integrated terminal.

### 3. Create a Project

```bash
cd ~/workspace
mkdir my-first-project
cd my-first-project
```

### 4. Create a Simple App

Create `app.py`:

```python
from http.server import HTTPServer, SimpleHTTPRequestHandler

print("Server running on http://localhost:8000")
HTTPServer(('', 8000), SimpleHTTPRequestHandler).serve_forever()
```

### 5. Run It

```bash
python app.py
```

## Connect to PostgreSQL

```bash
psql postgres://postgres@localhost/postgres
```

Or in Python:

```python
import psycopg
conn = psycopg.connect("postgres://postgres@localhost/postgres")
```

## Next Steps

- Learn more about [VS Code](/docs/tutorial/vscode/)
- Explore [Jupyter](/docs/tutorial/jupyter/)
- Try [Claude Code](/docs/tutorial/claude/)
