import { useNavigate } from 'react-router-dom';
import { Button, EmptyState, SceneIcon, StepIndicator } from '../components';
import { FLOW_STEPS, FLOW_STEP_INDEX } from '../app/flow';

export function ScenePage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <StepIndicator steps={FLOW_STEPS} current={FLOW_STEP_INDEX.scene} />

      <div className="page-head">
        <span className="eyebrow">第 2 步 / 共 3 步</span>
        <h1 className="page-title">选择风土场景</h1>
        <p className="page-desc">
          挑一处新疆风土作背景，再决定要主图、种草图文还是短视频。
          场景库与物料类型将在下一阶段按视觉稿接入。
        </p>
      </div>

      <EmptyState
        icon={<SceneIcon size={26} />}
        title="场景库还没有接入"
        description="胡杨林、葡萄架、巴扎摊位等风土场景，以及主图 / 种草图文 / 短视频的物料类型，会在这里以卡片形式供商家勾选。"
      />

      <div className="actions actions--mobile-stack">
        <Button variant="secondary" onClick={() => navigate('/upload')}>
          上一步：重新上传
        </Button>
        <Button onClick={() => navigate('/result')}>
          下一步：查看生成结果
        </Button>
      </div>
      <p className="small muted">演示用：当前未做选择也可以继续浏览生成结果页。</p>
    </div>
  );
}