import { useNavigate } from 'react-router-dom';
import { Button, Card, StepIndicator, UploadIcon } from '../components';
import { FLOW_STEPS, FLOW_STEP_INDEX } from '../app/flow';
import './Upload.css';

export function UploadPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <StepIndicator steps={FLOW_STEPS} current={FLOW_STEP_INDEX.upload} />

      <div className="page-head">
        <span className="eyebrow">第 1 步 / 共 3 步</span>
        <h1 className="page-title">上传商品图</h1>
        <p className="page-desc">
          用手机直接拍，或从相册选一张清晰的商品照片。建议光线充足、背景干净，
          后面生成的物料会以这张图为主体。
        </p>
      </div>

      <Card variant="outlined" padding="lg">
        <div className="upload-drop">
          <span className="upload-drop__icon">
            <UploadIcon size={28} />
          </span>
          <h2 className="upload-drop__title">把商品照片放到这里</h2>
          <p className="upload-drop__desc">
            支持 JPG / PNG / HEIC，单张不超过 10MB，建议正面拍摄。
          </p>
          <Button disabled>选择照片（待接入）</Button>
          <p className="upload-drop__hint small">
            界面阶段不读取文件，上传能力由后续阶段接入。
          </p>
        </div>
      </Card>

      <ul className="upload-tips">
        <li>自然光下拍摄，避免大片阴影</li>
        <li>背景干净，突出商品本身</li>
        <li>一张图只放一个主商品</li>
      </ul>

      <div className="actions actions--mobile-stack">
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
        >
          返回首页
        </Button>
        <Button onClick={() => navigate('/scene')}>下一步：选择场景</Button>
      </div>
      <p className="small muted">
        演示用：尚未上传照片也可以继续浏览后续页面。
      </p>
    </div>
  );
}