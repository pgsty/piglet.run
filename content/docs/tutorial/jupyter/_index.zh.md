---
title: Jupyter
linkTitle: Jupyter
weight: 40
icon: fa-solid fa-flask
---

## JupyterLab 教程

学习在 Piglet Run 中使用 JupyterLab 进行数据分析。

## 访问

访问：
```
http://<ip>/jupyter
```

## 功能

- 交互式 Python 笔记本
- 丰富输出（图表、表格、图像）
- PostgreSQL 集成
- 多内核（Python、SQL）

## 开始使用

### 1. 创建笔记本

点击 Notebook 下的"Python 3"。

### 2. 连接 PostgreSQL

```python
import psycopg
import pandas as pd

conn = psycopg.connect("postgres://postgres@localhost/postgres")
df = pd.read_sql("SELECT * FROM pg_stat_activity", conn)
df.head()
```

### 3. 数据可视化

```python
import matplotlib.pyplot as plt

df['state'].value_counts().plot(kind='bar')
plt.show()
```

## 技巧

- 使用 `Shift+Enter` 运行单元格
- 将笔记本保存到 `/root/workspace/notebooks`

## 下一步

- 学习 [Claude Code](/docs/tutorial/claude/)
- 探索 [数据库](/docs/tutorial/database/)
