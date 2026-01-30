---
title: VS Code Server
linkTitle: VS Code
weight: 30
icon: fa-solid fa-code
---

VS Code Server configuration and details for Piglet Run.

## Overview

Piglet Run includes a pre-configured VS Code Server (code-server) for browser-based development.

## Access

Default URL: `http://<ip>/code`

## Configuration

File: `/etc/piglet/vscode.yml`

```yaml
vscode:
  enabled: true
  bind_addr: 127.0.0.1:8080
  auth: password
  password: ${VSCODE_PASSWORD}
  cert: false

  # User data directory
  user_data_dir: /home/dba/.local/share/code-server

  # Extensions directory
  extensions_dir: /home/dba/.local/share/code-server/extensions
```

## Pre-installed Extensions

| Extension | Description |
|-----------|-------------|
| `ms-python.python` | Python language support |
| `ms-toolsai.jupyter` | Jupyter notebook support |
| `rust-lang.rust-analyzer` | Rust language support |
| `golang.go` | Go language support |
| `dbaeumer.vscode-eslint` | JavaScript linting |
| `esbenp.prettier-vscode` | Code formatter |
| `mtxr.sqltools` | SQL tools |

## Installing Extensions

### Via CLI

```bash
code-server --install-extension ms-python.python
```

### Via Settings

1. Open VS Code in browser
2. Go to Extensions (Ctrl+Shift+X)
3. Search and install extensions

## Settings

Default settings location: `/home/dba/.local/share/code-server/User/settings.json`

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "terminal.integrated.defaultProfile.linux": "bash",
  "python.defaultInterpreterPath": "/usr/bin/python3",
  "files.autoSave": "afterDelay"
}
```

## Service Management

```bash
# Start VS Code server
pig start vscode

# Stop VS Code server
pig stop vscode

# Restart VS Code server
pig restart vscode

# View logs
pig logs vscode
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+P` | Command palette |
| `Ctrl+P` | Quick open file |
| `Ctrl+Shift+E` | Explorer |
| `Ctrl+Shift+F` | Search |
| `Ctrl+`` ` | Terminal |
| `Ctrl+Shift+G` | Git |

## Troubleshooting

### Connection Issues

```bash
# Check service status
systemctl status code-server

# Check port binding
ss -tlnp | grep 8080

# View logs
journalctl -u code-server -f
```

### Extension Issues

```bash
# List installed extensions
code-server --list-extensions

# Reinstall extension
code-server --uninstall-extension EXTENSION_ID
code-server --install-extension EXTENSION_ID
```

## See Also

- [VS Code Tutorial](/docs/tutorial/vscode/)
- [Configuration Reference](/docs/reference/config/)
