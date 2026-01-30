---
title: 应用
linkTitle: 应用
weight: 70
icon: fa-solid fa-globe
---

## 构建和部署

学习在 Piglet Run 中构建和部署 Web 应用。

## 创建 FastAPI 应用

### 1. 设置项目

```bash
cd ~/workspace
mkdir myapp && cd myapp
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn psycopg[binary]
```

### 2. 创建应用

创建 `main.py`：

```python
from fastapi import FastAPI
import psycopg

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello from Piglet Run!"}

@app.get("/users")
def get_users():
    conn = psycopg.connect("postgres://postgres@localhost/postgres")
    cur = conn.execute("SELECT * FROM users")
    return cur.fetchall()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### 3. 本地运行

```bash
python main.py
```

### 4. 使用 Nginx 部署

查看 [部署任务](/docs/task/deploy/) 了解生产部署。

## 下一步

- 学习 [部署](/docs/task/deploy/)
- 设置 [SSL](/docs/task/ssl/)
