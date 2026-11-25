import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  LeafIcon,
  SceneIcon,
  SparklesIcon,
  UploadIcon,
} from '../components';
import './Home.css';

const flowSteps = [
  {
    step: '01',
    title: '上传商品图',
    desc: '手机拍照或从相册选取，干果、水果、礼盒都行。',
    to: '/upload',
    icon: UploadIcon,
  },
  {
    step: '02',
    title: '选择风土场景',
    desc: '胡杨林、葡萄架、巴扎摊位，挑一处理想的新疆背景。',
    to: '/scene',
    icon: SceneIcon,
  },
  {
    step: '03',
    title: '生成并下载',
    desc: '主图、种草图文、短视频，选中合适的直接导出。',
    to: '/result',
    icon: SparklesIcon,
  },
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page home">
      <section className="home-hero">
        <div className="home-hero__copy">
          <span className="eyebrow">
            <SparklesIcon size={14} />
            新疆风土 · AIGC 营销物料
          </span>
          <h1 className="home-title">
            把新疆的<span className="home-title__accent">风土</span>
            <br />
            装进你的商品图
          </h1>
          <p className="home-desc">
            给干果、红枣、核桃拍一张照片，选一处胡杨、葡萄架或巴扎场景，
            几分钟就能拿到主图、种草图文和短视频。为中小商家而做，手机就能完成。
          </p>
          <div className="actions actions--mobile-stack">
            <Button
              size="lg"
              icon={<UploadIcon size={18} />}
              onClick={() => navigate('/upload')}
            >
              开始制作
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/pricing')}
            >
              查看定价
            </Button>
          </div>
          <ul className="home-facts">
            <li>无需设计基础</li>
            <li>手机端优先</li>
            <li>微信内可直接打开</li>
          </ul>
        </div>

        <div className="home-hero__visual" aria-hidden="true">
          <div className="preview">
            <div className="preview__scene">
              <svg viewBox="0 0 320 200" focusable="false">
                <circle cx="254" cy="56" r="30" fill="#f5d2cd" opacity="0.95" />
                <path
                  d="M0 150c48-26 92-26 140-6s120 20 180-8v64H0Z"
                  fill="#edddc4"
                />
                <path
                  d="M0 176c56-20 110-18 158 0s112 14 162-8v32H0Z"
                  fill="#dec7a4"
                  opacity="0.85"
                />
                <path
                  d="M72 142V98m0 0-16-14m16 14 15-16m-15 16 3-22"
                  stroke="#7b5836"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
              <span className="preview__tag">主图预览</span>
            </div>
            <div className="preview__body">
              <span className="preview__line preview__line--lg" />
              <span className="preview__line" />
              <div className="preview__chips">
                <span>胡杨林</span>
                <span>干果礼盒</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-flow" aria-labelledby="home-flow-title">
        <div className="home-flow__head">
          <h2 id="home-flow-title" className="section-title">
            三步做出能卖货的物料
          </h2>
          <p className="small muted">从一张手机照片开始，到可以发布的成品。</p>
        </div>

        <div className="grid grid--3">
          {flowSteps.map(({ step, title, desc, to, icon: Icon }) => (
            <Link key={to} to={to} className="flow-card">
              <Card padding="lg" interactive className="flow-card__inner">
                <div className="flow-card__top">
                  <span className="flow-card__icon">
                    <Icon size={20} />
                  </span>
                  <span className="flow-card__step">{step}</span>
                </div>
                <h3 className="flow-card__title">{title}</h3>
                <p className="flow-card__desc">{desc}</p>
                <span className="flow-card__more">去看看 →</span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-note">
        <LeafIcon size={18} />
        <p>
          <strong>当前是界面阶段。</strong>
          上传、生成、登录与支付能力由后续阶段接入，页面上的按钮暂不触发真实操作。
        </p>
      </section>
    </div>
  );
}