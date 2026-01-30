---
title: JupyterLab
linkTitle: Jupyter
weight: 40
icon: fa-solid fa-flask
---

Piglet Run 的 JupyterLab 配置和详情。

## 概述

Piglet Run 包含 JupyterLab，用于交互式计算和数据分析。

## 访问

默认 URL：`http://<ip>/jupyter`

## 配置

文件：`/etc/piglet/jupyter.yml`

```yaml
jupyter:
  enabled: true
  port: 8888
  token: ${JUPYTER_TOKEN}

  # 笔记本目录
  notebook_dir: /home/dba/notebooks

  # 允许的源
  allow_origin: "*"

  # 内核
  kernels:
    - python3
    - ir
    - julia
```

## JupyterLab 配置

文件：`/home/dba/.jupyter/jupyter_lab_config.py`

```python
c.ServerApp.ip = '127.0.0.1'
c.ServerApp.port = 8888
c.ServerApp.open_browser = False
c.ServerApp.notebook_dir = '/home/dba/notebooks'
c.ServerApp.token = ''
c.ServerApp.allow_origin = '*'
```

## 可用内核

| 内核 | 语言 | 描述 |
|------|------|------|
| `python3` | Python | IPython 内核 |
| `ir` | R | R 内核 |
| `julia` | Julia | Julia 内核 |
| `bash` | Bash | Bash 内核 |

### 安装其他内核

```bash
# R 内核
R -e "IRkernel::installspec()"

# Julia 内核
julia -e 'using Pkg; Pkg.add("IJulia")'
```

## 预装扩展

| 扩展 | 描述 |
|------|------|
| `jupyterlab-git` | Git 集成 |
| `jupyterlab-lsp` | 语言服务器协议 |
| `jupyterlab-sql` | SQL 支持 |

### 安装扩展

```bash
pip install jupyterlab-git
jupyter labextension install @jupyterlab/git
```

## 服务管理

```bash
# 启动 Jupyter
pig start jupyter

# 停止 Jupyter
pig stop jupyter

# 重启 Jupyter
pig restart jupyter

# 查看日志
pig logs jupyter
```

## 连接 PostgreSQL

```python
import psycopg2
import pandas as pd

# 连接数据库
conn = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="dba"
)

# 查询数据
df = pd.read_sql("SELECT * FROM my_table", conn)
df.head()
```

## 使用 SQL Magic

```python
%load_ext sql
%sql postgresql://dba@localhost/postgres

%%sql
SELECT * FROM pg_stat_activity LIMIT 5;
```

## 快捷键

| 快捷键 | 操作 |
|--------|------|
| `Shift+Enter` | 运行单元格 |
| `Ctrl+Enter` | 运行单元格，保持在当前单元格 |
| `Alt+Enter` | 运行单元格，在下方插入 |
| `Esc` | 命令模式 |
| `Enter` | 编辑模式 |
| `A` | 在上方插入单元格 |
| `B` | 在下方插入单元格 |
| `DD` | 删除单元格 |

## 故障排除

### 连接问题

```bash
# 检查服务状态
systemctl status jupyter

# 检查端口绑定
ss -tlnp | grep 8888

# 查看日志
journalctl -u jupyter -f
```

### 内核问题

```bash
# 列出可用内核
jupyter kernelspec list

# 重新安装内核
python -m ipykernel install --user
```

## 另请参阅

- [Jupyter 教程](/docs/tutorial/jupyter/)
- [配置参考](/docs/reference/config/)
