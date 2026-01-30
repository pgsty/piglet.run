---
title: Nginx
linkTitle: Nginx
weight: 60
icon: fa-solid fa-server
---

Nginx web server configuration for Piglet Run.

## Overview

Piglet Run uses Nginx as a reverse proxy and web server for all services.

## Configuration

Main config: `/etc/nginx/nginx.conf`

Site configs: `/etc/nginx/conf.d/`

## Default Configuration

File: `/etc/nginx/conf.d/piglet.conf`

```nginx
# Piglet Run Nginx Configuration

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

    # Homepage
    location / {
        root /www/piglet;
        index index.html;
    }

    # VS Code Server
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

## SSL Configuration

File: `/etc/nginx/conf.d/piglet-ssl.conf`

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/piglet/ssl/cert.pem;
    ssl_certificate_key /etc/piglet/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # ... location blocks ...
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

## Service Management

```bash
# Start Nginx
pig start nginx

# Stop Nginx
pig stop nginx

# Restart Nginx
pig restart nginx

# Reload configuration
pig reload nginx

# Test configuration
nginx -t
```

## Custom Site Configuration

Create custom site config:

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

## Proxy Configuration

### WebSocket Support

```nginx
location /ws {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
}
```

### Node.js Application

```nginx
location /app {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Logging

Access log: `/var/log/nginx/access.log`

Error log: `/var/log/nginx/error.log`

```nginx
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$http_x_forwarded_for"';

access_log /var/log/nginx/access.log main;
```

## Rate Limiting

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://backend;
}
```

## Troubleshooting

```bash
# Test configuration
nginx -t

# Check error log
tail -f /var/log/nginx/error.log

# Check access log
tail -f /var/log/nginx/access.log

# View connections
ss -tlnp | grep nginx
```

## See Also

- [SSL Configuration](/docs/task/ssl/)
- [Domain Setup](/docs/task/domain/)
- [Deploy Applications](/docs/task/deploy/)
