---
title: Domain
linkTitle: Domain
weight: 60
icon: fa-solid fa-globe
---

Learn how to set up custom domains for your Piglet Run services.

## Overview

Configure custom domains for:

- **Main Application**: Your primary domain
- **Subdomains**: Service-specific subdomains
- **Multiple Domains**: Support multiple domains

## Quick Setup

Add a custom domain:

```bash
pig domain add example.com
```

## DNS Configuration

### Required DNS Records

Point your domain to Piglet Run:

| Type | Name | Value |
|------|------|-------|
| A | @ | Your server IP |
| A | www | Your server IP |
| CNAME | code | @ |
| CNAME | jupyter | @ |

### Using Cloudflare

```bash
pig domain add example.com --dns cloudflare --api-key YOUR_API_KEY
```

## Add Custom Domain

### Primary Domain

```bash
pig domain add example.com --primary
```

### Subdomain for Services

```bash
pig domain add code.example.com --service vscode
pig domain add jupyter.example.com --service jupyter
```

## Domain Management

### List Domains

```bash
pig domain list
```

### Remove Domain

```bash
pig domain remove old-domain.com
```

### Set Primary

```bash
pig domain primary example.com
```

## Configuration

Domain settings in `/etc/piglet/domains.yml`:

```yaml
domains:
  primary: example.com
  aliases:
    - www.example.com
  services:
    vscode: code.example.com
    jupyter: jupyter.example.com
    grafana: monitor.example.com
```

## Verify Domain

Check domain configuration:

```bash
pig domain verify example.com
```

## Next Steps

- Configure [SSL](/docs/task/ssl/) for HTTPS
- Learn about [Nginx Configuration](/docs/reference/nginx/)
