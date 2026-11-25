import { useNavigate } from 'react-router-dom';
import { Button, Card, CheckIcon } from '../components';
import './Pricing.css';

interface Plan {
  name: string;
  price: string;
  unit: string;
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

const plans: Plan[] = [
  {
    name: '免费体验',
    price: '¥0',
    unit: '/ 首次',
    tagline: '先看看生成效果',
    features: ['3 张主图预览', '基础风土场景', '带水印下载'],
    cta: '免费试用',
  },
  {
    name: '创作月卡',
    price: '¥39',
    unit: '/ 月',
    tagline: '适合稳定出货的店铺',
    features: ['每月 60 张成品', '全部风土场景', '无水印下载', '种草图文模板'],
    cta: '登录后开通',
    highlight: true,
  },
  {
    name: '商家版',
    price: '¥199',
    unit: '/ 月',
    tagline: '多平台铺货的团队',
    features: ['不限生成次数', '短视频物料', '批量导出', '专属客服'],
    cta: '联系商务',
  },
];

export function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">会员与定价</span>
        <h1 className="page-title">按你的出货节奏付费</h1>
        <p className="page-desc">
          先免费试一张，确认效果再开会员。所有套餐都包含主图、种草图文与短视频物料，
          开通与支付流程将在后续阶段接入。
        </p>
      </div>

      <div className="grid grid--3 pricing-grid">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            padding="lg"
            className={`plan${plan.highlight ? ' plan--highlight' : ''}`}
          >
            {plan.highlight && <span className="badge plan__badge">最多商家选择</span>}

            <div className="plan__head">
              <h2 className="plan__name">{plan.name}</h2>
              <p className="plan__tagline">{plan.tagline}</p>
            </div>

            <p className="plan__price">
              <span className="plan__amount">{plan.price}</span>
              <span className="plan__unit">{plan.unit}</span>
            </p>

            <ul className="plan__features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon size={14} />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              block
              variant={plan.highlight ? 'primary' : 'secondary'}
              onClick={() => navigate('/login')}
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>

      <p className="small muted">
        以上价格为界面示例，最终价格与权益由运营配置；当前阶段不提供支付入口。
      </p>
    </div>
  );
}