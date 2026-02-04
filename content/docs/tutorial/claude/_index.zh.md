---
title: Claude Code 配置
linkTitle: Claude Code
weight: 50
icon: fa-solid fa-robot
description: 配置 Claude Code 进行 AI 辅助编程
---

## 什么是 Claude Code

Claude Code 是 Anthropic 官方的 AI 编程助手。它能：

- 理解你的代码库
- 根据自然语言指令编写代码
- 执行命令、创建文件、修改代码
- 直接操作你的 Piglet 环境

在 Piglet 中，Claude Code **开箱能用**——环境已经预配置好了 `CLAUDE.md`，告诉 AI 这里有什么工具可以用。

---

## 获取 API Key

### 第一步：注册 Anthropic 账号

访问 [console.anthropic.com](https://console.anthropic.com/) 注册账号。

### 第二步：创建 API Key

1. 登录后进入 **API Keys** 页面
2. 点击 **Create Key**
3. 复制生成的密钥（以 `sk-ant-` 开头）

> **注意**：API Key 只显示一次，请妥善保存。

### 第三步：充值

Claude Code 按 token 计费。建议先充值 $5-10 试用。

---

## 配置方式

### 方式 A：本地 Claude Code 连接远程服务器（推荐）

这是最流畅的体验——在本地终端运行 Claude Code，但它操作的是远程 Piglet 服务器。

**1. 在本地安装 Claude Code**

```bash
# macOS / Linux
npm install -g @anthropic-ai/claude-code

# 或使用 Homebrew
brew install claude-code
```

**2. 配置 API Key**

```bash
claude config set apiKey sk-ant-your-api-key-here
```

**3. 连接到 Piglet 服务器**

```bash
claude connect ssh root@你的服务器IP
```

现在你可以直接对话：

```
> 帮我看看这个服务器上有什么
> 在 ~/data 下创建一个 Flask 项目
> 写一个爬虫，抓取 Hacker News 首页标题，存到 PostgreSQL
```

### 方式 B：在服务器上直接运行

如果你通过网页版 VS Code 或 SSH 登录到服务器：

**1. 配置环境变量**

```bash
# 临时生效
export ANTHROPIC_API_KEY="sk-ant-your-api-key-here"

# 永久生效（写入 .bashrc）
echo 'export ANTHROPIC_API_KEY="sk-ant-your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

**2. 启动 Claude Code**

```bash
claude
```

### 方式 C：VS Code 扩展（可选）

如果你用本地 VS Code + Remote SSH：

1. 安装 **Claude** 扩展
2. 在设置中配置 API Key
3. 按 `Cmd+Shift+P` 输入 `Claude` 使用

---

## CLAUDE.md：告诉 AI 环境里有什么

Piglet 在 `~/CLAUDE.md` 预置了一份环境说明文件。Claude Code 会自动读取它，了解：

- 这是一个 Piglet 环境
- PostgreSQL 数据库连接方式
- 可用的命令行工具（`pig`、`psql` 等）
- 文件系统结构
- 部署方式

你可以编辑这个文件，添加项目特定的说明：

```bash
vim ~/CLAUDE.md
```

例如：

```markdown
## 项目说明

这是一个电商网站项目，使用：
- 后端：FastAPI
- 数据库：PostgreSQL（已配置）
- 前端：React（在 /www/shop-frontend）

## 数据库结构

- users 表：用户信息
- products 表：商品信息
- orders 表：订单信息

## 部署命令

pig deploy ./dist --name shop
```

---

## 使用示例

### 创建项目

```
> 在 ~/data/blog 创建一个 Flask 博客应用，带文章的增删改查，使用 PostgreSQL 存储
```

### 调试问题

```
> 看看 PostgreSQL 的日志，最近有什么错误吗
> 这个 Python 脚本报错了，帮我修一下
```

### 部署应用

```
> 把 ~/data/blog 部署到 /www/blog，配置 Nginx 反向代理
```

### 数据库操作

```
> 帮我创建一个 users 表，包含 id、name、email、created_at 字段
> 给我写一个 SQL 查询，统计过去 7 天每天的注册用户数
```

### 监控诊断

```
> 给我生成一份服务器巡检报告
> 看看磁盘空间和内存使用情况
```

---

## 搞砸了也不怕

这是 Piglet 的核心价值之一：**Code Fearlessly**。

如果 Claude 搞砸了什么：

```bash
# 查看最近的文件系统快照
pig snapshot list

# 回滚到某个时间点
pig snapshot restore --time "2024-01-15 14:30:00"
```

数据库也一样：

```bash
# 数据库时间旅行
pig pg pitr --time "2024-01-15 14:30:00"
```

所以放心大胆地让 Claude 去尝试。

---

## 最佳实践

| 做法 | 说明 |
|------|------|
| **说清楚你要什么** | "做一个网页"不如"做一个展示天气的网页，用 ECharts 画温度曲线" |
| **给上下文** | 告诉它项目背景、技术栈、约束条件 |
| **分步迭代** | 先做核心功能，再逐步完善 |
| **审查代码** | Claude 会先展示计划，确认后再执行 |
| **用 CLAUDE.md** | 把项目说明写进去，Claude 会自动参考 |

---

## 费用参考

Claude Code 使用 Claude Sonnet 模型，按 token 计费：

| 操作 | 大约消耗 | 参考费用 |
|------|---------|---------|
| 简单对话 | ~1K tokens | < $0.01 |
| 生成一个文件 | ~5K tokens | ~$0.02 |
| 复杂项目讨论 | ~20K tokens | ~$0.10 |

日常使用，$5-10 可以用很久。

---

## 故障排除

| 问题 | 解决方案 |
|------|---------|
| `API key invalid` | 检查 key 是否正确，是否有余额 |
| 连接超时 | 检查网络，国内可能需要代理 |
| 权限不足 | 确保用 root 或有 sudo 权限的用户 |
| Claude 不了解环境 | 检查 `~/CLAUDE.md` 是否存在 |

---

## 下一步

- **[快速开始教程](/docs/tutorial/quickstart/)** - 用 Claude 做你的第一个网页
- **[第一个 Web 应用](/docs/tutorial/application/)** - 做一个带数据库的应用
- **[灾难恢复](/docs/tutorial/database/)** - 体验时间旅行
