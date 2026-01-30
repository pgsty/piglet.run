---
title: Jupyter
linkTitle: Jupyter
weight: 40
icon: fa-solid fa-flask
---

## JupyterLab Tutorial

Learn to use JupyterLab for data analysis in Piglet Run.

## Access

Navigate to:
```
http://<ip>/jupyter
```

## Features

- Interactive Python notebooks
- Rich output (charts, tables, images)
- PostgreSQL integration
- Multiple kernels (Python, SQL)

## Getting Started

### 1. Create a Notebook

Click "Python 3" under Notebook.

### 2. Connect to PostgreSQL

```python
import psycopg
import pandas as pd

conn = psycopg.connect("postgres://postgres@localhost/postgres")
df = pd.read_sql("SELECT * FROM pg_stat_activity", conn)
df.head()
```

### 3. Visualize Data

```python
import matplotlib.pyplot as plt

df['state'].value_counts().plot(kind='bar')
plt.show()
```

## Tips

- Use `Shift+Enter` to run cells
- Save notebooks to `/root/workspace/notebooks`

## Next Steps

- Learn [Claude Code](/docs/tutorial/claude/)
- Explore [Database](/docs/tutorial/database/)
