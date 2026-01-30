---
title: Deploy
linkTitle: Deploy
weight: 40
icon: fa-solid fa-paper-plane
---

Learn how to deploy web applications on Piglet Run.

## Overview

Piglet Run supports deploying various web applications:

- **Static Sites**: HTML, CSS, JavaScript
- **Node.js**: Express, Next.js, React
- **Python**: Flask, Django, FastAPI
- **PHP**: Laravel, WordPress

## Quick Deploy

Deploy a static site:

```bash
pig deploy ./my-site
```

## Deploy Static Site

### From Local Directory

```bash
pig deploy ./dist --name my-site
```

### From Git Repository

```bash
pig deploy https://github.com/user/repo --name my-site
```

## Deploy Node.js Application

### Basic Deployment

```bash
cd my-node-app
pig deploy --type nodejs
```

### With Custom Port

```bash
pig deploy --type nodejs --port 3000
```

### Configuration

Create `piglet.yml` in your project:

```yaml
type: nodejs
entry: server.js
port: 3000
env:
  NODE_ENV: production
```

## Deploy Python Application

### Flask Application

```bash
pig deploy --type python --framework flask
```

### Django Application

```bash
pig deploy --type python --framework django
```

## Deployment Management

### List Deployments

```bash
pig deploy list
```

### View Logs

```bash
pig deploy logs my-site
```

### Restart Application

```bash
pig deploy restart my-site
```

### Remove Deployment

```bash
pig deploy remove my-site
```

## Next Steps

- Configure [SSL](/docs/task/ssl/) for HTTPS
- Set up [Custom Domain](/docs/task/domain/)
