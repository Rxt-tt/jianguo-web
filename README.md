# 疆果智创 Web

面向新疆干果等农特产中小商家的 AIGC 营销物料 SaaS 前端。
核心流程三步：**上传商品图 → 选风土场景与物料类型 → 生成并下载**（主图 / 种草图文 / 短视频）。
移动端优先，重点适配手机浏览器与微信内置浏览器。

> **当前阶段（阶段一）只做页面 UI，不含任何业务功能。**
> 没有上传、接口请求、登录、支付与本地持久化；页面上的功能按钮均标注「待接入」或为禁用态。

## 快速开始

环境要求：Node.js `^20.19` 或 `>=22.12`（Vite 8 要求），npm 10+。

```bash
npm install
npm run dev       # 开发服务器，默认 http://localhost:5173
npm run build     # tsc 类型检查 + vite 生产构建，输出到 dist/
npm run preview   # 本地预览构建产物
npm run typecheck # 只做类型检查
```

开发服务器开启了 `host: true`，同一局域网内的手机可直接用电脑 IP 访问，方便真机验证 375px 布局。

## 目录结构

```
src/
├── app/                 # 应用外壳
│   ├── App.tsx          # BrowserRouter + 路由挂载 + 滚动复位 + 404
│   ├── routes.tsx       # 路由表（7 条，新增页面在这里注册）
│   ├── Layout.tsx       # 全局布局：顶部导航 + 内容区 + 页脚 + 底部导航
│   ├── Layout.css
│   └── flow.ts          # 三步流程的步骤名称 / 下标常量
├── components/          # 共享组件（每个组件与同名 .css 放在一起）
│   ├── Button.tsx       # 按钮
│   ├── Card.tsx         # 卡片容器
│   ├── Input.tsx        # 输入框（label / hint / error / 右侧 addon）
│   ├── StepIndicator.tsx# 三步进度条
│   ├── EmptyState.tsx   # 空状态
│   ├── icons.tsx        # 内联 SVG 图标（零外链）
│   └── index.ts         # 统一出口：import { Button, Card } from '../components'
├── pages/               # 7 个页面 + 各自的局部样式
│   ├── HomePage.tsx     # /
│   ├── UploadPage.tsx   # /upload
│   ├── ScenePage.tsx    # /scene
│   ├── ResultPage.tsx   # /result
│   ├── PricingPage.tsx  # /pricing
│   ├── LoginPage.tsx    # /login
│   └── WorksPage.tsx    # /works
├── styles/
│   ├── tokens.css       # 设计令牌（颜色 / 字号 / 间距 / 圆角 / 阴影 / 布局）
│   └── global.css       # 重置、排版、容器与栅格等全局工具类
├── main.tsx             # 入口
└── vite-env.d.ts
```

## 路由表

| 路由       | 页面         | 说明                                       |
| ---------- | ------------ | ------------------------------------------ |
| `/`        | HomePage     | 首页落地：hero、三步流程入口、阶段说明     |
| `/upload`  | UploadPage   | 流程第 1 步：上传商品图（拖放区占位）      |
| `/scene`   | ScenePage    | 流程第 2 步：选择风土场景与物料类型（空态）|
| `/result`  | ResultPage   | 流程第 3 步：生成结果（空态）              |
| `/pricing` | PricingPage  | 定价会员：三档套餐示例                     |
| `/login`   | LoginPage    | 登录：手机号 + 验证码 / 微信授权占位       |
| `/works`   | WorksPage    | 我的作品：空态                             |

未匹配路由由 `App.tsx` 内的兜底页承接。导航切换使用 React Router，浏览器前进/后退可用。

## 设计系统

所有视觉数值集中在 `src/styles/tokens.css`，组件与页面只引用变量，不写死色值 / 间距。

