---
title: JupyterLab
linkTitle: Jupyter
weight: 40
icon: fa-solid fa-flask
---

JupyterLab configuration and details for Piglet Run.

## Overview

Piglet Run includes JupyterLab for interactive computing and data analysis.

## Access

Default URL: `http://<ip>/jupyter`

## Configuration

File: `/etc/piglet/jupyter.yml`

```yaml
jupyter:
  enabled: true
  port: 8888
  token: ${JUPYTER_TOKEN}

  # Notebook directory
  notebook_dir: /home/dba/notebooks

  # Allowed origins
  allow_origin: "*"

  # Kernels
  kernels:
    - python3
    - ir
    - julia
```

## JupyterLab Configuration

File: `/home/dba/.jupyter/jupyter_lab_config.py`

```python
c.ServerApp.ip = '127.0.0.1'
c.ServerApp.port = 8888
c.ServerApp.open_browser = False
c.ServerApp.notebook_dir = '/home/dba/notebooks'
c.ServerApp.token = ''
c.ServerApp.allow_origin = '*'
```

## Available Kernels

| Kernel | Language | Description |
|--------|----------|-------------|
| `python3` | Python | IPython kernel |
| `ir` | R | R kernel |
| `julia` | Julia | Julia kernel |
| `bash` | Bash | Bash kernel |

### Install Additional Kernels

```bash
# R kernel
R -e "IRkernel::installspec()"

# Julia kernel
julia -e 'using Pkg; Pkg.add("IJulia")'
```

## Pre-installed Extensions

| Extension | Description |
|-----------|-------------|
| `jupyterlab-git` | Git integration |
| `jupyterlab-lsp` | Language server protocol |
| `jupyterlab-sql` | SQL support |

### Install Extensions

```bash
pip install jupyterlab-git
jupyter labextension install @jupyterlab/git
```

## Service Management

```bash
# Start Jupyter
pig start jupyter

# Stop Jupyter
pig stop jupyter

# Restart Jupyter
pig restart jupyter

# View logs
pig logs jupyter
```

## Connecting to PostgreSQL

```python
import psycopg2
import pandas as pd

# Connect to database
conn = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="dba"
)

# Query data
df = pd.read_sql("SELECT * FROM my_table", conn)
df.head()
```

## Using SQL Magic

```python
%load_ext sql
%sql postgresql://dba@localhost/postgres

%%sql
SELECT * FROM pg_stat_activity LIMIT 5;
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Shift+Enter` | Run cell |
| `Ctrl+Enter` | Run cell, stay in cell |
| `Alt+Enter` | Run cell, insert below |
| `Esc` | Command mode |
| `Enter` | Edit mode |
| `A` | Insert cell above |
| `B` | Insert cell below |
| `DD` | Delete cell |

## Troubleshooting

### Connection Issues

```bash
# Check service status
systemctl status jupyter

# Check port binding
ss -tlnp | grep 8888

# View logs
journalctl -u jupyter -f
```

### Kernel Issues

```bash
# List available kernels
jupyter kernelspec list

# Reinstall kernel
python -m ipykernel install --user
```

## See Also

- [Jupyter Tutorial](/docs/tutorial/jupyter/)
- [Configuration Reference](/docs/reference/config/)
