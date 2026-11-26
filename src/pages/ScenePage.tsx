import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CheckIcon,
  SceneIcon,
  SparklesIcon,
  StepIndicator,
} from '../components';
import { FLOW_STEPS, FLOW_STEP_INDEX } from '../app/flow';
import './Scene.css';

type SceneId = 'origin' | 'guochao' | 'midnight' | 'orchard';
type MaterialId = 'main-image' | 'social-post' | 'short-video';
type DubbingLangId = 'zh' | 'ug' | 'kk';

interface SceneOption {
  id: SceneId;
  name: string;
  tag: string;
  desc: string;
  paletteLabel: string;
}

interface MaterialOption {
  id: MaterialId;
  name: string;
  ratio: string;
  resolution: string;
  channels: string;
  desc: string;
}

interface DubbingLangOption {
  id: DubbingLangId;
  name: string;
  badge: string;
  channels: string;
  desc: string;
}

const SCENE_OPTIONS: readonly SceneOption[] = [
  {
    id: 'origin',
    name: '原生态溯源',
    tag: '产地直发 · 质朴可信',
    desc: '戈壁日光、晒场木案与绿洲肌理，突出新疆原产地的自然新鲜感。',
    paletteLabel: '沙土暖白 / 绿洲绿',
  },
  {
    id: 'guochao',
    name: '高端国潮礼盒',
    tag: '节庆送礼 · 质感高级',
    desc: '石榴红丝路纹样与礼盒暖金光影，适合年货礼装与高客单主图。',
    paletteLabel: '石榴红 / 鎏金暖沙',
  },
  {
    id: 'midnight',
    name: '深夜食欲风',
    tag: '暗调特写 · 馋感拉满',
    desc: '深木桌暗调配暖色轮廓光，放大干果仁油润酥脆的视觉诱惑。',
    paletteLabel: '胡桃深棕 / 葡萄暗紫',
  },
  {
    id: 'orchard',
    name: '金秋果园',
    tag: '丰收氛围 · 温暖明快',
    desc: '胡杨金秋逆光与果枝剪影，呈现新疆瓜果满枝的丰收喜悦感。',
    paletteLabel: '秋日暖金 / 焦糖棕',
  },
];

const MATERIAL_OPTIONS: readonly MaterialOption[] = [
  {
    id: 'main-image',
    name: '电商主图',
    ratio: '1:1',
    resolution: '800 × 800 px',
    channels: '淘宝 / 拼多多 / 抖音小店',
    desc: '主体清晰、留白克制，适合电商搜索列表快速抢占点击。',
  },
  {
    id: 'social-post',
    name: '种草图文',
    ratio: '3:4',
    resolution: '1200 × 1600 px',
    channels: '小红书 / 微信朋友圈',
    desc: '风土质感画面搭配种草氛围排版，适合日常上新与口碑传播。',
  },
  {
    id: 'short-video',
    name: '短视频',
    ratio: '9:16',
    resolution: '1080 × 1920 px',
    channels: '抖音 / 视频号 / 快手',
    desc: '竖屏动态光影与卖点字幕卡点，快速产出 15 秒带货短片。',
  },
];

const DUBBING_LANG_OPTIONS: readonly DubbingLangOption[] = [
  {
    id: 'zh',
    name: '汉语',
    badge: '公域主渠道',
    channels: '淘宝 / 抖音 / 拼多多',
    desc: '发淘宝、抖音等全国公域电商与短视频渠道，标准普通话配音搭配中文字幕。',
  },
  {
    id: 'ug',
    name: '维吾尔语',
    badge: '疆内私域',
    channels: '疆内朋友圈 / 同乡社群',
    desc: '发疆内朋友圈与同乡私域转化，地道维吾尔语口播搭配维文字幕，拉近信任感。',
  },
  {
    id: 'kk',
    name: '哈萨克语',
    badge: '同乡私域',
    channels: '疆内朋友圈 / 同乡群',
    desc: '发疆内朋友圈与同乡私域传播，亲切自然的哈萨克语配音搭配哈文字幕。',
  },
];

