import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  Button,
  Card,
  SceneIcon,
  SparklesIcon,
  StepIndicator,
} from '../../components';
import './StoryboardPage.css';

const VIDEO_STEPS = ['剧本', '分镜', '生成', '成品'] as const;

type FrameId = 'f1' | 'f2' | 'f3' | 'f4';

interface StoryboardFrame {
  id: FrameId;
  index: string;
  timeRange: string;
  title: string;
  camera: string;
  desc: string;
  caption: string;
}

const STORYBOARD_FRAMES: readonly StoryboardFrame[] = [
  {
    id: 'f1',
    index: '01',
    timeRange: '0–3 秒',
    title: '开场 · 手捏破壳特写',
    camera: '微距俯拍 · 暖金侧逆光',
    desc: '特写手捏阿克苏纸皮核桃轻松开壳，饱满果仁随日光微亮，前 3 秒抓住注意力。',
    caption: '「轻轻一捏壳就开」',
  },
  {
    id: 'f2',
    index: '02',
    timeRange: '3–6 秒',
    title: '产地 · 天山绿洲果园',
    camera: '缓推远景 · 清晨柔光',
    desc: '远景呈现新疆阿克苏核桃林与远山轮廓，交代天山雪水与充足日照的产地信任背书。',
    caption: '「天山雪水 · 自然晒干」',
  },
  {
    id: 'f3',
    index: '03',
    timeRange: '6–10 秒',
    title: '质感 · 木案剥仁慢镜',
    camera: '45° 桌面特写 · 焦糖暖调',
    desc: '深色木案上剥出完整核桃仁并撒落脆碎细节，强化原香酥脆、无添加的食欲感。',
    caption: '「满口原香 · 颗颗饱满」',
  },
  {
    id: 'f4',
    index: '04',
    timeRange: '10–15 秒',
    title: '收尾 · 礼盒直发定格',
    camera: '居中定格 · 留白下单位',
    desc: '石榴红丝带礼盒与产地鲜果同框定格，底部预留电商挂车与字幕安全区。',
    caption: '「新果现摘 · 产地直发」',
  },
];

function RefreshSvg() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 11a8 8 0 1 0 2 5.3" />
      <path d="M20 4.5V11h-6.5" />
    </svg>
  );
}

