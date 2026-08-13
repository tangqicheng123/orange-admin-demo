# OrangeAdmin（橙枢）

> 基于 **Vue 3 + TypeScript + Element Plus** 的可售卖后台管理模板。
> 纯前端 + 浏览器端 Mock，开箱即跑；设计 / 代码原创，依赖全为宽松协议，**合规可售**。

---

## ✨ 功能特性

**技术底座**
- ⚡ Vue 3.5 + `<script setup>` + **TypeScript（strict）**
- 🎨 Element Plus 按需引入，内置**暗黑模式 + 主题色实时切换**
- 🧩 Pinia 状态管理、Vue Router 4（路由级 + 菜单级）
- 🛠️ 统一 Axios 封装，浏览器端 Mock 适配器（dev / preview 行为一致）
- 📐 ESLint + Prettier + Stylelint 工程规范
- ✅ 依赖协议合规扫描（`npm run license:check`）

**🛡️ 合规可售**
本模板配套 **`npm run license:check`**：递归扫描 `node_modules` 内全部安装包协议，禁绝 GPL / AGPL / LGPL / SSPL 等传染性协议。当前扫描结果：**338/338 包全为宽松协议**（MIT 289 / ISC 20 / BSD 15 / Apache-2.0 7 / 其它宽松协议 7）。
完整协议声明见 [THIRD-PARTY-LICENSES.md](./THIRD-PARTY-LICENSES.md)，一键重新生成：`npm run license:gen`。

**多标签工作台（TabsView）**
- 仪表盘（affix）固定钉在最前，**不可关闭**
- 同一路由不同 query **多开标签**（标题自动带参数摘要）
- **原生拖拽**改顺序（仪表盘永远第一），**滚轮横向滚动**翻标签
- 右键菜单：刷新 / 关闭 / 关闭其他 / 关闭全部
- 标签状态持久化到 sessionStorage

**RBAC 权限体系**
- 路由级守卫 + 侧边栏菜单按权限过滤 + 按钮级 `v-permission` 指令
- 角色管理：树形**权限分配**弹窗（父节点联动、精准回显、无"父节点放大"陷阱）
- 角色权限分配结果持久化（localStorage），刷新 / 切角色不丢
- 无权限访问自动跳转 403

**系统管理（全套 CRUD，真实 Mock 数据）**
- 用户管理：查询 / 分页 / 新增 / 编辑 / 删除 / 状态开关 + 部门下拉联动
- 角色管理：列表 + 树形权限分配
- 菜单管理：树形表格 + **新增 / 编辑 / 删除**（父菜单级联选择，删除连带子菜单）
- 部门管理：新增（用户管理部门下拉实时联动）
- 字典管理：**新增 / 编辑 / 删除**

**其他**
- 仪表盘：ECharts 多图表（访问趋势 / 来源占比 / 销售柱状 / 监控仪表盘）
- 组件演示：表格 / 表单 / 图表真实示例（含可复用 `ProTable` 声明式表格封装演示）
- AI 应用管理（行业版骨架）：API Key 管理 / 模型配置 / 对话日志 / 用量统计，聚焦 AI 工具与 SaaS 的运维场景
- 登录 / 401 / 403 / 404 错误页

---

## 🚀 快速开始

```bash
# 安装依赖（Node >= 18）
npm install

# 开发（内置浏览器端 Mock，访问 http://localhost:5173）
npm run dev

# 类型检查
npm run type-check

# 构建
npm run build

# 预览构建产物（只读 dist，推荐用于验收 Demo）
npm run preview
```

> 📘 二次开发（加菜单 / 接真实后端 / 改主题 / 用 ProTable）：见 [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)

### 演示账号

| 账号 | 密码 | 权限 |
| --- | --- | --- |
| `admin` | `123456` | 超级管理员（`*` 全部权限） |
| `user` | `123456` | 受限用户（按角色分配结果） |

> 右上角可一键切换角色，实时体验 RBAC 效果。

---

## 📁 目录结构

```
orange-admin/
├── src/
│   ├── components/       公共组件
│   ├── layout/          主框架（侧边栏 / 顶栏 / 多标签 TabsView）
│   ├── mock/            Mock 接口（browser.ts 浏览器端实现 + 种子数据）
│   ├── router/          路由、动态菜单、affix 固定标签集合
│   ├── store/           Pinia 状态（user / app）
│   ├── utils/           request（Axios + 浏览器端 Mock adapter）
│   ├── views/
│   │   ├── dashboard/   仪表盘（ECharts）
│   │   ├── system/      系统管理（用户 / 角色 / 菜单 / 部门 / 字典）
│   │   ├── components/  组件演示（表格 / 表单 / 图表）
│   │   ├── layout/      主框架页面与组件
│   │   ├── error/        401 / 403 / 404
│   │   └── redirect/     刷新中转页
│   ├── permission.ts    按钮级权限指令（v-permission）
│   ├── App.vue
│   └── main.ts
├── scripts/             工程脚本（license:check 等）
├── LICENSE              商业授权（分级买断）
└── THIRD-PARTY-LICENSES.md  第三方组件协议声明
```

---

## 🧩 Mock 机制说明

模板**不依赖**服务端 Mock 中间件。所有 `/api` 请求由 `src/utils/request.ts` 挂载的
自定义 Axios **adapter** 在浏览器端直接拦截，调用 `src/mock/browser.ts` 的 `dispatchMock()`。

