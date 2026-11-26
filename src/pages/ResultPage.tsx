import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CheckIcon,
  ImageIcon,
  SparklesIcon,
  StepIndicator,
} from '../components';
import { FLOW_STEPS, FLOW_STEP_INDEX } from '../app/flow';
import './Result.css';

type AssetKind = 'main' | 'social' | 'poster' | 'video';

interface ResultAsset {
  id: AssetKind;
  title: string;
  ratio: string;
  spec: string;
  format: string;
  channel: string;
  caption: string;
  headline: string;
  subline: string;
}

interface DubbingTrack {
  id: 'zh' | 'ug' | 'kk';
  language: string;
  subtitleLabel: string;
  duration: string;
  channel: string;
  preview: string;
  bars: readonly number[];
}

const DUBBING_TRACKS: readonly DubbingTrack[] = [
  {
    id: 'zh',
    language: '汉语',
    subtitleLabel: '字幕：中文',
    duration: '00:15',
    channel: '淘宝 / 抖音公域',
    preview: '「新疆阿克苏纸皮核桃，薄壳手捏即开，原产地直发…」',
    bars: [36, 68, 50, 86, 60, 92, 48, 76, 56, 82, 42, 64],
  },
  {
    id: 'ug',
    language: '维吾尔语',
    subtitleLabel: '字幕：维文',
    duration: '00:16',
    channel: '疆内朋友圈 / 同乡私域',
    preview: '已按汉语审校脚本转译为维吾尔语口播与维文字幕占位',
    bars: [44, 62, 80, 52, 88, 66, 72, 46, 84, 58, 70, 40],
  },
  {
    id: 'kk',
    language: '哈萨克语',
    subtitleLabel: '字幕：哈文',
    duration: '00:16',
    channel: '同乡社群 / 疆内私域',
    preview: '已按汉语审校脚本转译为哈萨克语口播与哈文字幕占位',
    bars: [38, 74, 54, 84, 48, 90, 62, 78, 50, 68, 44, 58],
  },
];

const RESULT_ASSETS: readonly ResultAsset[] = [
  {
    id: 'main',
    title: '1:1 主图',
    ratio: '1:1',
    spec: '800 × 800 px',
    format: 'JPG',
    channel: '淘宝 / 拼多多 / 抖音小店',
    caption: '高辨识度商品主体与产地角标，适配搜索列表展示。',
    headline: '新疆阿克苏纸皮核桃',
    subline: '原生态直发 · 壳薄仁满',
  },
  {
    id: 'social',
    title: '3:4 种草图文',
    ratio: '3:4',
    spec: '1200 × 1600 px',
    format: 'PNG',
    channel: '小红书 / 逛逛',
    caption: '风土暖光配种草封面排版，便于一键配文发布。',
    headline: '秋日新疆好坚果',
    subline: '自然晒干 · 一捏就开',
  },
  {
    id: 'poster',
    title: '朋友圈海报',
    ratio: '4:5',
    spec: '1080 × 1350 px',
    format: 'PNG',
    channel: '微信朋友圈 / 社群团购',
    caption: '石榴红国潮边框配扫码位占位，适合私域复购转发。',
    headline: '产地鲜货 · 当季尝鲜',
    subline: '疆果直发 · 新鲜到家',
  },
  {
    id: 'video',
    title: '9:16 短视频',
    ratio: '9:16',
    spec: '1080 × 1920 px',
    format: 'MP4 · 15s',
    channel: '抖音 / 视频号 / 快手',
    caption: '竖屏动态镜头与卖点字幕条占位，适合短平快种草。',
    headline: '阿克苏果园直拍',
    subline: '00:15 · 竖屏带货预览',
  },
];

function DownloadSvg() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4.5v10.8" />
      <path d="m7.8 11.4 4.2 4.2 4.2-4.2" />
      <path d="M5 19.5h14" />
    </svg>
  );
}

function ShareSvg() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="17.5" cy="6" r="2.5" />
      <circle cx="6.5" cy="12" r="2.5" />
      <circle cx="17.5" cy="18" r="2.5" />
      <path d="m8.8 10.8 6.4-3.6M8.8 13.2l6.4 3.6" />
    </svg>
  );
}

function RefreshSvg() {
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
      <path d="M20 11a8 8 0 1 0 2 5.3" />
      <path d="M20 4.5V11h-6.5" />
    </svg>
  );
}

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
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m8 5.6 10.6 6.4L8 18.4V5.6Z" />
    </svg>
  );
}