function CoinsSvg() {
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
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.8v8.4M9.5 10.2c0-1.1 1.1-1.8 2.5-1.8s2.5.7 2.5 1.7c0 2-5 1.4-5 3.6 0 1 1.1 1.8 2.5 1.8s2.5-.7 2.5-1.8" />
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

function FrameVisual({ frame }: { frame: StoryboardFrame }) {
  return (
    <div className="vboard-stage">
      <div className={`vboard-canvas vboard-canvas--${frame.id}`}>
        <div className="vboard-canvas__top">
          <span className="vboard-canvas__num">镜头 {frame.index}</span>
          <span className="vboard-canvas__ratio">9:16</span>
        </div>

        <div className="vboard-canvas__art" aria-hidden="true">
          {frame.id === 'f1' && (
            <svg viewBox="0 0 140 140" fill="none" focusable="false">
              <circle cx="70" cy="70" r="38" fill="#fcf8f1" opacity="0.16" />
              <ellipse cx="64" cy="74" rx="24" ry="20" fill="#e5c192" />
              <path
                d="M64 54c-3 10-3 30 0 40M50 66c9 3 19 3 28 0M50 82c9-3 19-3 28 0"
                stroke="#7b5836"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="94" cy="60" r="10" fill="#fcf8f1" opacity="0.72" />
            </svg>
          )}
          {frame.id === 'f2' && (
            <svg viewBox="0 0 140 140" fill="none" focusable="false">
              <circle cx="102" cy="34" r="18" fill="#fff4dd" opacity="0.78" />
              <path
                d="M6 102c26-22 52-20 76-4 18 12 36 10 52-8v34H6Z"
                fill="#2f7a57"
                opacity="0.55"
              />
              <path
                d="M6 114c34-16 68-12 128 2v18H6Z"
                fill="#256347"
                opacity="0.75"
              />
            </svg>
          )}
          {frame.id === 'f3' && (
            <svg viewBox="0 0 140 140" fill="none" focusable="false">
              <ellipse cx="70" cy="96" rx="48" ry="14" fill="#261e16" opacity="0.45" />
              <ellipse cx="56" cy="84" rx="16" ry="11" fill="#e2be8d" />
              <ellipse cx="82" cy="80" rx="18" ry="12" fill="#cfa26a" />
              <circle cx="68" cy="64" r="9" fill="#f6eddf" opacity="0.82" />
            </svg>
          )}
          {frame.id === 'f4' && (
            <svg viewBox="0 0 140 140" fill="none" focusable="false">
              <rect x="34" y="46" width="72" height="58" rx="8" fill="#fcf8f1" opacity="0.92" />
              <rect x="30" y="38" width="80" height="14" rx="4" fill="#edddc4" />
              <rect x="65" y="38" width="10" height="66" fill="#bf3a2f" />
              <circle cx="62" cy="34" r="6" stroke="#edddc4" strokeWidth="2.5" />
              <circle cx="78" cy="34" r="6" stroke="#edddc4" strokeWidth="2.5" />
            </svg>
          )}
        </div>

        <div className="vboard-canvas__bottom">
          <span className="vboard-canvas__time">{frame.timeRange}</span>
          <p className="vboard-canvas__caption">{frame.caption}</p>
        </div>
      </div>
    </div>
  );
}

export function StoryboardPage() {
  const navigate = useNavigate();

  return (
    <div className="page vboard-page">
      <StepIndicator steps={VIDEO_STEPS} current={1} label="AI 宣传视频制作进度" />

      <div className="page-head">
        <span className="eyebrow">
          <SceneIcon size={14} />
          AI 宣传视频 · 第 2 步 / 共 4 步
        </span>
        <h1 className="page-title">关键帧分镜预览</h1>
        <p className="page-desc">
          以下 4 张 9:16 关键帧将作为视频合成的构图锚点。确认镜头节奏满意后，再正式开始渲染视频与三语配音。
        </p>
      </div>

      {/* 4 张 9:16 关键帧卡片 */}
      <section className="vboard-section" aria-labelledby="vboard-grid-title">
        <div className="vboard-section__head">
          <div>
            <h2 id="vboard-grid-title" className="section-title">
              4 组关键帧构图
            </h2>
            <p className="small muted">商品：新疆阿克苏纸皮核桃 · 渐变画布为分镜构图占位</p>
          </div>
          <span className="badge">4 张 · 9:16 竖屏</span>
        </div>

        <div className="vboard-grid">
          {STORYBOARD_FRAMES.map((frame) => (
            <Card key={frame.id} variant="elevated" padding="none" className="vboard-card">
              <FrameVisual frame={frame} />

              <div className="vboard-card__body">
                <div className="vboard-card__head">
                  <h3 className="vboard-card__title">{frame.title}</h3>
                  <span className="vboard-card__time">{frame.timeRange}</span>
                </div>
                <p className="vboard-card__camera">{frame.camera}</p>
                <p className="vboard-card__desc">{frame.desc}</p>

                <div className="vboard-card__actions">
                  <Button size="sm" variant="secondary" block disabled icon={<RefreshSvg />}>
                    换一张（待接入）
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 积分预估与微信通知提示 */}
      <section className="vboard-notices" aria-label="生成预估与通知说明">
        <Card variant="elevated" padding="md" className="vboard-estimate">
          <span className="vboard-estimate__icon">
            <CoinsSvg />
          </span>
          <div className="vboard-estimate__body">
            <span className="vboard-estimate__label">本单预估消耗与耗时</span>
            <p className="vboard-estimate__value">消耗 28 积分 · 约 90 秒</p>
            <p className="small muted">含 15 秒 9:16 竖屏视频渲染与汉 / 维 / 哈三语配音字幕</p>
          </div>
        </Card>

        <aside className="vboard-wechat" aria-label="后台生成通知提示">
          <span className="vboard-wechat__icon">
            <BellSvg />
          </span>
          <div className="vboard-wechat__body">
            <p className="vboard-wechat__title">生成过程中可以离开，完成后微信通知</p>
            <p className="small muted">
              点击开始生成后任务在云端排队合成，无需一直停留在页面等待，完成后自动存入「我的作品」。
            </p>
          </div>
        </aside>
      </section>

      {/* 底部操作栏 */}
      <Card variant="soft" padding="md" className="vboard-footer">
        <div className="vboard-footer__info">
          <p className="vboard-footer__title">确认分镜构图无误即可开始合成</p>
          <p className="small muted">当前为界面预览阶段，点击确认将进入生成进度演示页。</p>
        </div>

        <div className="actions actions--mobile-stack vboard-footer__actions">
          <Button variant="secondary" disabled icon={<RefreshSvg />}>
            重新生成分镜（待接入）
          </Button>
          <Button
            size="lg"
            icon={<SparklesIcon size={18} />}
            onClick={() => navigate('/video/progress')}
          >
            确认，开始生成视频
          </Button>
        </div>
      </Card>

      <div className="vboard-back">
        <button
          type="button"
          className="vboard-back__link"
          onClick={() => navigate('/video/script')}
        >
          <ArrowRightIcon size={14} className="vboard-back__icon" />
          返回上一步查看剧本
        </button>
      </div>
    </div>
  );
}
