import { useNavigate } from 'react-router-dom';
import { Button, EmptyState, ImageIcon, StepIndicator } from '../components';
import { FLOW_STEPS, FLOW_STEP_INDEX } from '../app/flow';

export function ResultPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <StepIndicator steps={FLOW_STEPS} current={FLOW_STEP_INDEX.result} />

      <div className="page-head">
        <span className="eyebrow">第 3 步 / 共 3 步</span>
        <h1 className="page-title">生成结果</h1>
        <p className="page-desc">
          生成完成后，主图、种草图文与短视频会按物料类型分栏展示，
          可单张预览、批量下载或重新生成。
        </p>
      </div>

      <EmptyState
        icon={<ImageIcon size={26} />}
        title="还没有生成结果"
        description="先上传商品图并选择风土场景，生成结果会出现在这里。当前阶段只展示空状态，不发起生成请求。"
        action={
          <Button variant="secondary" onClick={() => navigate('/scene')}>
            去选择场景
          </Button>
        }
      />

      <div className="actions actions--mobile-stack actions--end">
        <Button variant="ghost" onClick={() => navigate('/works')}>
          查看我的作品
        </Button>
        <Button variant="secondary" onClick={() => navigate('/pricing')}>
          查看会员定价
        </Button>
      </div>
    </div>
  );
}