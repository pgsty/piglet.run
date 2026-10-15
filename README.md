# Piglet Run

Piglet 的 Hugo 站点，主题通过 `go.mod` 固定为 OINK v1.3.0；项目模板、样式和脚本保存在本站。

## 本地开发

```sh
make dev
make dev OINK_LOCAL=/path/to/oink PORT=1314
make check
make build
make serve
```

`make dev` 使用 `~/pgsty/oink` 当前工作树，要求 Hugo Extended 0.166.0。`OINK` 作为旧路径覆盖变量继续可用；优先使用 `OINK_LOCAL`。开发入口禁用 Go/Hugo workspace 并绕过 OINK vendor。

`make build`、`make check`、`make serve` 清除继承的本地主题替换，使用 `go.mod` 的固定版本。`make check` 验证 Go 模块、JavaScript 语法并执行警告即失败的 Hugo 构建。

`make sync` 会将已有 `public/` 通过 rsync 写入远端，仅在明确授权部署时执行。构建产物和缓存不进入 Git。
