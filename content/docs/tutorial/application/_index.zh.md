---
title: 第一个 Web 应用
linkTitle: Web 应用
weight: 70
icon: fa-solid fa-globe
description: 做一个带登录功能的 Flask 应用，连接 PostgreSQL
---

## 目标

这个教程会带你创建一个完整的 Web 应用：

- Flask 后端框架
- PostgreSQL 数据库存储用户
- 用户注册、登录、注销功能
- Session 管理
- 部署上线

完成后，你会有一个真正可用的 Web 应用，不只是 Hello World。

---

## 前置条件

- 已完成 [快速开始教程](/docs/tutorial/quickstart/)
- 已登录 Piglet 环境（VS Code 或 SSH）

---

## 第一步：创建项目

```bash
cd ~/data
mkdir my-flask-app
cd my-flask-app
```

创建 Python 虚拟环境并安装依赖：

```bash
python3 -m venv venv
source venv/bin/activate
pip install flask psycopg[binary] python-dotenv
```

---

## 第二步：创建数据库表

连接 PostgreSQL：

```bash
psql postgres://postgres:piglet@localhost/postgres
```

创建用户表：

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 退出 psql
\q
```

---

## 第三步：编写应用代码

创建 `app.py`：

```python
import os
import hashlib
from flask import Flask, render_template, request, redirect, url_for, session, flash
import psycopg

app = Flask(__name__)
app.secret_key = os.urandom(24)

# 数据库连接
DB_URL = "postgres://postgres:piglet@localhost/postgres"

def get_db():
    return psycopg.connect(DB_URL)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# 首页
@app.route('/')
def index():
    user = session.get('user')
    return render_template('index.html', user=user)

# 注册
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        with get_db() as conn:
            with conn.cursor() as cur:
                # 检查用户名是否已存在
                cur.execute("SELECT id FROM users WHERE username = %s", (username,))
                if cur.fetchone():
                    flash('用户名已存在', 'error')
                    return redirect(url_for('register'))

                # 创建用户
                cur.execute(
                    "INSERT INTO users (username, password_hash) VALUES (%s, %s)",
                    (username, hash_password(password))
                )
                conn.commit()

        flash('注册成功，请登录', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

# 登录
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        with get_db() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, username FROM users WHERE username = %s AND password_hash = %s",
                    (username, hash_password(password))
                )
                user = cur.fetchone()

        if user:
            session['user'] = {'id': user[0], 'username': user[1]}
            flash(f'欢迎回来，{user[1]}！', 'success')
            return redirect(url_for('index'))
        else:
            flash('用户名或密码错误', 'error')

    return render_template('login.html')

