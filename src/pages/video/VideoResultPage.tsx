import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CheckIcon,
  SparklesIcon,
  StepIndicator,
  WorksIcon,
} from '../../components';
import './VideoResultPage.css';

const VIDEO_STEPS = ['剧本', '分镜', '生成', '成品'] as const;

type DubbingLang = 'zh' | 'ug' | 'kk';

interface DubbingOption {
  id: DubbingLang;
  label: string;
  subtitleTag: string;
  channel: string;
  voiceDesc: string;
  subtitlePreview: string;
}

const DUBBING_OPTIONS: readonly DubbingOption[] = [
  {
    id: 'zh',
    label: '汉语',
    subtitleTag: '中文字幕',
    channel: '淘宝 / 抖音 / 视频号公域',
    voiceDesc: '标准普通话带货女声 · 15 秒卡点节奏',
    subtitlePreview: '新疆阿克苏当季纸皮核桃，轻轻一捏壳就开，产地直发！',
  },
  {
    id: 'ug',
    label: '维吾尔语',
    subtitleTag: '维文字幕',
    channel: '疆内朋友圈 / 同乡私域',
    voiceDesc: '地道维吾尔语亲切口播 · 同步维文双行字幕占位',
    subtitlePreview: '维吾尔语配音字幕预览占位 · 按汉语审校脚本转译合成',
  },
  {
    id: 'kk',
    label: '哈萨克语',
    subtitleTag: '哈文字幕',
    channel: '同乡社群 / 疆内私域',
    voiceDesc: '自然流畅哈萨克语口播 · 同步哈文字幕占位',
    subtitlePreview: '哈萨克语配音字幕预览占位 · 按汉语审校脚本转译合成',
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

export function VideoResultPage() {
  const navigate = useNavigate();
  // 纯视觉切换：切换三语 tab 与字幕开关只改变界面展示，不播放真实视频
  const [activeLang, setActiveLang] = useState<DubbingLang>('zh');
  const [subtitleEnabled, setSubtitleEnabled] = useState(true);

  const currentDubbing =
    DUBBING_OPTIONS.find((item) => item.id === activeLang) ?? DUBBING_OPTIONS[0];

  return (
    <div className="page vres-page">
      <StepIndicator steps={VIDEO_STEPS} current={3} label="AI 宣传视频制作进度" />

      <div className="page-head">
        <span className="eyebrow">
          <SparklesIcon size={14} />
          AI 宣传视频 · 第 4 步 / 共 4 步
        </span>
        <h1 className="page-title">宣传视频成品</h1>
        <p className="page-desc">
          「新疆阿克苏纸皮核桃」15 秒 9:16 竖屏宣传片与三语配音已准备就绪。当前为界面预览，真实播放、下载与分享待接入。
        </p>
      </div>

      {/* 主体两栏：左 9:16 播放器占位 + 右侧三语切换与操作 */}
      <div className="vres-layout">
        <Card variant="elevated" padding="md" className="vres-stage-card">
          <div className="vres-stage">
            <div className="vres-player">
              <div className="vres-player__top">
                <span className="vres-player__spec">9:16 · 1080×1920</span>
                <span className="vres-player__ai">AI 合成标识</span>
              </div>

              <div className="vres-player__center">
                <button
                  type="button"
                  disabled
                  className="vres-player__play"
                  aria-label="播放宣传视频（待接入）"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="m8.2 5.8 10.6 6.2-10.6 6.2V5.8Z" />
                  </svg>
                </button>
                <span className="vres-player__play-note">播放功能待接入</span>
              </div>

              <div className="vres-player__bottom">
                <div className="vres-player__title-block">
                  <p className="vres-player__headline">新疆阿克苏纸皮核桃</p>
                  <p className="vres-player__subline">
                    {currentDubbing.label}配音 · {subtitleEnabled ? currentDubbing.subtitleTag : '字幕已关闭'}
                  </p>
                </div>

                {subtitleEnabled && (
                  <p className="vres-player__subtitle" aria-label="画面字幕预览">
                    {currentDubbing.subtitlePreview}
                  </p>
                )}

                <div className="vres-player__scrub" aria-hidden="true">
                  <div className="vres-player__track">
                    <span className="vres-player__progress" />
                  </div>
                  <div className="vres-player__times">
                    <span>00:00</span>
                    <span>00:15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="vres-sidebar">
          {/* 三语配音切换 + 字幕开关 */}
          <Card variant="elevated" padding="md" className="vres-panel">
            <div className="vres-panel__head">
              <div>
                <h2 className="section-title">三语配音与字幕</h2>
                <p className="small muted">点击切换查看不同语种的字幕与渠道配置（纯视觉切换）</p>
              </div>
              <span className="badge badge--accent">3 语种版本</span>
            </div>

            <div className="vres-tabs" role="tablist" aria-label="三语配音切换">
              {DUBBING_OPTIONS.map((option) => {
                const selected = option.id === activeLang;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`vres-tab${selected ? ' is-active' : ''}`}
                    onClick={() => setActiveLang(option.id)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="vres-dubbing-box" role="tabpanel" aria-label={`${currentDubbing.label}版本信息`}>
              <div className="vres-dubbing-box__row">
                <strong>{currentDubbing.label}版本</strong>
                <span className="vres-dubbing-box__chip">{currentDubbing.subtitleTag}</span>
              </div>
              <p className="small muted">{currentDubbing.voiceDesc}</p>
              <p className="vres-dubbing-box__channel">适用渠道：{currentDubbing.channel}</p>
            </div>

            <div className="vres-switch-row">
              <div className="vres-switch-row__text">
                <span className="vres-switch-row__label">画面字幕显示</span>
                <span className="small muted">
                  {subtitleEnabled ? `已开启（${currentDubbing.subtitleTag}）` : '已关闭（仅保留无字幕纯画面）'}
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={subtitleEnabled}
                aria-label="切换画面字幕显示"
                className={`vres-switch${subtitleEnabled ? ' is-on' : ''}`}
                onClick={() => setSubtitleEnabled((prev) => !prev)}
              >
                <span className="vres-switch__thumb" />
              </button>
            </div>

            <div className="vres-export">
              <Button disabled icon={<DownloadSvg />} block>
                下载视频（待接入）
              </Button>
              <Button variant="secondary" disabled icon={<ShareSvg />} block>
                分享给好友 / 社群（待接入）
              </Button>
            </div>
          </Card>

          {/* AI 标识与违禁词过滤说明 */}
          <aside className="vres-compliance" aria-label="AI 标识与合规说明">
            <span className="vres-compliance__icon">
              <ShieldCheckSvg />
            </span>
            <div className="vres-compliance__body">
              <h2 className="vres-compliance__title">AI 标识与违禁词合规说明</h2>
              <p className="vres-compliance__text">
                本视频画面与配音由 AI 生成，成片右上角自动附带 <strong>AI 合成标识</strong>。
                三语脚本均已完成「汉语先审、再译合成」，广告法违禁词与极限用语已过滤。
              </p>
              <div className="vres-compliance__tags">
                <span>
                  <CheckIcon size={12} /> 含 AI 合成标识
                </span>
                <span>
                  <CheckIcon size={12} /> 违禁词已过滤
                </span>
                <span>
                  <CheckIcon size={12} /> 汉语先审再译
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 底部操作栏 */}
      <Card variant="soft" padding="md" className="vres-footer">
        <div className="vres-footer__info">
          <p className="vres-footer__title">想换一种口播风格，或查看全部历史物料？</p>
          <p className="small muted">
            可随时回到剧本页重新调整并制作一版，或前往「我的作品」统一管理所有物料。
          </p>
        </div>
        <div className="actions actions--mobile-stack vres-footer__actions">
          <Button variant="secondary" icon={<WorksIcon size={17} />} onClick={() => navigate('/works')}>
            查看我的作品
          </Button>
          <Button size="lg" icon={<RefreshSvg />} onClick={() => navigate('/video/script')}>
            再做一版
          </Button>
        </div>
      </Card>
    </div>
  );
}
