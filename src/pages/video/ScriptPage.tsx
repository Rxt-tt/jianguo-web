import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  Button,
  Card,
  CheckIcon,
  SparklesIcon,
  StepIndicator,
} from '../../components';
import './ScriptPage.css';

const VIDEO_STEPS = ['剧本', '分镜', '生成', '成品'] as const;

interface ScriptSegment {
  id: string;
  order: string;
  title: string;
  timeRange: string;
  roleTag: string;
  shotHint: string;
  copy: string;
}

const SCRIPT_SEGMENTS: readonly ScriptSegment[] = [
  {
    id: 'opening',
    order: '01',
    title: '开场',
    timeRange: '0–3 秒',
    roleTag: '黄金前 3 秒 · 抓人眼球',
    shotHint: '近景手捏破壳特写 + 清脆开壳音效占位',
    copy: '「家人们看过来！新疆阿克苏当季纸皮核桃，轻轻一捏壳就开，颗颗果仁都饱满透亮！」',
  },
  {
    id: 'selling-points',
    order: '02',
    title: '卖点',
    timeRange: '3–10 秒',
    roleTag: '核心卖点 · 产地溯源',
    shotHint: '天山果园日光与木案剥仁特写流畅切换',
    copy: '「天山雪水灌溉、自然日照晒干，不漂白、无多余添加，咬下去满口都是原香酥脆，老人孩子都爱吃。」',
  },
  {
    id: 'cta',
    order: '03',
    title: '结尾号召',
    timeRange: '10–15 秒',
    roleTag: '行动引导 · 下单转化',
    shotHint: '国潮礼盒装与产地直发包装定格展示',
    copy: '「阿克苏产地现摘直发，趁着新果刚下树，点击下方链接带两袋回家给家人尝鲜吧！」',
  },
];

const SELECTED_LANGUAGES = [
  { id: 'zh', label: '汉语', channel: '公域主渠道' },
  { id: 'ug', label: '维吾尔语', channel: '疆内私域' },
  { id: 'kk', label: '哈萨克语', channel: '同乡社群' },
] as const;

const PREVIEW_WAVE_BARS = [
  32, 62, 48, 86, 56, 94, 44, 78, 60, 88, 42, 72, 54, 90, 64, 76, 40, 68, 52, 82, 38, 64, 46, 58,
] as const;

function ShieldCheckSvg() {
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
      <path d="M12 3.2 19 6v5.5c0 4.6-2.9 8.2-7 9.5-4.1-1.3-7-4.9-7-9.5V6l7-2.8Z" />
      <path d="m9 12.2 2.1 2.1 4.1-4.3" />
    </svg>
  );
}

function PlaySvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m8 5.6 10.6 6.4L8 18.4V5.6Z" />
    </svg>
  );
}

function RewriteSvg() {
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
      <path d="M17 3.8a2.2 2.2 0 1 1 3.1 3.1L9.4 17.6 5 19l1.4-4.4L17 3.8Z" />
      <path d="M14.5 6.3 17.7 9.5" />
    </svg>
  );
}

function WalnutThumbArt() {
  return (
    <div className="vscript-thumb" aria-hidden="true">
      <svg viewBox="0 0 120 120" fill="none" focusable="false">
        <circle cx="92" cy="26" r="18" fill="#fcf8f1" opacity="0.32" />
        <path d="M0 84c28-14 56-10 86 2 12 4 24 4 34-2v36H0Z" fill="#63452a" opacity="0.45" />
        <ellipse cx="52" cy="66" rx="22" ry="18" fill="#fcf8f1" opacity="0.92" />
        <ellipse cx="52" cy="66" rx="18" ry="14" fill="#c4955e" />
        <path
          d="M52 52c-2 8-2 20 0 28M42 60c6 2 14 2 20 0M42 72c6-2 14-2 20 0"
          stroke="#7b5836"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="77" cy="74" r="11" fill="#edd3b1" opacity="0.95" />
        <circle cx="77" cy="74" r="8" fill="#a87644" />
      </svg>
      <span className="vscript-thumb__badge">阿克苏</span>
    </div>
  );
}

