# Sugar

Sugar 是一个基于 Cloudflare Workers 的博客系统。

## 开发模式

1. 安装依赖

```shell
bun install
```

2. 生成数据库迁移文件

```shell
bun run db:generate
```

3. 创建 D1 数据库

```shell
bunx wrangler d1 create sugar
```

4. 添加 D1 数据库凭证到 wrangler.json

```shell
bunx wrangler d1 create sugar
```

5. 运行本地 SQLite 数据库

```shell
bun run db:up
```

6. 应用迁移文件到本地数据库

```shell
bunx wrangler d1 execute sugar --local --file=./drizzle/migrations/<migration file name here>
```

7. 启动开发服务器

```shell
bun run dev
```

### 生产模式

1. 应用迁移文件到 Cloudflare D1 数据库

```shell
bunx wrangler d1 execute sugar --remote --file=./drizzle/migrations/<migration file name here>
```

2. 部署应用

```shell
bun run deploy
```