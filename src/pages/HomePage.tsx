import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, Button, Card, CheckIcon, LeafIcon, SceneIcon, SparklesIcon, UploadIcon } from '../components';
import './Home.css';

const steps = [
  { title: '拍照上传', detail: '手机随手拍，让一颗好果成为主角。', icon: UploadIcon },
  { title: '选场景', detail: '勾选风土场景与物料类型，风格由你定。', icon: SceneIcon },
  { title: '一键出片', detail: '30 秒生成主图、种草图文或短视频。', icon: SparklesIcon },
];
const scenes = [
  { name: '原生态溯源', style: 'origin', tag: '自然 · 真实', desc: '把产地的好，讲给每一位顾客。' },
  { name: '高端国潮礼盒', style: 'gift', tag: '精致 · 有礼', desc: '让新疆好礼，自带一份仪式感。' },
  { name: '深夜食欲风', style: 'night', tag: '浓郁 · 诱人', desc: '一眼心动，唤醒深夜的味蕾。' },
  { name: '金秋果园', style: 'autumn', tag: '丰收 · 鲜甜', desc: '留住枝头刚刚好的成熟时刻。' },
];

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="page home">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__copy">
          <span className="eyebrow"><LeafIcon size={15} /> 扎根新疆风土，为好产品而创作</span>
          <p className="home-brand">疆果智创</p>
          <h1 id="home-title" className="home-title"><span>30 秒</span>做出能上架的<br />农特产营销物料</h1>
          <p className="home-desc">你负责种好果，我们负责让它被看见。<br />一张手机照片，变成主图、种草图文与短视频，零设计基础也能轻松出片。</p>
          <div className="home-actions">
            <Button size="lg" icon={<SparklesIcon size={18} />} onClick={() => navigate('/upload')}>免费试用 <span aria-hidden="true">↗</span></Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/pricing')}>查看定价</Button>
          </div>
          <p className="home-assurance"><CheckIcon size={15} /> 免费试用送 20 积分 <span>·</span> 无需设计基础</p>
        </div>
        <div className="home-showcase" role="img" aria-label="CSS 示意：新疆风土红枣营销主图，非实际生成效果">
          <div className="home-showcase__top"><span><SparklesIcon size={14} /> 风土灵感工作室</span><span>01 / 04</span></div>
          <div className="home-poster">
            <span className="home-poster__label">XINJIANG · 自然馈赠</span>
            <div className="home-poster__title">一口甜，<br />一整个新疆。</div>
            <span className="home-poster__seal">风土<br />好物</span>
            <div className="home-fruit home-fruit--one" /><div className="home-fruit home-fruit--two" /><div className="home-fruit home-fruit--three" />
            <div className="home-poster__base" />
            <span className="home-poster__caption">新疆红枣 / 阳光酿成的甜</span>
          </div>
          <div className="home-showcase__bottom"><span><CheckIcon size={15} /> 好物，自有好卖相</span><small>风格示意 · 非生成成品</small></div>
        </div>
      </section>
      <section className="home-metrics" aria-label="产品优势">
        {[['30', '秒', '从照片到营销物料'], ['98', '%', '比外包美工更省'], ['0.4', '元起', '单套物料成本'], ['20', '积分', '免费试用即送']].map(([value, unit, label]) => (
          <div key={label}><p><strong>{value}</strong><span>{unit}</span></p><span>{label}</span></div>
        ))}
      </section>
      <section className="home-section" aria-labelledby="home-flow-title">
        <div className="home-section__head"><div><span className="eyebrow">简单三步 · 灵感落地</span><h2 id="home-flow-title">把时间留给生意，把设计交给 AI</h2></div><p>不用学软件，也不用反复沟通。</p></div>
        <div className="home-steps">{steps.map(({ title, detail, icon: Icon }, index) => (
          <Card key={title} variant="outlined" padding="lg" className="home-step"><div className="home-step__top"><span className="home-step__icon"><Icon size={24} /></span><span className="home-step__number">0{index + 1}</span></div><h3>{title}</h3><p>{detail}</p></Card>
        ))}</div>
      </section>
      <section className="home-section" aria-labelledby="home-scenes-title">
        <div className="home-section__head"><div><span className="eyebrow">四种风土 · 各有好看</span><h2 id="home-scenes-title">让每一份好物，都有自己的故事</h2></div><p>为新疆农特产而设计的场景灵感。</p></div>
        <div className="home-scenes">{scenes.map(scene => (
          <Card key={scene.name} padding="none" className="home-scene"><div className={`home-scene__art home-scene__art--${scene.style}`} aria-hidden="true"><span>{scene.tag}</span><div className="home-scene__orb" /><div className="home-scene__land" /><div className="home-scene__product" /></div><div className="home-scene__copy"><h3>{scene.name}</h3><p>{scene.desc}</p></div></Card>
        ))}</div>
        <p className="home-scene-note">场景为 CSS 风格示意，实际生成效果以后续功能上线为准。</p>
      </section>
      <section className="home-cta" aria-labelledby="home-cta-title"><span className="home-cta__icon"><LeafIcon size={28} /></span><div><span className="eyebrow">新疆好物，值得被更多人看见</span><h2 id="home-cta-title">下一张好卖的图，从你的好产品开始。</h2><p>免费试用送 20 积分，给生意一点新灵感。</p></div><Button size="lg" icon={<ArrowRightIcon size={18} />} onClick={() => navigate('/upload')}>免费试用</Button></section>
    </div>
  );
}