function SceneArtwork({ id }: { id: SceneId }) {
  if (id === 'origin') {
    return (
      <div className="scene-art scene-art--origin" aria-hidden="true">
        <svg viewBox="0 0 280 160" fill="none" focusable="false">
          <circle cx="222" cy="40" r="24" fill="#fcf8f1" opacity="0.88" />
          <path d="M0 106c44-24 94-20 144-4s94 12 136-10v68H0Z" fill="#dec7a4" />
          <path d="M0 124c58-16 112-10 164 4s76 6 116-8v40H0Z" fill="#c4a889" />
          {/* 绿洲枝叶剪影 */}
          <path d="M44 126c2-18 12-30 28-36-2 16-10 28-28 36Z" fill="#2f7a57" opacity="0.85" />
          <path d="M56 126c10-12 22-16 34-16-8 12-18 18-34 16Z" fill="#256347" opacity="0.72" />
          {/* 木托盘示意 */}
          <rect x="116" y="110" width="84" height="12" rx="6" fill="#7b5836" opacity="0.82" />
          <circle cx="146" cy="105" r="9" fill="#9b7248" />
          <circle cx="163" cy="103" r="10" fill="#7b5836" />
          <circle cx="178" cy="106" r="8" fill="#a87e52" />
        </svg>
      </div>
    );
  }

  if (id === 'guochao') {
    return (
      <div className="scene-art scene-art--guochao" aria-hidden="true">
        <svg viewBox="0 0 280 160" fill="none" focusable="false">
          {/* 丝路拱门线框 */}
          <path
            d="M52 160V74c0-30 34-54 88-54s88 24 88 54v86"
            stroke="#f6eddf"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          <path
            d="M72 160V80c0-22 26-40 68-40s68 18 68 40v80"
            stroke="#f5d2cd"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          {/* 菱形民族纹章 */}
          <path d="M140 28 150 38l-10 10-10-10 10-10Z" fill="#edddc4" opacity="0.85" />
          {/* 礼盒底座与丝带 */}
          <rect x="94" y="84" width="92" height="58" rx="8" fill="#fcf8f1" opacity="0.95" />
          <rect x="90" y="76" width="100" height="14" rx="4" fill="#edddc4" />
          <rect x="135" y="76" width="10" height="66" fill="#bf3a2f" />
          <circle cx="132" cy="72" r="7" stroke="#edddc4" strokeWidth="3" />
          <circle cx="148" cy="72" r="7" stroke="#edddc4" strokeWidth="3" />
        </svg>
      </div>
    );
  }

  if (id === 'midnight') {
    return (
      <div className="scene-art scene-art--midnight" aria-hidden="true">
        <svg viewBox="0 0 280 160" fill="none" focusable="false">
          <circle cx="204" cy="44" r="46" fill="#6c4b90" opacity="0.34" />
          <circle cx="96" cy="112" r="56" fill="#bf3a2f" opacity="0.24" />
          {/* 暖光聚光碗碟特写 */}
          <ellipse cx="140" cy="122" rx="76" ry="18" fill="#4a3f34" opacity="0.88" />
          <ellipse cx="140" cy="117" rx="58" ry="12" fill="#261e16" stroke="#c4a889" strokeOpacity="0.45" />
          {/* 几颗暖光提亮果仁 */}
          <ellipse cx="122" cy="111" rx="13" ry="9" fill="#d9b282" />
          <ellipse cx="145" cy="108" rx="14" ry="10" fill="#c4955e" />
          <ellipse cx="163" cy="114" rx="11" ry="8" fill="#e5c79e" />
          {/* 细微星芒 */}
          <path d="M214 34v12M208 40h12" stroke="#f6eddf" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
          <circle cx="62" cy="54" r="2.2" fill="#f6eddf" opacity="0.55" />
        </svg>
      </div>
    );
  }

  return (
    <div className="scene-art scene-art--orchard" aria-hidden="true">
      <svg viewBox="0 0 280 160" fill="none" focusable="false">
        <circle cx="72" cy="46" r="28" fill="#fff6e4" opacity="0.92" />
        <path d="M0 118c54-24 114-18 168 0s78 12 112-8v50H0Z" fill="#d9a45b" opacity="0.65" />
        <path d="M0 134c64-18 122-12 178 4s68 8 102-6v28H0Z" fill="#9c6c3b" opacity="0.75" />
        {/* 果园枝桠与果实 */}
        <path
          d="M204 142V66m0 22-26-22m26 16 24-20m-24 6-8-26"
          stroke="#63452a"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="176" cy="64" r="10" fill="#bf3a2f" opacity="0.88" />
        <circle cx="228" cy="60" r="9" fill="#d4882a" opacity="0.92" />
        <circle cx="195" cy="42" r="8" fill="#bf3a2f" opacity="0.82" />
        <circle cx="215" cy="84" r="7.5" fill="#e2a648" opacity="0.9" />
      </svg>
    </div>
  );
}

