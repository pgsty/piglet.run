---
title: Piglet 文档
linkTitle: 文档
weight: 10
description: 搭建 AI 就绪的 PostgreSQL 工作空间，理解它的工作方式，并可靠地运行它。
icon: fa-solid fa-book
---

欢迎阅读 **Piglet** 文档。

Piglet 是构建在 Pigsty 之上的轻量运行时配置。它把一台 Linux 主机变成人类与 Agent 共享的完整环境：AI 编程、PostgreSQL、持久化存储、可观测性与 Web 交付都在同一个世界里。

## 文档结构

文档按四类问题组织：

| 分类 | 适合什么时候看 | 示例 |
|------|----------------|------|
| [**教程**](/zh/docs/tutorial/) | 第一次完成一条完整路径 | 安装 Piglet、创建第一个项目 |
| [**任务**](/zh/docs/task/) | 已经知道自己要做什么 | 备份、恢复、部署应用 |
| [**概念**](/zh/docs/concept/) | 想理解系统为什么这样工作 | 架构、快照、克隆与存储 |
| [**参考**](/zh/docs/reference/) | 需要查找准确参数 | 配置项、CLI 与内置服务 |

## 快速入口

- 第一次使用：从[安装教程](/zh/docs/tutorial/install/)开始
- 想理解整体设计：阅读[什么是 Piglet](/zh/docs/concept/overview/)
- 要完成具体操作：前往[任务指南](/zh/docs/task/)
- 要查参数：使用[参考手册](/zh/docs/reference/)

## 核心能力

| 能力 | 说明 |
|------|------|
| 🤖 AI 编程 | Claude Code、OpenCode、VS Code、Jupyter、Python、Go 与 Node.js |
| 🐘 数据核心 | PostgreSQL 18 与数百种可选扩展 |
| 💾 共享存储 | 用 JuiceFS 将工作空间持久化到数据库 |
| ⏱️ 时间机器 | PostgreSQL PITR 与文件系统快照 |
| 🔀 快速克隆 | 基于写时复制的数据分叉 |
| 🌐 Web 交付 | 内置 Nginx Portal 与自动证书 |
| 📊 完整可观测性 | VictoriaMetrics 与 Grafana |