export function ScriptPage() {
  const navigate = useNavigate();

  return (
    <div className="page vscript-page">
      <StepIndicator steps={VIDEO_STEPS} current={0} label="AI 宣传视频制作进度" />

      <div className="page-head">
        <span className="eyebrow">
          <SparklesIcon size={14} />
          AI 宣传视频 · 第 1 步 / 共 4 步
        </span>
        <h1 className="page-title">确认视频剧本</h1>
        <p className="page-desc">
          AI 已根据您的商品特点与选定语种拟定 15 秒竖屏带货口播剧本。先确认节奏与卖点，再生成关键帧分镜。
        </p>
      </div>

      {/* 商品摘要 + 已选语种 */}
      <Card variant="elevated" padding="md" className="vscript-product">
        <div className="vscript-product__main">
          <WalnutThumbArt />
          <div className="vscript-product__info">
            <div className="vscript-product__title-row">
              <h2 className="vscript-product__name">新疆阿克苏纸皮核桃</h2>
              <span className="badge">9:16 竖屏 · 15 秒</span>
            </div>
            <p className="vscript-product__meta small muted">
              风土场景：原生态溯源 · 示例商品占位（不读取真实上传记录）
            </p>
            <div className="vscript-langs" aria-label="已选配音语种">
              <span className="vscript-langs__label">已选语种：</span>
              <ul className="vscript-langs__list">
                {SELECTED_LANGUAGES.map((lang) => (
                  <li key={lang.id} className="vscript-lang-chip">
                    <CheckIcon size={12} />
                    <span>{lang.label}</span>
                    <span className="vscript-lang-chip__sub">{lang.channel}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* 合规提示 */}
      <aside className="vscript-compliance" aria-label="剧本合规检查状态">
        <span className="vscript-compliance__icon">
          <ShieldCheckSvg />
        </span>
        <div className="vscript-compliance__body">
          <p className="vscript-compliance__text">
            <strong>脚本已通过违禁词检查：</strong>
            已自动排查广告法极限词与夸大疗效表述，执行「汉语先审、再译合成」流程（当前为界面视觉展示）。
          </p>
          <span className="vscript-compliance__tags">
            <span>
              <CheckIcon size={12} /> 违禁词 0 风险
            </span>
            <span>
              <CheckIcon size={12} /> 汉语先审再译
            </span>
          </span>
        </div>
      </aside>

      {/* 三段剧本卡片 */}
      <section className="vscript-section" aria-labelledby="vscript-segments-title">
        <div className="vscript-section__head">
          <div>
            <h2 id="vscript-segments-title" className="section-title">
              三段式带货剧本
            </h2>
            <p className="small muted">按 15 秒短视频黄金结构拆分为开场、卖点与结尾号召三段</p>
          </div>
          <span className="badge badge--accent">共 3 段 · 约 96 字</span>
        </div>

        <div className="vscript-grid">
          {SCRIPT_SEGMENTS.map((seg) => (
            <Card key={seg.id} variant="elevated" padding="md" className="vscript-card">
              <div className="vscript-card__top">
                <div className="vscript-card__heading">
                  <span className="vscript-card__index">{seg.order}</span>
                  <div>
                    <h3 className="vscript-card__title">
                      {seg.title}（{seg.timeRange}）
                    </h3>
                    <p className="vscript-card__role">{seg.roleTag}</p>
                  </div>
                </div>
                <span className="vscript-card__time">{seg.timeRange}</span>
              </div>

              <blockquote className="vscript-card__copy">{seg.copy}</blockquote>

              <p className="vscript-card__hint">
                <strong>画面建议：</strong>
                {seg.shotHint}
              </p>

              <div className="vscript-card__footer">
                <Button size="sm" variant="secondary" disabled icon={<RewriteSvg />}>
                  重写这一句（待接入）
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 试听 15 秒播放条 */}
      <Card variant="elevated" padding="md" className="vscript-player">
        <div className="vscript-player__head">
          <div>
            <h2 className="section-title">试听 15 秒</h2>
            <p className="small muted">
              预览普通话口播节奏与停顿；维吾尔语、哈萨克语配音将在视频合成阶段同步生成
            </p>
          </div>
          <span className="vscript-pending-chip">试听待接入</span>
        </div>

        <div className="vscript-player__bar">
          <button
            type="button"
            disabled
            className="vscript-player__play"
            aria-label="试听 15 秒口播（待接入）"
          >
            <PlaySvg />
          </button>

          <div className="vscript-player__wave" aria-hidden="true">
            {PREVIEW_WAVE_BARS.map((height, idx) => (
              <span
                key={idx}
                className="vscript-player__wave-bar"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <span className="vscript-player__time">00:00 / 00:15</span>
        </div>
      </Card>

      {/* 底部操作栏 */}
      <Card variant="soft" padding="md" className="vscript-footer">
        <div className="vscript-footer__info">
          <p className="vscript-footer__title">剧本确认后将自动生成 4 张 9:16 关键帧</p>
          <p className="small muted">
            如暂不想逐句调整，可直接跳过确认，沿用 AI 默认剧本进入分镜预览。
          </p>
        </div>
        <div className="actions actions--mobile-stack vscript-footer__actions">
          <Button variant="secondary" onClick={() => navigate('/video/storyboard')}>
            跳过确认，用默认剧本
          </Button>
          <Button
            size="lg"
            icon={<ArrowRightIcon size={18} />}
            onClick={() => navigate('/video/storyboard')}
          >
            确认剧本，生成关键帧
          </Button>
        </div>
      </Card>
    </div>
  );
}
