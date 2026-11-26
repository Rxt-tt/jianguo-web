import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  Button,
  Card,
  SparklesIcon,
  StepIndicator,
  UploadIcon,
} from '../components';
import { FLOW_STEPS, FLOW_STEP_INDEX } from '../app/flow';
import './Upload.css';

interface PhotoTip {
  id: string;
  title: string;
  desc: string;
  tone: 'sun' | 'clean' | 'text' | 'glare';
}

const PHOTO_TIPS: readonly PhotoTip[] = [
  {
    id: 'light',
    title: '自然光',
    desc: '靠近窗边或户外柔和日光，减少偏色与生硬阴影。',
    tone: 'sun',
  },
  {
    id: 'background',
    title: '干净背景',
    desc: '纯色墙面或素净木桌最佳，让商品主体一眼突出。',
    tone: 'clean',
  },
  {
    id: 'label',
    title: '包装文字清晰',
    desc: '正面平拍并轻点对焦，产地与品名字迹清楚不糊。',
    tone: 'text',
  },
  {
    id: 'glare',
    title: '避免反光',
    desc: '铝箔或透明袋可微调角度，避开灯光直射发白。',
    tone: 'glare',
  },
];

function CameraSvg() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8.5a2 2 0 0 1 2-2h2.2l1.4-2h4.8l1.4 2H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  );
}

function TipIcon({ tone }: { tone: PhotoTip['tone'] }) {
  if (tone === 'sun') {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3.2v2.2M12 18.6v2.2M3.2 12h2.2M18.6 12h2.2M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5" />
      </svg>
    );
  }
  if (tone === 'clean') {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 12h6M12 9v6" />
      </svg>
    );
  }
  if (tone === 'text') {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 7V5h14v2" />
        <path d="M12 5v14" />
        <path d="M9 19h6" />
      </svg>
    );
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3.5 19.5 12 12 20.5 4.5 12 12 3.5Z" />
      <path d="m4.5 4.5 15 15" />
    </svg>
  );
}

/** 纯 CSS 渐变 + 内联 SVG 绘制的「一袋核桃」示例图，零外链资源 */
function WalnutBagSample() {
  return (
    <div className="walnut-sample" role="img" aria-label="示例图：一袋新疆阿克苏纸皮核桃">
      <div className="walnut-sample__light" aria-hidden="true" />
      <div className="walnut-sample__frame-corner walnut-sample__frame-corner--tl" aria-hidden="true" />
      <div className="walnut-sample__frame-corner walnut-sample__frame-corner--tr" aria-hidden="true" />
      <div className="walnut-sample__frame-corner walnut-sample__frame-corner--bl" aria-hidden="true" />
      <div className="walnut-sample__frame-corner walnut-sample__frame-corner--br" aria-hidden="true" />

      <svg
        className="walnut-sample__svg"
        viewBox="0 0 220 220"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="kraftBag" x1="56" y1="30" x2="168" y2="194" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e5cca5" />
            <stop offset="55%" stopColor="#d2ae7e" />
            <stop offset="100%" stopColor="#b98f5c" />
          </linearGradient>
          <linearGradient id="bagShadow" x1="110" y1="184" x2="110" y2="204" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#63452a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#63452a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bagWindow" x1="76" y1="114" x2="144" y2="166" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fcf8f1" />
            <stop offset="100%" stopColor="#edddc4" />
          </linearGradient>
          <radialGradient id="walnutShell" cx="0.38" cy="0.32" r="0.72">
            <stop offset="0%" stopColor="#d9b282" />
            <stop offset="65%" stopColor="#9f7245" />
            <stop offset="100%" stopColor="#6c4928" />
          </radialGradient>
        </defs>

        {/* 桌面投影 */}
        <ellipse cx="110" cy="192" rx="64" ry="11" fill="url(#bagShadow)" />

        {/* 自立牛皮纸袋主体 */}
        <path
          d="M66 34h88l10 144c.7 9.6-6.9 17.5-16.5 17.5H72.5c-9.6 0-17.2-7.9-16.5-17.5L66 34Z"
          fill="url(#kraftBag)"
          stroke="#8e6840"
          strokeWidth="1.5"
        />
        {/* 封口压边与撕口线 */}
        <path d="M65 50h90" stroke="#9d7448" strokeWidth="1.4" strokeDasharray="4 3" />
        <rect x="97" y="40" width="26" height="4.5" rx="2.25" fill="#fcf8f1" opacity="0.78" />
        {/* 袋身侧边高光 */}
        <path d="M74 56 67 176" stroke="#fcf8f1" strokeWidth="2.4" strokeLinecap="round" opacity="0.32" />

        {/* 包装红标 */}
        <rect x="76" y="62" width="68" height="42" rx="8" fill="#fcf8f1" opacity="0.96" />
        <rect x="76" y="62" width="68" height="10" rx="4" fill="#bf3a2f" />
        {/* 菱形民族纹点缀 */}
        <path d="M110 64.6 113 67l-3 2.4-3-2.4 3-2.4Z" fill="#fcf8f1" />
        <rect x="87" y="79" width="46" height="6" rx="3" fill="#4a3f34" opacity="0.82" />
        <rect x="94" y="90" width="32" height="4.5" rx="2.25" fill="#bf3a2f" opacity="0.7" />

        {/* 透明可视窗口 + 纸皮核桃 */}
        <rect
          x="74"
          y="114"
          width="72"
          height="52"
          rx="14"
          fill="url(#bagWindow)"
          stroke="#b98f5c"
          strokeWidth="1.5"
        />

        {/* 核桃 1 */}
        <g transform="translate(82 124)">
          <ellipse cx="14" cy="15" rx="13" ry="12" fill="url(#walnutShell)" />
          <path d="M14 4c-1.5 6.5-1.5 15.5 0 22" stroke="#5a3b1f" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M7 11c2.5 1.5 3.5 5 1 8M21 11c-2.5 1.5-3.5 5-1 8" stroke="#e9cfa8" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* 核桃 2 */}
        <g transform="translate(107 121)">
          <ellipse cx="15" cy="16" rx="13.5" ry="12.5" fill="url(#walnutShell)" />
          <path d="M15 4.5c-1.6 7-1.6 16 0 23" stroke="#5a3b1f" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8 12c2.5 1.6 3.5 5.2 1 8.5M22 12c-2.5 1.6-3.5 5.2-1 8.5" stroke="#e9cfa8" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* 核桃 3（前排居中） */}
        <g transform="translate(95 135)">
          <ellipse cx="15" cy="14" rx="13" ry="11.5" fill="url(#walnutShell)" />
          <path d="M15 3.5c-1.4 6.2-1.4 14.8 0 21" stroke="#5a3b1f" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8.5 10.5c2.2 1.4 3 4.8.8 7.5M21.5 10.5c-2.2 1.4-3 4.8-.8 7.5" stroke="#f2dec0" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
        </g>

        {/* 袋外散落一颗核桃增加真实层次 */}
        <g transform="translate(152 167)">
          <ellipse cx="13" cy="12" rx="11.5" ry="10.2" fill="url(#walnutShell)" />
          <path d="M13 2.8c-1.2 5.4-1.2 13 0 18.4" stroke="#5a3b1f" strokeWidth="1.3" strokeLinecap="round" />
        </g>

        {/* 底部净含量占位线 */}
        <rect x="92" y="175" width="36" height="4" rx="2" fill="#fcf8f1" opacity="0.55" />
      </svg>

      <span className="walnut-sample__tag">示例原图 · 1 袋核桃</span>
    </div>
  );
}