function AssetMockup({ asset }: { asset: ResultAsset }) {
  return (
    <div className={`asset-stage asset-stage--${asset.id}`}>
      <div className={`asset-canvas asset-canvas--${asset.id}`}>
        <div className="asset-canvas__top">
          <span className="asset-canvas__pill">{asset.ratio}</span>
          <span className="asset-canvas__ai">AI 标识</span>
        </div>

        <div className="asset-canvas__center" aria-hidden="true">
          {asset.id === 'video' ? (
            <span className="asset-canvas__play">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="m8.5 6.3 9.4 5.7-9.4 5.7V6.3Z" />
              </svg>
            </span>
          ) : (
            <span className="asset-canvas__emblem">
              <SparklesIcon size={20} />
            </span>
          )}
        </div>

        <div className="asset-canvas__bottom">
          <p className="asset-canvas__headline">{asset.headline}</p>
          <p className="asset-canvas__subline">{asset.subline}</p>

          {asset.id === 'poster' && (
            <div className="asset-canvas__poster-bar" aria-hidden="true">
              <span className="asset-canvas__poster-note">长按识别 · 产地直邮</span>
              <span className="asset-canvas__qr" />
            </div>
          )}

          {asset.id === 'video' && (
            <div className="asset-canvas__timeline" aria-hidden="true">
              <span className="asset-canvas__timeline-fill" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ResultPage() {
  const navigate = useNavigate();

  return (
    <div className="page result-page">
      <StepIndicator steps={FLOW_STEPS} current={FLOW_STEP_INDEX.result} />

      <div className="result-head">
        <div className="page-head">
          <span className="eyebrow">
            <ImageIcon size={14} />
            第 3 步 / 共 3 步
          </span>
          <h1 className="page-title">生成结果预览</h1>
          <p className="page-desc">
            以下为 4 种常用渠道规格的占位效果预览，真实出图、下载与分享能力将在后续阶段接入。
          </p>
        </div>

        <div className="result-head__cta">
          <Button
            variant="secondary"
            icon={<RefreshSvg />}
            onClick={() => navigate('/scene')}
          >
            再生成一次
          </Button>
        </div>
      </div>

      {/* 轻提示条：AI 标识 + 违规词过滤 + 汉语先审再译 */}
      <aside className="result-notice" aria-label="生成内容合规提示">
        <span className="result-notice__icon">
          <ShieldCheckSvg />
        </span>
        <div className="result-notice__body">
          <p className="result-notice__text">
            <strong>合规提示：</strong>
            生成内容含 AI 标识，画面与文案中的违规词已过滤。脚本执行「汉语先审、再译合成」，违禁词在汉语阶段拦截。
          </p>
          <span className="result-notice__tags">
            <span>
              <CheckIcon size={12} /> AI 合成标识
            </span>
            <span>
              <CheckIcon size={12} /> 广告法违规词已过滤
            </span>
            <span>
              <CheckIcon size={12} /> 汉语先审再译
            </span>
          </span>
        </div>
      </aside>

      {/* 4 个物料卡片网格 */}
      <section aria-label="生成的 4 类营销物料占位卡片">
        <div className="result-grid">
          {RESULT_ASSETS.map((asset) => (
            <Card
              key={asset.id}
              variant="elevated"
              padding="none"
              className="result-card"
            >
              <AssetMockup asset={asset} />

              <div className="result-card__body">
                <div className="result-card__head">
                  <h2 className="result-card__title">{asset.title}</h2>
                  <span className="result-card__format">{asset.format}</span>
                </div>

                <div className="result-card__specs">
                  <span className="result-card__spec-chip">{asset.spec}</span>
                  <span className="result-card__channel">{asset.channel}</span>
                </div>

                <p className="result-card__caption">{asset.caption}</p>

                <div className="result-card__actions">
                  <Button size="sm" disabled icon={<DownloadSvg />}>
                    下载（待接入）
                  </Button>
                  <Button size="sm" variant="secondary" disabled icon={<ShareSvg />}>
                    分享（待接入）
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 三语配音试听 */}
      <section className="result-dubbing" aria-labelledby="result-dubbing-title">
        <div className="result-dubbing__head">
          <div>
            <h2 id="result-dubbing-title" className="section-title">
              三语配音试听
            </h2>
            <p className="small muted">
              同一套带货脚本同步生成汉 / 维 / 哈三语配音与对应字幕，试听播放待接入
            </p>
          </div>
          <span className="badge badge--accent">3 条音轨 · 待接入</span>
        </div>

        <div className="result-dubbing__grid">
          {DUBBING_TRACKS.map((track) => (
            <Card
              key={track.id}
              variant="elevated"
              padding="md"
              className="dubbing-track"
            >
              <div className="dubbing-track__head">
                <div className="dubbing-track__title-wrap">
                  <h3 className="dubbing-track__lang">{track.language}</h3>
                  <span className="dubbing-track__subtitle">{track.subtitleLabel}</span>
                </div>
                <span className="dubbing-track__pending">待接入</span>
              </div>

              <div className="dubbing-track__player">
                <button
                  type="button"
                  disabled
                  className="dubbing-track__play"
                  aria-label={`试听${track.language}配音（待接入）`}
                >
                  <PlaySvg />
                </button>

                <div className="dubbing-track__wave" aria-hidden="true">
                  {track.bars.map((height, idx) => (
                    <span
                      key={idx}
                      className="dubbing-track__bar"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                <span className="dubbing-track__duration">00:00 / {track.duration}</span>
              </div>

              <p className="dubbing-track__preview">{track.preview}</p>
              <span className="dubbing-track__channel">适用渠道：{track.channel}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* 底部流程操作 */}
      <footer className="result-footer">
        <div className="actions actions--mobile-stack result-footer__actions">
          <Button
            size="lg"
            icon={<RefreshSvg />}
            onClick={() => navigate('/scene')}
          >
            再生成一次
          </Button>
          <Button variant="secondary" onClick={() => navigate('/upload')}>
            更换商品图
          </Button>
          <Button variant="ghost" onClick={() => navigate('/works')}>
            查看我的作品
          </Button>
        </div>
        <p className="small muted">
          界面预览阶段：卡片内容为 CSS 渐变占位，下载与分享按钮待接口接入后启用。
        </p>
      </footer>
    </div>
  );
}
