---
title: VS Code 服务器
linkTitle: VS Code
weight: 30
icon: fa-solid fa-code
---

Piglet Run 的 VS Code 服务器配置和详情。

## 概述

Piglet Run 包含预配置的 VS Code 服务器 (code-server)，用于基于浏览器的开发。

## 访问

默认 URL：`http://<ip>/code`

## 配置

文件：`/etc/piglet/vscode.yml`

```yaml
vscode:
  enabled: true
  bind_addr: 127.0.0.1:8080
  auth: password
  password: ${VSCODE_PASSWORD}
  cert: false

  # 用户数据目录
  user_data_dir: /home/dba/.local/share/code-server

  # 扩展目录
  extensions_dir: /home/dba/.local/share/code-server/extensions
```

## 预装扩展

| 扩展 | 描述 |
|------|------|
| `ms-python.python` | Python 语言支持 |
| `ms-toolsai.jupyter` | Jupyter 笔记本支持 |
| `rust-lang.rust-analyzer` | Rust 语言支持 |
| `golang.go` | Go 语言支持 |
| `dbaeumer.vscode-eslint` | JavaScript 代码检查 |
| `esbenp.prettier-vscode` | 代码格式化 |
| `mtxr.sqltools` | SQL 工具 |

## 安装扩展

### 通过 CLI

```bash
code-server --install-extension ms-python.python
```

### 通过设置

1. 在浏览器中打开 VS Code
2. 进入扩展 (Ctrl+Shift+X)
3. 搜索并安装扩展

## 设置

默认设置位置：`/home/dba/.local/share/code-server/User/settings.json`

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

## 服务管理

```bash
# 启动 VS Code 服务器
pig start vscode

# 停止 VS Code 服务器
pig stop vscode

# 重启 VS Code 服务器
pig restart vscode

# 查看日志
pig logs vscode
```

## 快捷键

| 快捷键 | 操作 |
|--------|------|
| `Ctrl+Shift+P` | 命令面板 |
| `Ctrl+P` | 快速打开文件 |
| `Ctrl+Shift+E` | 资源管理器 |
| `Ctrl+Shift+F` | 搜索 |
| `Ctrl+`` ` | 终端 |
| `Ctrl+Shift+G` | Git |

## 故障排除

### 连接问题

```bash
# 检查服务状态
systemctl status code-server

# 检查端口绑定
ss -tlnp | grep 8080

# 查看日志
journalctl -u code-server -f
```

### 扩展问题

```bash
# 列出已安装扩展
code-server --list-extensions

# 重新安装扩展
code-server --uninstall-extension EXTENSION_ID
code-server --install-extension EXTENSION_ID
```

## 另请参阅

- [VS Code 教程](/docs/tutorial/vscode/)
- [配置参考](/docs/reference/config/)
