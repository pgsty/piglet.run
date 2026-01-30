---
title: Nginx
linkTitle: Nginx
weight: 60
icon: fa-solid fa-server
---

Piglet Run 的 Nginx Web 服务器配置。

## 概述

Piglet Run 使用 Nginx 作为所有服务的反向代理和 Web 服务器。

## 配置

主配置：`/etc/nginx/nginx.conf`

站点配置：`/etc/nginx/conf.d/`

## 默认配置

文件：`/etc/nginx/conf.d/piglet.conf`

```nginx
# Piglet Run Nginx 配置

upstream vscode {
    server 127.0.0.1:8080;
}

upstream jupyter {
    server 127.0.0.1:8888;
}

upstream grafana {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name _;

    # 主页
    location / {
        root /www/piglet;
        index index.html;
    }

    # VS Code 服务器
    location /code {
        proxy_pass http://vscode;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # JupyterLab
    location /jupyter {
        proxy_pass http://jupyter;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }

    # Grafana
    location /ui {
        proxy_pass http://grafana;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## SSL 配置

文件：`/etc/nginx/conf.d/piglet-ssl.conf`

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/piglet/ssl/cert.pem;
    ssl_certificate_key /etc/piglet/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # ... location 块 ...
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

## 服务管理

```bash
# 启动 Nginx
pig start nginx

# 停止 Nginx
pig stop nginx

# 重启 Nginx
pig restart nginx

# 重载配置
pig reload nginx

# 测试配置
nginx -t
```

## 自定义站点配置

创建自定义站点配置：

```bash
cat > /etc/nginx/conf.d/mysite.conf << 'EOF'
server {
    listen 80;
    server_name mysite.example.com;

    root /www/mysite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
EOF

nginx -t && systemctl reload nginx
```

## 代理配置

### WebSocket 支持

```nginx
location /ws {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
}
```

### Node.js 应用

```nginx
location /app {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 日志

访问日志：`/var/log/nginx/access.log`

错误日志：`/var/log/nginx/error.log`

```nginx
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$http_x_forwarded_for"';

access_log /var/log/nginx/access.log main;
```

## 速率限制

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://backend;
}
```

## 故障排除

```bash
# 测试配置
nginx -t

# 检查错误日志
tail -f /var/log/nginx/error.log

# 检查访问日志
tail -f /var/log/nginx/access.log

# 查看连接
ss -tlnp | grep nginx
```

## 另请参阅

- [SSL 配置](/docs/task/ssl/)
- [域名设置](/docs/task/domain/)
- [部署应用](/docs/task/deploy/)
