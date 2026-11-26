import type { ComponentType } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  BrandMark,
  HomeIcon,
  PricingIcon,
  UploadIcon,
  UserIcon,
  WorksIcon,
  type IconProps,
} from '../components';
import './Layout.css';

interface TopNavItem {
  to: string;
  label: string;
  end?: boolean;
}

interface BottomNavItem extends TopNavItem {
  icon: ComponentType<IconProps>;
}

const topNavItems: TopNavItem[] = [
  { to: '/', label: '首页', end: true },
  { to: '/upload', label: '上传' },
  { to: '/works', label: '我的作品' },
  { to: '/pricing', label: '定价' },
];

const bottomNavItems: BottomNavItem[] = [
  { to: '/', label: '首页', icon: HomeIcon, end: true },
  { to: '/upload', label: '制作', icon: UploadIcon },
  { to: '/works', label: '作品', icon: WorksIcon },
  { to: '/pricing', label: '定价', icon: PricingIcon },
  { to: '/login', label: '我的', icon: UserIcon },
];

const navLinkClass = (base: string) => ({ isActive }: { isActive: boolean }) =>
  isActive ? `${base} is-active` : base;

export function Layout() {
  const year = new Date().getFullYear();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar__inner">
          <NavLink to="/" className="brand" aria-label="疆果智创首页">
            <BrandMark className="brand__mark" size={30} />
            <span className="brand__name">疆果智创</span>
            <span className="brand__tag">AIGC 农特产营销</span>
          </NavLink>

          <nav className="topnav" aria-label="主导航">
            {topNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass('topnav__link')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="topbar__actions">
            <NavLink to="/login" className={navLinkClass('topbar__login')}>
              登录
            </NavLink>
            <NavLink to="/upload" className="topbar__cta">
              开始制作
            </NavLink>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>© {year} 疆果智创 · 当前为界面预览阶段</p>
          <p>主图 / 种草图文 / 短视频 · 让新疆风土为产品说话</p>
        </div>
      </footer>

      <nav className="bottomnav" aria-label="底部导航">
        {bottomNavItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={navLinkClass('bottomnav__link')}
          >
            <Icon className="bottomnav__icon" size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}