import type { ReactElement } from 'react';
import { HomePage } from '../pages/HomePage';
import { UploadPage } from '../pages/UploadPage';
import { ScenePage } from '../pages/ScenePage';
import { ResultPage } from '../pages/ResultPage';
import { PricingPage } from '../pages/PricingPage';
import { LoginPage } from '../pages/LoginPage';
import { WorksPage } from '../pages/WorksPage';

export interface AppRoute {
  path: string;
  element: ReactElement;
}

/** 应用路由表；Layout 作为父路由渲染，所有页面共用顶部 / 底部导航 */
export const appRoutes: AppRoute[] = [
  { path: '/', element: <HomePage /> },
  { path: '/upload', element: <UploadPage /> },
  { path: '/scene', element: <ScenePage /> },
  { path: '/result', element: <ResultPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/works', element: <WorksPage /> },
];