function MaterialIcon({ id }: { id: MaterialId }) {
  if (id === 'main-image') {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <circle cx="9.2" cy="9.4" r="1.5" />
        <path d="m4.8 17 4.4-4.2a1.8 1.8 0 0 1 2.5 0l2.2 2.1 1.8-1.6a1.8 1.8 0 0 1 2.4 0l1.5 1.4" />
      </svg>
    );
  }
  if (id === 'social-post') {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="5" y="3" width="14" height="18" rx="3" />
        <path d="M8.5 8h7M8.5 12h7M8.5 16h4.5" />
      </svg>
    );
  }
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6.5" y="2.8" width="11" height="18.4" rx="2.6" />
      <path d="m10.8 9.6 4 2.4-4 2.4V9.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DubbingWaveSvg() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 10.2v3.6M8.2 7.2v9.6M12 4.5v15M15.8 7.8v8.4M19.5 10.2v3.6" />
    </svg>
  );
}

export function ScenePage() {
  const navigate = useNavigate();
  const [selectedScene, setSelectedScene] = useState<SceneId>('origin');
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialId[]>([
    'main-image',
    'social-post',
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState<DubbingLangId[]>(['zh']);

  const toggleMaterial = (id: MaterialId) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleLanguage = (id: DubbingLangId) => {
    setSelectedLanguages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const activeScene =
    SCENE_OPTIONS.find((item) => item.id === selectedScene) ?? SCENE_OPTIONS[0];

  return (
    <div className="page scene-page">
      <StepIndicator steps={FLOW_STEPS} current={FLOW_STEP_INDEX.scene} />

      <div className="page-head">
        <span className="eyebrow">
          <SceneIcon size={14} />
          第 2 步 / 共 3 步
        </span>
        <h1 className="page-title">选择风土场景与物料</h1>
        <p className="page-desc">
          挑一处贴合商品气质的新疆风土背景，再勾选这次需要输出的营销物料类型。
        </p>
      </div>

      {/* 风土场景四选一 */}
      <section className="scene-section" aria-labelledby="scene-style-title">
        <div className="scene-section__head">
          <div>
            <h2 id="scene-style-title" className="section-title">
              风土场景（四选一）
            </h2>
            <p className="small muted">点击卡片切换预览选中态，无真实数据提交</p>
          </div>
          <span className="badge">当前选中：{activeScene.name}</span>
        </div>

        <div className="scene-grid" role="radiogroup" aria-label="风土场景选择">
          {SCENE_OPTIONS.map((scene) => {
            const isSelected = selectedScene === scene.id;
            return (
              <button
                key={scene.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`scene-card${isSelected ? ' is-selected' : ''}`}
                onClick={() => setSelectedScene(scene.id)}
              >
                <div className="scene-card__media">
                  <SceneArtwork id={scene.id} />
                  <span className="scene-card__palette">{scene.paletteLabel}</span>
                  <span
                    className={`scene-card__check${isSelected ? ' is-selected' : ''}`}
                    aria-hidden="true"
                  >
                    {isSelected && <CheckIcon size={14} />}
                  </span>
                </div>

                <div className="scene-card__body">
                  <div className="scene-card__title-row">
                    <h3 className="scene-card__title">{scene.name}</h3>
                    {isSelected && <span className="scene-card__status">已选</span>}
                  </div>
                  <p className="scene-card__tag">{scene.tag}</p>
                  <p className="scene-card__desc">{scene.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 物料类型多选 */}
      <section className="scene-section" aria-labelledby="material-type-title">
        <div className="scene-section__head">
          <div>
            <h2 id="material-type-title" className="section-title">
              物料类型（可多选）
            </h2>
            <p className="small muted">按需勾选本次要生成的尺寸与渠道物料</p>
          </div>
          <span className="badge badge--accent">
            已勾选 {selectedMaterials.length} / {MATERIAL_OPTIONS.length} 项
          </span>
        </div>

        <div className="material-grid" role="group" aria-label="物料类型多选">
          {MATERIAL_OPTIONS.map((material) => {
            const isChecked = selectedMaterials.includes(material.id);
            return (
              <button
                key={material.id}
                type="button"
                aria-pressed={isChecked}
                className={`material-card${isChecked ? ' is-selected' : ''}`}
                onClick={() => toggleMaterial(material.id)}
              >
                <div className="material-card__top">
                  <span className="material-card__icon">
                    <MaterialIcon id={material.id} />
                  </span>
                  <span className="material-card__ratio">{material.ratio}</span>
                  <span
                    className={`material-card__checkbox${isChecked ? ' is-selected' : ''}`}
                    aria-hidden="true"
                  >
                    {isChecked && <CheckIcon size={13} />}
                  </span>
                </div>

                <div className="material-card__body">
                  <h3 className="material-card__title">{material.name}</h3>
                  <p className="material-card__spec">
                    {material.resolution} · {material.channels}
                  </p>
                  <p className="material-card__desc">{material.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 视频配音语种多选 */}
      <section className="scene-section" aria-labelledby="dubbing-lang-title">
        <div className="scene-section__head">
          <div>
            <h2 id="dubbing-lang-title" className="section-title">
              视频配音语种（可多选）
            </h2>
            <p className="small muted">一套带货脚本可同步输出多语种配音与对应字幕（纯视觉选中态）</p>
          </div>
          <span className="badge badge--success">
            已选 {selectedLanguages.length} / {DUBBING_LANG_OPTIONS.length} 种语种
          </span>
        </div>

        <div className="dubbing-grid" role="group" aria-label="视频配音语种多选">
          {DUBBING_LANG_OPTIONS.map((lang) => {
            const isChecked = selectedLanguages.includes(lang.id);
            return (
              <button
                key={lang.id}
                type="button"
                aria-pressed={isChecked}
                className={`dubbing-card${isChecked ? ' is-selected' : ''}`}
                onClick={() => toggleLanguage(lang.id)}
              >
                <div className="dubbing-card__top">
                  <span className="dubbing-card__icon">
                    <DubbingWaveSvg />
                  </span>
                  <span className="dubbing-card__badge">{lang.badge}</span>
                  <span
                    className={`dubbing-card__checkbox${isChecked ? ' is-selected' : ''}`}
                    aria-hidden="true"
                  >
                    {isChecked && <CheckIcon size={13} />}
                  </span>
                </div>

                <div className="dubbing-card__body">
                  <h3 className="dubbing-card__title">{lang.name}</h3>
                  <p className="dubbing-card__channels">{lang.channels}</p>
                  <p className="dubbing-card__desc">{lang.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 底部确认与操作栏 */}
      <Card variant="soft" padding="md" className="scene-summary">
        <div className="scene-summary__info">
          <span className="scene-summary__label">当前预览配置</span>
          <p className="scene-summary__value">
            <strong>{activeScene.name}</strong>
            <span className="scene-summary__dot" aria-hidden="true">·</span>
            <span>
              {selectedMaterials.length > 0
                ? MATERIAL_OPTIONS.filter((m) => selectedMaterials.includes(m.id))
                    .map((m) => m.name)
                    .join(' / ')
                : '暂未勾选物料（预览模式仍可进入结果页）'}
            </span>
            <span className="scene-summary__dot" aria-hidden="true">·</span>
            <span className="scene-summary__langs">
              配音：
              {selectedLanguages.length > 0
                ? DUBBING_LANG_OPTIONS.filter((l) => selectedLanguages.includes(l.id))
                    .map((l) => l.name)
                    .join(' / ')
                : '暂未勾选语种'}
            </span>
          </p>
        </div>

        <div className="actions actions--mobile-stack scene-summary__actions">
          <Button variant="secondary" onClick={() => navigate('/upload')}>
            上一步：重新上传
          </Button>
          <Button
            size="lg"
            icon={<SparklesIcon size={18} />}
            onClick={() => navigate('/result')}
          >
            开始生成
          </Button>
        </div>
      </Card>
    </div>
  );
}
