import { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Button, EmptyState } from '../components';
import { Layout } from './Layout';
import { appRoutes } from './routes';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <EmptyState
        title="这个页面还不存在"
        description="地址可能有误。回到首页，或者直接从上传商品图开始。"
        action={<Button onClick={() => navigate('/')}>回到首页</Button>}
      />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}