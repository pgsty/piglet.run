---
title: SSL
linkTitle: SSL
weight: 50
icon: fa-solid fa-lock
---

Learn how to configure SSL certificates for secure HTTPS connections.

## Overview

Piglet Run supports multiple SSL certificate options:

- **Let's Encrypt**: Free automatic certificates
- **Self-Signed**: For development and testing
- **Custom**: Bring your own certificates

## Quick SSL Setup

Enable SSL with Let's Encrypt:

```bash
pig ssl enable --domain example.com
```

## Let's Encrypt Certificates

### Enable for Domain

```bash
pig ssl letsencrypt --domain example.com --email admin@example.com
```

### Multiple Domains

```bash
pig ssl letsencrypt --domain example.com --domain www.example.com
```

### Wildcard Certificate

```bash
pig ssl letsencrypt --domain "*.example.com" --dns cloudflare
```

## Self-Signed Certificates

### Generate Self-Signed

```bash
pig ssl self-signed --domain localhost
```

### For Development

```bash
pig ssl self-signed --domain dev.local --days 365
```

## Custom Certificates

### Install Custom Certificate

```bash
pig ssl install --cert /path/to/cert.pem --key /path/to/key.pem
```

### With Certificate Chain

```bash
pig ssl install \
  --cert /path/to/cert.pem \
  --key /path/to/key.pem \
  --chain /path/to/chain.pem
```

## Certificate Management

### View Certificates

```bash
pig ssl list
```

### Check Expiration

```bash
pig ssl status
```

### Renew Certificates

```bash
pig ssl renew
```

## Configuration

SSL settings in `/etc/piglet/ssl.yml`:

```yaml
ssl:
  provider: letsencrypt
  email: admin@example.com
  auto_renew: true
  renew_days: 30
```

## Next Steps

- Set up [Custom Domain](/docs/task/domain/)
- Learn about [Security](/docs/concept/security/)
