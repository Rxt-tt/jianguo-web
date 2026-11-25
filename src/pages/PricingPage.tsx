import { Button, Card, CheckIcon, LeafIcon, SparklesIcon } from '../components';
import './Pricing.css';

const plans = [
  { name: '免费试用', short: '免费试用', price: '0', unit: '元', credits: '20', desc: '先体验，再决定', note: '注册即送，无需付费', features: ['体验 AI 营销物料创作', '探索四大风土模板', '适合初次尝试的你'] },
  { name: '散户充值包', short: '充值包', price: '29.9', unit: '元 / 包', credits: '300', desc: '偶尔上新，按需创作', note: '一次充值，灵活使用', features: ['无水印高清物料', '四大风土模板', '适合低频上新商家'] },
  { name: '商家标准月卡', short: '标准月卡', price: '39', unit: '元 / 月', credits: '420', desc: '日常经营的得力帮手', note: '持续上新，创作更从容', features: ['无水印高清物料', '合规检测与极速队列', '适合稳定经营的商家'], recommended: true },
  { name: '旗舰企业季卡', short: '企业季卡', price: '299', unit: '元 / 季', credits: '3300', desc: '多店铺、大批量也从容', note: '季度方案，助力规模化', features: ['包含标准月卡权益', '批量并发创作', '适合多店铺与企业团队'] },
];
const benefits = [
  { name: '无水印高清', available: [false, true, true, true] },
  { name: '四大风土模板', available: [true, true, true, true] },
  { name: '合规检测', available: [false, false, true, true] },
  { name: '极速队列', available: [false, false, true, true] },
  { name: '批量并发', available: [false, false, false, true] },
];

export function PricingPage() {
  return (
    <div className="page pricing">
      <header className="pricing-heading"><span className="eyebrow"><LeafIcon size={15} /> 好设计，也可以是小成本</span><h1>把预算花在好产品上，<br /><span>让创作轻一点。</span></h1><p>从第一张主图，到每一次上新。选一份适合你的创作计划。</p><span className="pricing-heading__pill">透明积分 · 按需选择 · 积分永久有效</span></header>
      <section className="pricing-plans" aria-label="创作套餐">
        {plans.map(plan => (
          <Card key={plan.name} padding="lg" variant="outlined" className={`pricing-plan${plan.recommended ? ' pricing-plan--recommended' : ''}`}>
            <div className="pricing-plan__ribbon">{plan.recommended ? <><SparklesIcon size={14} /> 推荐 · 商家之选</> : '灵活选择'}</div>
            <p className="pricing-plan__desc">{plan.desc}</p><h2>{plan.name}</h2>
            <p className="pricing-plan__price"><strong>{plan.price}</strong><span>{plan.unit}</span></p>
            <p className="pricing-plan__credits"><strong>{plan.credits}</strong> 积分</p><p className="pricing-plan__note">{plan.note}</p>
            <Button block disabled variant={plan.recommended ? 'primary' : 'secondary'}>{plan.price === '0' ? '免费试用' : '选择套餐'} · 待接入</Button>
            <ul>{plan.features.map(feature => <li key={feature}><CheckIcon size={15} />{feature}</li>)}</ul>
          </Card>
        ))}
      </section>
      <aside className="pricing-credit-note" aria-label="积分规则"><span className="pricing-credit-note__icon"><SparklesIcon size={24} /></span><div><h2>积分简单算，创作放心用</h2><p><strong>1 元 = 10 积分</strong><span aria-hidden="true"> · </span>积分永久有效，不因月卡或季卡到期而失效。</p><p>套餐内含赠送积分，具体额度以上方套餐为准；不同物料的积分消耗以后续功能上线为准。</p></div></aside>
      <section className="pricing-comparison" aria-labelledby="pricing-benefits-title"><div className="pricing-comparison__head"><span className="eyebrow">每一份投入，都清清楚楚</span><h2 id="pricing-benefits-title">找到适合你的权益组合</h2><p>所有方案都从新疆风土出发，让好产品有更好的表达。</p></div>
        <div className="pricing-table-wrap"><table className="pricing-table"><caption className="visually-hidden">四种创作套餐权益对比</caption><thead><tr><th scope="col">套餐权益</th>{plans.map(plan => <th key={plan.name} scope="col" className={plan.recommended ? 'pricing-table__recommended' : ''}>{plan.short}</th>)}</tr></thead><tbody>{benefits.map(benefit => <tr key={benefit.name}><th scope="row">{benefit.name}</th>{benefit.available.map((included, index) => <td key={plans[index].name} className={plans[index].recommended ? 'pricing-table__recommended' : ''}>{included ? <><CheckIcon size={18} /><span className="visually-hidden">包含</span></> : <><span aria-hidden="true" className="pricing-table__dash">—</span><span className="visually-hidden">不包含</span></>}</td>)}</tr>)}</tbody></table></div>
        <p className="pricing-ui-note">当前为套餐 UI 展示，权益分配为展示方案，待正式接入时确认；注册、充值、订阅与支付尚未开放，不会产生扣款或自动续费。</p>
      </section>
      <div className="pricing-footer-note"><LeafIcon size={18} /><p>从一颗新疆好果开始，让每一次创作都物有所值。</p></div>
    </div>
  );
}