export function UploadPage() {
  const navigate = useNavigate();

  return (
    <div className="page upload-page">
      <StepIndicator steps={FLOW_STEPS} current={FLOW_STEP_INDEX.upload} />

      <div className="page-head">
        <span className="eyebrow">
          <SparklesIcon size={14} />
          第 1 步 / 共 3 步
        </span>
        <h1 className="page-title">上传商品图</h1>
        <p className="page-desc">
          用手机拍一张清晰的干果或农特产照片，后续将保留包装细节并自动融入新疆风土场景。
        </p>
      </div>

      <section className="upload-workspace" aria-label="上传区与参考示例">
        <Card variant="elevated" padding="lg" className="upload-drop-card">
          <div className="upload-drop" role="region" aria-label="商品图上传占位区">
            <div className="upload-drop__badge-wrap">
              <span className="upload-drop__icon">
                <UploadIcon size={28} />
              </span>
              <span className="badge">支持拍照 / 拖拽</span>
            </div>

            <div className="upload-drop__copy">
              <h2 className="upload-drop__title">
                点击拍照或上传商品图（功能待接入）
              </h2>
              <p className="upload-drop__desc">
                支持 JPG / PNG / HEIC 格式，单张不超过 10MB。建议单品正面平拍，主体居中。
              </p>
            </div>

            <div className="upload-drop__buttons">
              <Button disabled icon={<CameraSvg />}>
                手机拍照（待接入）
              </Button>
              <Button variant="secondary" disabled icon={<UploadIcon size={17} />}>
                相册选取（待接入）
              </Button>
            </div>

            <p className="upload-drop__hint">
              界面预览阶段不触发文件选择，可直接点击下方按钮体验后续步骤。
            </p>
          </div>
        </Card>

        <Card variant="soft" padding="md" className="upload-sample-card">
          <div className="upload-sample-card__head">
            <span className="badge badge--success">拍摄示范</span>
            <span className="upload-sample-card__meta">正面 · 自然光</span>
          </div>

          <WalnutBagSample />

          <div className="upload-sample-card__body">
            <h2 className="upload-sample-card__title">一袋阿克苏纸皮核桃</h2>
            <p className="upload-sample-card__desc">
              商品占画面约 60%，浅色纯背景与柔和侧光，能显著提升 AI 融合后的真实质感。
            </p>
          </div>
        </Card>
      </section>

      <section className="upload-tips-section" aria-labelledby="upload-tips-title">
        <div className="upload-tips-section__head">
          <h2 id="upload-tips-title" className="section-title">
            4 个实用拍摄技巧
          </h2>
          <p className="small muted">原图越清晰，生成的电商主图和种草图越自然</p>
        </div>

        <ul className="upload-tips-grid">
          {PHOTO_TIPS.map((tip) => (
            <li key={tip.id} className="upload-tip-card">
              <span className={`upload-tip-card__icon upload-tip-card__icon--${tip.tone}`}>
                <TipIcon tone={tip.tone} />
              </span>
              <div className="upload-tip-card__content">
                <h3 className="upload-tip-card__title">{tip.title}</h3>
                <p className="upload-tip-card__desc">{tip.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="upload-footer">
        <div className="actions actions--mobile-stack upload-footer__actions">
          <Button variant="secondary" onClick={() => navigate('/')}>
            返回首页
          </Button>
          <Button
            size="lg"
            icon={<ArrowRightIcon size={18} />}
            onClick={() => navigate('/scene')}
          >
            下一步：选择场景
          </Button>
        </div>
        <p className="small muted">
          演示说明：当前未接入上传接口，可直接进入第 2 步查看风土场景与物料选项。
        </p>
      </footer>
    </div>
  );
}