# 注销
@app.route('/logout')
def logout():
    session.pop('user', None)
    flash('已退出登录', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

---

## 第四步：创建模板

创建模板目录：

```bash
mkdir templates
```

创建 `templates/base.html`（基础模板）：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}我的应用{% endblock %}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            min-height: 100vh;
        }
        .navbar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .navbar a { color: white; text-decoration: none; margin-left: 1rem; }
        .navbar a:hover { text-decoration: underline; }
        .logo { color: white; font-size: 1.5rem; font-weight: bold; }
        .container { max-width: 600px; margin: 2rem auto; padding: 0 1rem; }
        .card {
            background: white;
            border-radius: 8px;
            padding: 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .flash { padding: 1rem; border-radius: 4px; margin-bottom: 1rem; }
        .flash.success { background: #d4edda; color: #155724; }
        .flash.error { background: #f8d7da; color: #721c24; }
        input {
            width: 100%;
            padding: 0.75rem;
            margin: 0.5rem 0 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }
        button {
            width: 100%;
            padding: 0.75rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
        }
        button:hover { opacity: 0.9; }
        h1, h2 { margin-bottom: 1rem; }
        p { color: #666; line-height: 1.6; }
        a { color: #667eea; }
    </style>
</head>
<body>
    <nav class="navbar">
        <span class="logo">MyApp</span>
        <div>
            <a href="{{ url_for('index') }}">首页</a>
            {% if session.user %}
                <a href="{{ url_for('logout') }}">退出 ({{ session.user.username }})</a>
            {% else %}
                <a href="{{ url_for('login') }}">登录</a>
                <a href="{{ url_for('register') }}">注册</a>
            {% endif %}
        </div>
    </nav>
    <div class="container">
        {% with messages = get_flashed_messages(with_categories=true) %}
            {% for category, message in messages %}
                <div class="flash {{ category }}">{{ message }}</div>
            {% endfor %}
        {% endwith %}
        {% block content %}{% endblock %}
    </div>
</body>
</html>
```

创建 `templates/index.html`：

```html
{% extends "base.html" %}
{% block title %}首页{% endblock %}
{% block content %}
<div class="card">
    {% if user %}
        <h1>欢迎，{{ user.username }}！</h1>
        <p>你已成功登录。这是一个由 Piglet 驱动的 Flask 应用。</p>
        <p style="margin-top: 1rem;">
            <a href="{{ url_for('logout') }}">退出登录</a>
        </p>
    {% else %}
        <h1>欢迎来到 MyApp</h1>
        <p>这是一个由 Piglet 驱动的 Flask 应用，使用 PostgreSQL 存储用户数据。</p>
        <p style="margin-top: 1rem;">
            <a href="{{ url_for('login') }}">登录</a> 或
            <a href="{{ url_for('register') }}">注册</a> 开始使用
        </p>
    {% endif %}
</div>
{% endblock %}
```

创建 `templates/login.html`：

```html
{% extends "base.html" %}
{% block title %}登录{% endblock %}
{% block content %}
<div class="card">
    <h2>登录</h2>
    <form method="POST">
        <label>用户名</label>
        <input type="text" name="username" required>
        <label>密码</label>
        <input type="password" name="password" required>
        <button type="submit">登录</button>
    </form>
    <p style="margin-top: 1rem; text-align: center;">
        还没有账号？<a href="{{ url_for('register') }}">注册</a>
    </p>
</div>
{% endblock %}
```

创建 `templates/register.html`：

```html
{% extends "base.html" %}
{% block title %}注册{% endblock %}
{% block content %}
<div class="card">
    <h2>注册</h2>
    <form method="POST">
        <label>用户名</label>
        <input type="text" name="username" required>
        <label>密码</label>
        <input type="password" name="password" required>
        <button type="submit">注册</button>
    </form>
    <p style="margin-top: 1rem; text-align: center;">
        已有账号？<a href="{{ url_for('login') }}">登录</a>
    </p>
</div>
{% endblock %}
```

---

## 第五步：运行测试

```bash
python app.py
```

访问 `http://你的服务器IP:5000`，试试：

1. 点击"注册"，创建一个账号
2. 用刚才的账号登录
3. 看到欢迎页面
4. 点击"退出"

---

## 第六步：部署上线

开发完成后，用 Gunicorn 部署到生产环境：

```bash
# 安装 Gunicorn
pip install gunicorn

# 创建 systemd 服务
sudo tee /etc/systemd/system/myapp.service << EOF
[Unit]
Description=My Flask App
After=network.target

[Service]
User=root
WorkingDirectory=/root/data/my-flask-app
Environment="PATH=/root/data/my-flask-app/venv/bin"
ExecStart=/root/data/my-flask-app/venv/bin/gunicorn -w 2 -b 127.0.0.1:5000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# 启动服务
sudo systemctl daemon-reload
sudo systemctl enable myapp
sudo systemctl start myapp
```

配置 Nginx 反向代理：

```bash
sudo tee /etc/nginx/conf.d/myapp.conf << EOF
server {
    listen 80;
    server_name myapp.你的域名.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

sudo nginx -t && sudo systemctl reload nginx
```

---

## 让 Claude 帮你做

上面的步骤看起来很多？试试让 Claude Code 来做：

```
帮我在 ~/data/my-flask-app 创建一个 Flask 应用：
- 用户注册、登录、注销功能
- 使用 PostgreSQL 存储用户（连接串：postgres://postgres:piglet@localhost/postgres）
- 界面要好看
- 帮我创建数据库表
- 最后帮我部署到 Nginx
```

Claude 会自动完成所有步骤。

---

## 你学到了什么

- ✅ 创建 Flask 应用
- ✅ 连接 PostgreSQL 数据库
- ✅ 实现用户认证（注册/登录/注销）
- ✅ 使用 Jinja2 模板
- ✅ 部署到生产环境

---

## 下一步

- **[数据应用](/docs/tutorial/database/)** - 写爬虫，收集数据存入 PostgreSQL
- **[监控可视化](/docs/tutorial/vscode/)** - 用 Grafana 展示数据
- **[灾难恢复](/docs/concept/snapshot/)** - PITR 时间旅行，搞砸了也不怕
