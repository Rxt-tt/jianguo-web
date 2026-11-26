# 全站全宽铺满布局改造报告

任务 ID：`task_03334b12e073` · 分支：`Rxt-tt/jianguo-fullwidth`

## 一、铺满实现方案

1. **全局容器令牌与流式留白（`src/styles/tokens.css`、`src/styles/global.css`）**
   - 将 `--container-max` 从 `1120px` 改为 `100%`，解除全站内容区的固定居中宽度上限。
   - 新增 `--container-padding: clamp(16px, 4vw, 72px)` 与 `--prose-max: 72ch` 令牌。
   - `.container` 保持 `width: 100%; max-width: var(--container-max)`，左右内边距统一由 `calc(var(--container-padding) + var(--safe-left / --safe-right))` 控制，实现 375px（16px 边距）到 1800px+（72px 边距）平滑过渡，文字不贴边、主内容区始终占视口宽度的 **91.5% ~ 94.4%**。
   - 移除 `.page-head` 与 `.works__head` 上的 `max-width: var(--container-narrow)` 限制，使标题区与页面主体同宽对齐；`body` 背景径向渐变改用 `max(..., 45~60vw)`，保证超宽屏背景过渡自然。
2. **顶部导航、页脚与移动端底栏（`src/app/Layout.css`）**
   - `.app-shell`、`.topbar`、`.app-main`、`.site-footer` 均显式铺满 `width: 100%`，`.bottomnav` 保持 `inset-inline: 0` 铺满移动端视口。
   - `>= 900px` 下 `.topnav` 使用 `margin-inline: auto` 居中分布，`.topbar__actions` 贴右，使 1440px / 1920px / 2560px 顶栏呈现「品牌左 / 导航中 / 操作右」的均衡全宽布局。
3. **各页面超宽屏栅格与比例适配（`Home.css`、`Upload.css`、`Scene.css`、`Result.css`、`Pricing.css`、`Login.css`、`Works.css`）**
   - **首页（`/`）**：`.home-hero` 在桌面端使用 `minmax(0, 1.15fr) minmax(0, 1fr)` 与 `clamp()` 自适应内边距、字号、海报高度和卡片间距；4 指标、3 步骤、4 风土场景与底部 CTA 均全宽铺满。
   - **上传页（`/upload`）**：`>= 1440px` 调整工作区与语音模块比例与间距，`.walnut-sample` 限制 `max-height: 360px` 并适当放大示例图避免超宽屏纵向过高；4 拍摄技巧卡全宽 4 列。
   - **场景页（`/scene`）**：4 列场景卡、3 列物料卡、3 列配音语种卡与汇总栏全宽铺满，`>= 1440px` 加大网格间距至 `var(--space-6)`。
   - **结果页（`/result`）**：`>= 1400px` 将 4 张物料卡切换为 4 列并排（`repeat(4, minmax(0, 1fr))`），合规提示条与 3 条三语配音轨全宽铺满。
   - **定价页（`/pricing`）**：4 列套餐卡、积分说明条与对比表全宽铺满，`>= 1440px` 恢复宽松卡片内边距与间距。
   - **登录页（`/login`）**：将桌面端右侧固定 `420px` 改为按比例全宽分栏 `minmax(0, 1.15fr) minmax(380px, 0.85fr)`，消除超宽屏中段大片留白。
   - **作品页（`/works`）**：`>= 1600px` 采用 `repeat(auto-fill, minmax(360px, 1fr))`（1920px 为 4 列、2560px 为 6 列一排），空状态与底部引导条全宽铺满且 CTA 按钮贴右对齐。

## 二、仍限制行宽的文字元素（超宽屏可读性）

区块、卡片网格与背景均完全铺满，仅对以下说明段落/辅助文案限制最大行宽：

| 文件 | 选择器 | 行宽上限 |
| --- | --- | --- |
| `src/styles/global.css` | `.page-desc` | `min(65ch, 100%)` |
| `src/components/EmptyState.css` | `.empty__desc`（保留原有） | `42ch` |
| `src/pages/Home.css` | `.home-desc` | `min(56ch, 100%)` |
| `src/pages/Home.css` | `.home-section__head > p` | `60ch` |
| `src/pages/Home.css` | `.home-step > p`, `.home-scene__copy > p` | `52ch` |
| `src/pages/Home.css` | `.home-cta p` | `65ch` |
| `src/pages/Home.css` | `.home-scene-note` | `var(--prose-max)` (`72ch`) |
| `src/pages/Upload.css` | `.upload-drop__desc` / `.upload-drop__hint` | `52ch` / `56ch` |
| `src/pages/Upload.css` | `.upload-sample-card__desc` / `.upload-voice__desc` | `60ch` / `65ch` |
| `src/pages/Upload.css` | `.upload-tip-card__desc` / `.upload-footer > p` | `48ch` / `var(--prose-max)` |
| `src/pages/Scene.css` | `.scene-card__desc` | `52ch` |
| `src/pages/Scene.css` | `.material-card__desc`, `.dubbing-card__desc` | `56ch` |
| `src/pages/Result.css` | `.result-notice__text`, `.result-footer > p` | `var(--prose-max)` (`72ch`) |
| `src/pages/Result.css` | `.result-card__caption`, `.dubbing-track__preview` | `56ch` |
| `src/pages/Pricing.css` | `.pricing-heading > p`, `.pricing-comparison__head p` | `min(56ch, 100%)` / `65ch` |
| `src/pages/Pricing.css` | `.pricing-credit-note p`, `.pricing-ui-note` | `var(--prose-max)` (`72ch`) |
| `src/pages/Login.css` | `.login__lead`, `.login__perks` | `min(56ch, 100%)` |
| `src/pages/Login.css` | `.login__compliance p` | `var(--prose-max)` (`72ch`) |
| `src/pages/Works.css` | `.works__filter-note`, `.works__empty-note`, `.works__cta p` | `var(--prose-max)` (`72ch`) |

## 三、验收与实测数据

- `npm run build`：通过（exit 0，`tsc -b && vite build` 零错误）
- `npm test`：11 / 11 通过（`tests/routes.test.tsx`）
- 无头浏览器（Edge Headless CDP）检查 7 条路由（`/`、`/upload`、`/scene`、`/result`、`/pricing`、`/login`、`/works`）× 4 档视口，控制台报错数：`0`：

| 视口宽度 | `scrollWidth === innerWidth`（全 7 页） | `.app-main .container` 宽度 | `.page` 内容宽（占比） | 左右内边距 | 导航 / 页脚 / 底栏宽度 |
| --- | --- | --- | --- | --- | --- |
| `375px` | 全部 `375 === 375`（无溢出） | `375px` (100%) | `343px` (**91.5%**) | `16px` | 顶栏 `375px` / 底栏 `375px` |
| `1440px` | 全部 `1440 === 1440`（无溢出） | `1440px` (100%) | `1325px` (**92.0%**) | `58px` | 顶栏 `1440px` / 页脚 `1440px` |
| `1920px` | 全部 `1920 === 1920`（无溢出） | `1920px` (100%) | `1776px` (**92.5%**) | `72px` | 顶栏 `1920px` / 页脚 `1920px` |
| `2560px` | 全部 `2560 === 2560`（无溢出） | `2560px` (100%) | `2416px` (**94.4%**) | `72px` | 顶栏 `2560px` / 页脚 `2560px` |

- 截图交付：
  - `screenshots/fullwidth-2560.png`
  - `screenshots/fullwidth-1920.png`
  - `screenshots/fullwidth-1440.png`
  - `screenshots/mobile-375.png`
