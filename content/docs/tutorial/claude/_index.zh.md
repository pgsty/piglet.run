---
title: Claude Code
linkTitle: Claude Code
weight: 50
icon: fa-solid fa-robot
---

## AI 辅助开发

学习在 Piglet Run 中使用 Claude Code 进行 AI 辅助开发。

## 前置条件

你需要一个 Anthropic API 密钥。设置：

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

## 开始使用

### 1. 启动 Claude Code

在 VS Code 终端中：

```bash
claude
```

### 2. 给出指令

让 Claude 帮助你的项目：

```
> 创建一个使用 PostgreSQL 的 FastAPI 应用
```

### 3. 审查和接受

Claude 将：
- 分析你的请求
- 生成代码
- 解释更改
- 等待你的批准

## 最佳实践

| 实践 | 原因 |
|------|------|
| 创建快照 | 需要时可回滚 |
| 审查更改 | 接受前验证 |
| 明确具体 | 获得更好结果 |
| 迭代 | 逐步完善 |

## 安全性

Piglet Run 使 AI 编码更安全：
- **快照**：随时恢复
- **监控**：跟踪 AI 活动
- **隔离**：沙箱环境

## 监控

在以下位置查看 Claude Code 活动：
```
http://<ip>/ui/d/claude-code
```

## 下一步

- 探索 [数据库](/docs/tutorial/database/)
- 构建 [应用](/docs/tutorial/application/)
