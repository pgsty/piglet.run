---
title: 快速开始
linkTitle: 快速开始
weight: 20
icon: fa-solid fa-rocket
description: 安装 Piglet，用 Claude Code 做一个静态网页
---

## 目标

这个教程会带你完成：

1. 登录你的 Piglet 环境
2. 用 Claude Code 生成一个数据可视化网页
3. 把它部署上线

完成后，你会有一个可以公开访问的网页，展示一个交互式 ECharts 图表。

---

## 第一步：登录环境

### 方式 A：网页版 VS Code（推荐新手）

打开浏览器，访问：

```
http://你的服务器IP/code
```

输入密码 `piglet`（首次使用请修改）。

### 方式 B：本地 VS Code + SSH（推荐日常使用）

在本地 VS Code 中：

1. 安装 **Remote - SSH** 扩展
2. 按 `Cmd+Shift+P` / `Ctrl+Shift+P`，选择 **Remote-SSH: Connect to Host**
3. 输入 `root@你的服务器IP`

### 方式 C：Claude Code 直连（AI 编程）

```bash
# 在本地终端
claude connect ssh root@你的服务器IP
```

---

## 第二步：创建项目目录

打开终端，创建工作目录：

```bash
cd ~/data
mkdir my-first-site
cd my-first-site
```

---

## 第三步：让 Claude 帮你写代码

这是 Piglet 的魔法时刻。

### 如果你用 Claude Code：

直接告诉它你想要什么：

```
给我做一个网页，展示一个 ECharts 柱状图，数据是过去 7 天的访问量（随便编一些数据）。
要求：
- 单个 HTML 文件，内联所有 CSS 和 JS
- 使用 ECharts CDN
- 页面要好看，有标题
```

Claude 会直接在当前目录创建 `index.html`。

### 如果你手动写：

创建 `index.html`：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个 Piglet 网页</title>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
        }
        h1 {
            color: white;
            margin-bottom: 30px;
            font-size: 2rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .chart-container {
            background: white;
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            width: 100%;
            max-width: 800px;
        }
        #chart { width: 100%; height: 400px; }
        .footer {
            color: rgba(255,255,255,0.8);
            margin-top: 30px;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <h1>过去 7 天访问量</h1>
    <div class="chart-container">
        <div id="chart"></div>
    </div>
    <p class="footer">由 Piglet 驱动 | Code Fearlessly, Ship Instantly.</p>

    <script>
        const chart = echarts.init(document.getElementById('chart'));
        const option = {
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: { type: 'value', name: '访问量' },
            series: [{
                data: [820, 932, 901, 1290, 1330, 1520, 1680],
                type: 'bar',
                itemStyle: {
                    borderRadius: [8, 8, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#667eea' },
                        { offset: 1, color: '#764ba2' }
                    ])
                }
            }]
        };
        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    </script>
</body>
</html>
```

---

## 第四步：预览

在终端中启动一个简单的 HTTP 服务器：

```bash
python3 -m http.server 8080
```

然后访问 `http://你的服务器IP:8080`，你应该能看到一个漂亮的柱状图页面。

按 `Ctrl+C` 停止服务器。

---

## 第五步：部署上线

让这个网页可以通过正式的 URL 访问：

```bash
# 复制到 Nginx 静态文件目录
sudo cp index.html /www/my-first-site/
```

或者使用 `pig deploy` 命令：

```bash
pig deploy . --name my-first-site
```

现在访问 `http://你的服务器IP/my-first-site/` 就能看到你的网页了。

---

## 恭喜！

你刚刚完成了：

- ✅ 登录 Piglet 开发环境
- ✅ 用 Claude Code（或手动）创建了一个数据可视化网页
- ✅ 把它部署到了互联网上

**从想法到上线，就是这么简单。**

---

## 发生了什么

让我们回顾一下 Piglet 为你做了什么：

| 传统方式 | Piglet 方式 |
|---------|-------------|
| 买服务器 → 装系统 → 配环境 → 装 Node/Python → 配 Nginx → 配 SSL... | 一条命令安装，开箱即用 |
| 本地写代码 → Git push → CI/CD → 部署 | 直接在服务器上写，一行命令部署 |
| 自己写 HTML/CSS/JS | 告诉 Claude "给我做一个网页" |

这就是 **Code Fearlessly, Ship Instantly** 的含义。

---

## 下一步

现在你已经熟悉了基本流程，可以继续：

1. **[第一个 Web 应用](/docs/tutorial/application/)** - 做一个带数据库的 Flask/Node.js 应用
2. **[配置 Claude Code](/docs/tutorial/claude/)** - 深度使用 AI 辅助编程
3. **[灾难恢复](/docs/tutorial/database/)** - 体验 PITR 时间旅行，搞砸了也不怕