- **dev / preview / 部署 Demo 行为完全一致**，无需额外启动 Mock Server；
- 后端就绪后，只需移除 adapter 挂载、将 `baseURL` 指向真实服务即可平滑切换；
- 增删改数据通过 `localStorage`（部门 / 菜单 / 字典 / 角色权限）持久化，刷新不丢，
  清空对应 `orange-admin-*` 键或开无痕窗口即可恢复种子数据。

---

## 🔐 RBAC 权限模型

| 维度 | 实现 |
| --- | --- |
| 路由级 | 全局守卫校验 `meta.permission`，无权限跳 403 |
| 菜单级 | 侧边栏按 `userStore.hasPermission()` 过滤，子菜单全无权限时父菜单自动隐藏 |
| 按钮级 | `v-permission="'user:add'"` 指令，无权限移除 DOM |
| 数据来源 | 登录后 `/api/auth/userinfo` 返回角色 → 查角色权限集 |

权限点命名约定：`模块:动作`（如 `user:view` / `user:add` / `user:edit` / `user:delete` /
`role:assign` / `menu:add` / `dict:delete` …）。超级管理员权限为 `*`。

---

## 🧱 代码质量亮点（可复用封装）

本模板坚持「配置驱动、少写重复代码」。以下两个封装是典型代表，源码均可直接复用：

### 1. 声明式表格 `ProTable`

`src/components/ProTable.vue` 用一列配置即可生成「搜索 + 排序 + 分页 + 权限 + 自定义插槽」的完整表格，业务页只需声明 `columns`：

```ts
// 列定义即 UI：搜索 / 排序 / 权限 / 插槽全部由 column 驱动
const columns = computed<ProColumn<DemoUser>[]>(() => [
  { prop: 'name', label: '姓名', width: 100, search: { type: 'input' } },
  { prop: 'dept', label: '部门', width: 120, search: { type: 'select', options: deptOptions } },
  { prop: 'role', label: '角色', width: 100, slot: 'role' },        // 自定义单元格
  { prop: 'status', label: '状态', width: 90, slot: 'status' },
  { prop: 'createdAt', label: '创建时间', width: 170, sortable: true },
])

// 模板只需一行：<ProTable :columns="columns" :data="demoUsers" />
```

- 客户端 / 服务端双模式（`data` 直传 或 `request` 回传分页参数）；
- 列级权限 `auth`：无权限整列隐藏；
- 单元格插槽 `slot`：状态标签、操作按钮等按需渲染。

### 2. 菜单驱动的动态路由 `generateRoutes`

`src/router/dynamic.ts` 把「菜单表」直接编译为路由，`import.meta.glob` 构建期收集视图、运行时查表懒加载，避免生产环境 404：

```ts
// 菜单（含父子、排序、权限点）→ 路由树，业务菜单零硬编码
export function generateRoutes(list: MenuRowLike[]): RouteRecordRaw[] {
  return menuToRoutes(buildMenuTree(list))
}
// 关键细节：用 import.meta.glob('../views/**/*.vue') 静态收集视图，
// 而非 import(/* @vite-ignore */ '@/views/...') —— 后者会让 vite 跳过打包导致生产 404。
```

更多封装参见 `src/components/`、`src/utils/request.ts`、`src/store/`。

---

## 📜 授权与售卖

本模板为**商业授权**产品，非开源。采用分级买断授权：

| 授权档 | 价格 | 适用 |
| --- | --- | --- |
| 个人版 | ¥19.9（个人商用授权：限 1 个自有项目，保留版权，不可转售） | 个人学习 / 练手 / 自有项目 |
| 商业版 | ¥399 | 商业项目使用、接单交付、公司内部系统 |
| 扩展版 | ¥1499 | SaaS、多产品、需去除版权声明、需定制支持 |

> **售后服务承诺**：购买即享 **3–6 个月免费 Bug 修复** + **1 对 1 答疑支持**（启动 / 接真实接口 / 二次开发）。详见随源码附带的《商业授权书》。

第三方开源组件归属见 `THIRD-PARTY-LICENSES.md`，依赖全部为 MIT / Apache-2.0 等宽松协议。
发布前可一键核查：`npm run license:check`（违规退出码 1）。

---

## 🌐 部署上线

构建产物为**纯静态文件**，可托管到任意静态服务器（Nginx / Apache / OSS+CDN / Vercel / CloudStudio 等）。

```bash
# 1) 生产构建（含类型检查）
npm run build

# 2) 将 dist/ 目录整体上传到服务器网站根目录
# 3) 配置 SPA 回退（所有路由都返回 index.html），避免刷新 / 直链 404
```

**Nginx 示例**：仓库已提供 `deploy/nginx.conf`，包含静态托管 + `try_files` SPA 回退 + gzip + 资源长缓存。
部署步骤：① 将 `dist/` 上传到 `root` 指定路径；② 把配置写入 `/etc/nginx/conf.d/orange-admin.conf`；
③ 修改 `server_name` 与 `root`；④ `nginx -t && systemctl reload nginx`。

> 若需在线体验 Demo（如挂到 CloudStudio 静态托管），直接上传 `dist/` 即可，无需后端。

---

© 2026 唐少 · OrangeAdmin（橙枢）

---

## 🔗 作者与更新

- **GitHub**：https://github.com/tqc-dev （账号体系、更新日志、Issue 反馈）
- **技术博客**：https://tangqicheng.blog （建设中，持续输出中后台实战）
- **演示 Demo**：见仓库 Releases / 商品页（无需后端，开箱即玩）

> 购买前可免费体验社区版（功能完整、禁商用）；如需商用请购买对应授权档。
