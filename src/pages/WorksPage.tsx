import { useNavigate } from 'react-router-dom';
import { Button, EmptyState, WorksIcon } from '../components';

export function WorksPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">我的空间</span>
        <h1 className="page-title">我的作品</h1>
        <p className="page-desc">
          生成的图片与视频会集中在这里，按时间倒序排列，方便下载和复用。
        </p>
      </div>

      <EmptyState
        icon={<WorksIcon size={26} />}
        title="还没有作品"
        description="上传第一张商品图，几分钟后就能在这里看到成品。作品列表、筛选与下载能力由后续阶段接入。"
        action={
          <Button onClick={() => navigate('/upload')}>去制作第一份物料</Button>
        }
      />

      <p className="small muted">当前不保存任何数据，刷新后仍为空状态。</p>
    </div>
  );
}