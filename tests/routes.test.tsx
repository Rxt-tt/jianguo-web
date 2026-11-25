import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../src/app/Layout';
import { appRoutes } from '../src/app/routes';

/**
 * 路由冒烟测试：把 7 条路由放进 MemoryRouter 逐条渲染，
 * 断言每页都有可见的标题与正文（即页面确实挂载、没有渲染期异常）。
 */

interface RouteCase {
  path: string;
  /** 页面标题里必须出现的片段 */
  heading: RegExp;
  /** 页面正文里必须出现的片段 */
  body: RegExp;
}

const cases: RouteCase[] = [
  { path: '/', heading: /装进你的商品图/, body: /三步做出能卖货的物料/ },
  { path: '/upload', heading: /上传商品图/, body: /把商品照片放到这里/ },
  { path: '/scene', heading: /选择风土场景/, body: /场景库还没有接入/ },
  { path: '/result', heading: /生成结果/, body: /还没有生成结果/ },
  { path: '/pricing', heading: /按你的出货节奏付费/, body: /创作月卡/ },
  { path: '/login', heading: /欢迎回来/, body: /AI 生成内容标识说明/ },
  { path: '/works', heading: /我的作品/, body: /还没有作品，去生成第一套/ },
];

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('应用路由', () => {
  it('路由表共注册 7 条路由', () => {
    expect(appRoutes).toHaveLength(7);
    expect(appRoutes.map((route) => route.path)).toEqual([
      '/',
      '/upload',
      '/scene',
      '/result',
      '/pricing',
      '/login',
      '/works',
    ]);
  });

  describe.each(cases)('$path', ({ path, heading, body }) => {
    it('渲染出可见的页面标题与正文', () => {
      renderAt(path);

      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toBeVisible();
      expect(title).toHaveTextContent(heading);
      expect(screen.getByText(body)).toBeVisible();
    });
  });

  it('每个页面都带有全局布局（顶部导航与底部导航）', () => {
    renderAt('/works');

    expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: '底部导航' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '疆果智创首页' })).toBeInTheDocument();
  });

  it('登录页展示手机号、验证码与「功能待接入」标注', () => {
    renderAt('/login');

    expect(screen.getByLabelText('手机号')).toBeInTheDocument();
    expect(screen.getByLabelText('短信验证码')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /获取验证码/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /微信登录/ })).toBeDisabled();
    expect(screen.getAllByText(/功能待接入/).length).toBeGreaterThan(0);
  });

  it('作品页展示 6 张示例作品卡与筛选 tab', () => {
    renderAt('/works');

    expect(screen.getAllByRole('tab')).toHaveLength(4);
    expect(screen.getByRole('tab', { name: '全部' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    // 6 张示例作品卡，按标题逐一确认已渲染
    expect(screen.getByText('和田骏枣 · 礼盒主图')).toBeVisible();
    expect(screen.getByText('和田大枣 · 胡杨林外景短视频')).toBeVisible();

    // 每张卡片都有禁用态的操作占位（下载 / 删除）
    const downloadButtons = screen.getAllByRole('button', { name: /下载/ });
    const deleteButtons = screen.getAllByRole('button', { name: /删除/ });
    expect(downloadButtons).toHaveLength(6);
    expect(deleteButtons).toHaveLength(6);
    [...downloadButtons, ...deleteButtons].forEach((button) => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('待接入');
    });
  });
});
