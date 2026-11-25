# 阶段二（dsh）交付报告：登录页 + 我的作品 + 测试骨架

任务 ID：`task_c84c60cd7c9b`　工作区：`C:\Users\热西提\orca\workspaces\web\jianguo-account`（分支 `jianguo-account`）

## 一、结论

两页 UI 与测试骨架全部完成，验收项均通过：`npm run build` 成功、`npm test` 11/11 通过、
375px 与 1440px 两页整页截图齐备、两页均无横向溢出（`scrollWidth === clientWidth`）、
浏览器控制台无任何 error 记录。本轮只做页面视觉，未写任何登录、请求、支付或持久化逻辑。

## 二、构建输出（`npm run build`，exit 0）

```
> jianguo-web@0.1.0 build
> tsc -b && vite build

vite v8.3.8 building client environment for production...
transforming...
✓ 51 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.06 kB │ gzip:  0.71 kB
dist/assets/index-CaxArIUf.css   32.03 kB │ gzip:  6.94 kB
dist/assets/index-Oo27qbto.js   285.80 kB │ gzip: 90.79 kB

✓ built in 135ms
```

`tsc -b` 阶段零错误（严格模式 + `noUnusedLocals` 全开）。

## 三、测试输出（`npm test`，exit 0）

```
> jianguo-web@0.1.0 test
> vitest run

 RUN  v5.1.1 C:/Users/热西提/orca/workspaces/web/jianguo-account

 ✓ tests/routes.test.tsx (11 tests) 216ms

 Test Files  1 passed (1)
      Tests  11 passed (11)
   Duration  1.12s (environment 52%, tests 22%, setup 14%, transform 6%, import 4%, worker 1%)
```

覆盖内容：路由表 7 条注册校验；7 条路由逐条用 `MemoryRouter` 渲染并断言可见 `h1` 与页面正文；
全局布局（主导航 / 底部导航 / 品牌链接）；登录页手机号与验证码字段、「获取验证码」「微信登录」
两个禁用按钮、`功能待接入` 标注；作品页 4 个 tab 与默认选中态、6 张作品卡标题、
12 个禁用操作按钮（每卡「下载」「删除」）且文案含「待接入」。

## 四、交付文件清单

新增：

- `src/pages/Works.css`
- `tests/setup.ts`（注册 `@testing-library/jest-dom`，每例后 `cleanup()`）
- `tests/routes.test.tsx`
- `screenshots/login-375.png`、`login-1440.png`、`works-375.png`、`works-1440.png`
  （另附 `login-375-viewport.png`、`works-375-viewport.png` 两张首屏视口图）
- `screenshots/REPORT.md`（本文件）

修改（均在允许范围内）：

- `src/pages/LoginPage.tsx`、`src/pages/Login.css`
- `src/pages/WorksPage.tsx`
- `vite.config.ts`（仅新增 `test` 段，构建配置原样保留）
- `package.json`（新增 `"test": "vitest run"` 与 5 个 devDependencies）
- `package-lock.json`（由上述安装产生）

未触碰：`src/styles/tokens.css`、`src/components/**`、`src/app/Layout.tsx`、`src/app/routes.tsx`
及其他页面文件（`git status` 可复核）。

## 五、页面实现要点

### `/login`

- 品牌标识（`BrandMark`）+ 欢迎语；900px 起左右两栏（左文案 / 右表单卡），375px 单列。
- 手机号、短信验证码均用共享 `Input`（`addon` 挂「获取验证码」）；`form onSubmit` 只 `preventDefault`。
- 「登录」「获取验证码」「微信登录」全部禁用，并各自标注「功能待接入」。
- 微信图标为内联 SVG（自定义 `WeChatIcon`），零外链。
- 用户协议 / 隐私政策勾选为受控 checkbox，链接指向本页（`/login`），仅视觉。
- 合规块：绿洲绿底的「AI 生成内容标识说明」，说明合成内容会带显式标识。

### `/works`

- 顶部 4 个 tab（全部 / 主图 / 图文 / 视频），`role="tablist"` + `aria-selected`，
  切换只改选中态（`useState`），不改列表，并在说明文字里点明「功能待接入」。
- 6 张示例作品卡：`Card padding="none"` + 4:3 纯 CSS 渐变缩略图（6 套风土配色 +
  `clip-path` 山形剪影 + 场景胶囊 + 类型徽标；视频卡另有播放角标），正文含标题、时间、类型。
- 每卡「下载（待接入）」「删除（待接入）」两个禁用按钮。
- 空状态用共享 `EmptyState`：「还没有作品，去生成第一套」+「去上传商品图」按钮，
  点击 `navigate('/upload')`（已实测跳转到 `/upload`）。

## 六、验收证据

| 项 | 结果 |
| --- | --- |
| `npm run build` | 通过（exit 0） |
| `npm test` | 11 passed / 11（exit 0） |
| 375 截图 | `screenshots/login-375.png`、`screenshots/works-375.png` |
| 1440 截图 | `screenshots/login-1440.png`、`screenshots/works-1440.png` |
| 横向溢出 | 375：`scrollWidth 375 / clientWidth 375`；1440：`1440 / 1440`；作品页 1440 因滚动条 `1425 / 1425`，均未溢出 |
| 控制台 | `orca console` 返回 `entries: []`，两页零报错 |

交互抽查：点击「图文」tab 后 `aria-selected` 转移、`.works-tab.is-active` 变为「图文」；
点击空状态按钮后 `location.pathname === '/upload'`。

## 七、已知不足 / 待接入

1. **筛选是纯视觉的**：切 tab 不过滤列表，页面已用文案说明；真实筛选需接数据源。
2. **示例数据写死在页面里**：6 条作品、场景名、时间均为常量，接入接口时应抽成
   `src/lib/api` 的返回结构，并补加载 / 空 / 错误三态。
3. **协议链接指向本页**：`/login` 没有独立的协议与隐私页，链接暂指自身，正式条款需新增路由。
4. **验证码按钮未做倒计时**：现在是永久禁用占位，接短信后需要 60s 倒计时与手机号校验。
5. **勾选状态不参与登录**：`agreed` 只控制视觉，未做「未勾选禁止提交」的校验（无提交逻辑）。
6. **截图的两点取舍**：移动端整页图用了截图专用的内联样式把吸顶导航改为静态、隐藏固定底栏，
   否则 Chromium 整页截图会把 `position: fixed` 元素重复绘制在长图里；
   真实交互下布局仍是吸顶 + 固定底栏，首屏视口图 `*-375-viewport.png` 保留了真实样子。
7. **`vite.config.ts` 加了 `test.env.NODE_ENV='test'`**：本机全局 `NODE_ENV=production`，
   会让 React 走生产构建（`React.act` 缺失），Testing Library 直接报
   `React.act is not a function`；显式指定后解决，属于环境适配而非降级。
8. **本机 npm 全局 `omit=dev`**：首次 `npm install` 只装了 10 个包，devDependencies 被跳过，
   需 `npm install --include=dev` 才能装到 vitest；CI 上如遇同样配置要留意。
9. 未加 ESLint、E2E、可访问性断言（仅断言了 role / aria-selected / disabled 等基础语义）。
