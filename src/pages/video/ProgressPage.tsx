import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CheckIcon,
  SparklesIcon,
  StepIndicator,
  WorksIcon,
} from '../../components';
import './ProgressPage.css';

const VIDEO_STEPS = ['剧本', '分镜', '生成', '成品'] as const;

type TaskState = 'done' | 'running' | 'waiting';

interface ProgressStage {
  id: string;
  title: string;
  statusLabel: string;
  state: TaskState;
  detail: string;
  percent?: number;
}

const PROGRESS_STAGES: readonly ProgressStage[] = [
  {
    id: 'script',
    title: '剧本',
    statusLabel: '已完成',
    state: 'done',
    detail: '15 秒三段式带货脚本已锁定，违禁词审核通过。',
  },
  {
    id: 'keyframes',
    title: '关键帧',
    statusLabel: '已完成',
    state: 'done',
    detail: '4 张 9:16 新疆风土关键帧构图已确认。',
  },
  {
    id: 'synthesis',
    title: '视频合成',
    statusLabel: '进行中 62%',
    state: 'running',
    detail: '正在渲染镜头运镜、光影过渡与 1080×1920 竖屏画面。',
    percent: 62,
  },
  {
    id: 'dubbing',
    title: '三语配音',
    statusLabel: '等待',
    state: 'waiting',
    detail: '视频合成完成后，将同步生成汉语、维吾尔语、哈萨克语配音与字幕。',
  },
];

function ClockSvg() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

function BellSvg() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16S18 14 18 9Z" />
      <path d="M10.2 19a2 2 0 0 0 3.6 0" />
    </svg>
  );
}

export function ProgressPage() {
  const navigate = useNavigate();

  return (
    <div className="page vprog-page">
      <StepIndicator steps={VIDEO_STEPS} current={2} label="AI 宣传视频制作进度" />

      <div className="page-head">
        <span className="eyebrow">
          <SparklesIcon size={14} />
          AI 宣传视频 · 第 3 步 / 共 4 步
        </span>
        <h1 className="page-title">视频正在生成中</h1>
        <p className="page-desc">
          云端正在为您合成「新疆阿克苏纸皮核桃」15 秒宣传视频并排期三语配音，当前为静态进度界面演示。
        </p>
      </div>

      {/* 整体进度概览卡 */}
      <Card variant="elevated" padding="lg" className="vprog-hero">
        <div className="vprog-hero__visual" aria-hidden="true">
          <div className="vprog-preview">
            <span className="vprog-preview__badge">9:16 合成中</span>
            <div className="vprog-preview__ring">
              <span className="vprog-preview__pct">62%</span>
            </div>
            <span className="vprog-preview__label">视频合成阶段</span>
          </div>
        </div>

        <div className="vprog-hero__content">
          <div className="vprog-hero__top">
            <div>
              <span className="badge">正在合成 · 第 3 / 4 环节</span>
              <h2 className="vprog-hero__title">新疆阿克苏纸皮核桃 · 15 秒竖屏宣传片</h2>
            </div>
            <span className="vprog-hero__percent" aria-label="当前总进度 62%">
              62%
            </span>
          </div>

          <div
            className="vprog-bar"
            role="progressbar"
            aria-label="视频生成总进度"
            aria-valuenow={62}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className="vprog-bar__fill" style={{ width: '62%' }} />
          </div>

          <div className="vprog-meta">
            <span className="vprog-meta__item">
              <ClockSvg />
              <strong>预计剩余时间：约 35 秒</strong>
            </span>
            <span className="vprog-meta__sep" aria-hidden="true">
              ·
            </span>
            <span className="vprog-meta__item muted">总预估约 90 秒 · 消耗 28 积分</span>
            <span className="vprog-meta__sep" aria-hidden="true">
              ·
            </span>
            <span className="vprog-meta__item muted">汉 / 维 / 哈三语配音</span>
          </div>

          <aside className="vprog-leave" aria-label="可离开页面提示">
            <span className="vprog-leave__icon">
              <BellSvg />
            </span>
            <p className="vprog-leave__text">
              <strong>可以放心离开此页面：</strong>
              视频合成将在后台持续进行，完成后会通过微信通知您，并自动存入「我的作品」。
            </p>
          </aside>
        </div>
      </Card>

      {/* 四步详细进度 */}
      <section className="vprog-section" aria-labelledby="vprog-stages-title">
        <div className="vprog-section__head">
          <h2 id="vprog-stages-title" className="section-title">
            生成环节进度
          </h2>
          <span className="small muted">4 个环节按顺序自动推进</span>
        </div>

        <ol className="vprog-stages">
          {PROGRESS_STAGES.map((stage, index) => (
            <li key={stage.id} className={`vprog-stage vprog-stage--${stage.state}`}>
              <div className="vprog-stage__head">
                <span className="vprog-stage__dot" aria-hidden="true">
                  {stage.state === 'done' ? <CheckIcon size={15} /> : index + 1}
                </span>
                <div className="vprog-stage__titles">
                  <h3 className="vprog-stage__name">{stage.title}</h3>
                  <span className={`vprog-stage__status vprog-stage__status--${stage.state}`}>
                    {stage.state === 'done' ? '✓ 已完成' : stage.statusLabel}
                  </span>
                </div>
              </div>

              <p className="vprog-stage__detail">{stage.detail}</p>

              {typeof stage.percent === 'number' && (
                <div className="vprog-stage__meter" aria-hidden="true">
                  <span
                    className="vprog-stage__meter-fill"
                    style={{ width: `${stage.percent}%` }}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* 底部操作 */}
      <Card variant="soft" padding="md" className="vprog-footer">
        <div className="vprog-footer__info">
          <p className="vprog-footer__title">先去看看其他作品，稍后回来收成品</p>
          <p className="small muted">
            当前为界面演示（不执行真实轮询），可先跳转作品列表，或
            <Link to="/video/result" className="vprog-preview-link">
              直接预览成品页
            </Link>
            。
          </p>
        </div>

        <div className="actions actions--mobile-stack vprog-footer__actions">
          <Button variant="secondary" disabled>
            取消生成（待接入）
          </Button>
          <Button
            size="lg"
            icon={<WorksIcon size={18} />}
            onClick={() => navigate('/works')}
          >
            先去逛逛
          </Button>
        </div>
      </Card>
    </div>
  );
}
