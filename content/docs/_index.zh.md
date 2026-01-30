---
title: 文档
linkTitle: 文档
weight: 10
description: Piglet Run 文档 - AI 编码沙箱，集成 PostgreSQL、JuiceFS、VS Code 等。
icon: fa-solid fa-book
---

欢迎使用 **Piglet Run** 文档！

Piglet Run（小猪运行时）是 Pigsty 的轻量运行时环境，专为 AI Web Coding 打造的云端编码沙箱。它将 PostgreSQL 数据库、JuiceFS 分布式存储、VS Code、JupyterLab 等工具整合为一体。

## 文档结构

本文档采用 **Diataxis** 框架，分为四个类别：

| 类别 | 用途 | 示例 |
|------|------|------|
| [**概念**](/docs/concept/) | 理解原理 | 什么是 Piglet Run？快照如何工作？ |
| [**教程**](/docs/tutorial/) | 循序渐进学习 | 安装 Piglet Run，创建第一个项目 |
| [**任务**](/docs/task/) | 完成具体操作 | 备份数据库，部署应用 |
| [**参考**](/docs/reference/) | 查阅详细信息 | 配置选项，CLI 命令 |

## 快速链接

- **刚接触 Piglet Run？** 从 [安装教程](/docs/tutorial/install/) 开始
- **想理解概念？** 阅读 [什么是 Piglet Run？](/docs/concept/overview/)
- **需要操作指南？** 查看 [任务](/docs/task/) 章节
- **需要详细参考？** 查阅 [参考](/docs/reference/) 章节

## 核心特性

| 特性 | 说明 |
|------|------|
| 🤖 AI 编码 | 预装 Claude Code、VS Code、Jupyter，Python/Go/Node.js 开箱即用 |
| 🐘 数据全能 | PostgreSQL 18 + 400+ 扩展 |
| 💾 共享存储 | JuiceFS 将工作目录存入数据库 |
| ⏱️ 时光机器 | 数据库 PITR + 文件系统快照 |
| 🔀 瞬间克隆 | Copy-on-Write 零拷贝克隆 |
| 🌐 一键上线 | 内置 Nginx，自动 SSL |
| 📊 全栈监控 | VictoriaMetrics + Grafana |
