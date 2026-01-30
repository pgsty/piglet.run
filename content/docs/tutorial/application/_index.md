---
title: Application
linkTitle: Application
weight: 70
icon: fa-solid fa-globe
---

## Build and Deploy

Learn to build and deploy a web application in Piglet Run.

## Create a FastAPI App

### 1. Set Up Project

```bash
cd ~/workspace
mkdir myapp && cd myapp
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn psycopg[binary]
```

### 2. Create Application

Create `main.py`:

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

### 3. Run Locally

```bash
python main.py
```

### 4. Deploy with Nginx

See [Deploy Task](/docs/task/deploy/) for production deployment.

## Next Steps

- Learn to [Deploy](/docs/task/deploy/)
- Set up [SSL](/docs/task/ssl/)