- 风土色系：沙土暖白（背景）、石榴红（主色 `--color-primary`）、葡萄紫（强调 `--color-accent`）、绿洲绿（成功 / 自然）、坚果棕（辅助）。
- 字号 `--text-xs` ~ `--text-hero`，间距 `--space-1` ~ `--space-16`（4px 基准），圆角 `--radius-xs` ~ `--radius-pill`，阴影 `--shadow-xs` ~ `--shadow-lg`。
- 语义变量（`--color-bg` / `--color-surface` / `--color-text` / `--color-border` …）与色板变量分离，换季或换肤时优先改语义层。
- 断点约定：`640px` 手机横向 / `900px` 切换顶部导航（隐藏底部导航）/ `1200px` 宽屏。布局变量：`--topbar-height`、`--bottomnav-height`，已含 iOS 安全区 `env(safe-area-inset-*)`。
- 组件样式与组件同目录（如 `components/Button.css`）。阶段二重写视觉时，**保留导出的 props、类型和类名前缀即可**。

## 组件契约

```tsx
import { Button, Card, Input, StepIndicator, EmptyState } from './components';

<Button variant="primary | secondary | ghost | accent" size="sm | md | lg"
        block loading icon={<UploadIcon size={18} />} onClick={...}>文字</Button>

<Card variant="elevated | outlined | soft" padding="none | sm | md | lg"
      interactive>内容</Card>

<Input label="手机号" hint="辅助说明" error="错误提示"
       inputSize="sm | md" addon={<Button size="sm">获取验证码</Button>} />

<StepIndicator steps={['上传商品图', '选择场景', '生成物料']} current={0} />

<EmptyState title="还没有作品" description="..." icon={<WorksIcon />} action={<Button>去制作</Button>} />
```

组件 props 均继承原生元素属性（`ButtonHTMLAttributes` / `HTMLAttributes` / `InputHTMLAttributes`），可直接传 `className`、`style`、`aria-*`。
图标从 `src/components/icons.tsx` 导入，全部为内联 SVG，新增图标请沿用同一模式。

## 给队友的功能接入点

| 要做的事 | 改哪里 | 建议做法 |
| --- | --- | --- |
| 选择照片 / 拍照 | `pages/UploadPage.tsx` 的 `.upload-drop` | 把占位区换成 `<input type="file" accept="image/*" capture>` 或微信 JSSDK 选图；替换后提醒用户压缩 |
| 场景与物料类型勾选 | `pages/ScenePage.tsx` | 用 `Card` / 自定义选项卡渲染场景列表；选中态写入表单/查询参数 |
| 生成与轮询结果 | `pages/ResultPage.tsx` | 生成请求与轮询放这里；空态换成加载骨架与结果网格 |
| 登录 / 微信授权 | `pages/LoginPage.tsx` | 表单 onSubmit 目前是 `preventDefault`，在此接登录接口；替换禁用的「待接入」按钮 |
| 定价与支付 | `pages/PricingPage.tsx` | 套餐数据抽成常量或接口；「登录后开通」跳转支付 |
| 作品列表 | `pages/WorksPage.tsx` | 空态旁接入列表与筛选、下载 |
| 新增页面 | `app/routes.tsx` + `app/Layout.tsx` | 路由表加一条；如需导航入口，在 `topNavItems` / `bottomNavItems` 增加项 |
| 接口层 | 新建 `src/lib/api/`（建议） | 统一封装 fetch、错误码与鉴权头；`import.meta.env.VITE_API_BASE_URL` 存后端地址 |
| 全局状态 | 新建 `src/store/`（建议） | 第一步做成「上传 → 场景 → 结果」的流程状态（Zustand 或 Context + useReducer 均可），不要塞进页面组件本地 state 互相传参 |
| 上传进度 / 全局提示 | 新建 `src/components/` 下的 Toast 等 | 保持并列导出到 `components/index.ts` |

约定：

- 不引入 UI 组件库与外部字体 / CDN 资源；图标继续用内联 SVG。
- 页面样式优先复用 `global.css` 的工具类（`.page`、`.page-head`、`.grid`、`.actions`、`.narrow`、`.muted`），局部样式放 `pages/*.css`。
- 每个页面最外层使用 `.page` + `.container`（Layout 已包一层 container，页面内不要再套）。
- 按钮做导航时用 `useNavigate()`；跨页数据建议走路由参数或全局 store，不要靠组件 props 串联。

## 已知限制

- 无 ESLint / 单元测试 / E2E 测试配置。
- 定价页金额为界面示例，最终由运营配置。
- 未做深色模式、国际化、PWA / Service Worker。
- 微信浏览器仅做了 viewport、安全区和触控尺寸的基础处理，JSSDK 能力（选图、分享、支付）待接入。