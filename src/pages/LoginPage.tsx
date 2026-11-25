import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BrandMark, Button, Card, Input, LeafIcon, SparklesIcon } from '../components';
import './Login.css';

/** 微信图标：内联 SVG，零外链 */
function WeChatIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9.2 3.4c-4 0-7.2 2.6-7.2 5.9 0 1.9 1.1 3.6 2.9 4.7l-.8 2.5 2.9-1.4c.7.2 1.4.3 2.2.3h.5a5.6 5.6 0 0 1-.2-1.5c0-3.2 3-5.7 6.7-5.7h.6c-.7-2.8-3.7-4.8-7.6-4.8Zm-2.5 3.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      <path d="M22 13.7c0-2.7-2.6-4.9-5.9-4.9s-5.9 2.2-5.9 4.9 2.6 4.9 5.9 4.9c.7 0 1.3-.1 1.9-.3l2.4 1.2-.7-2.1c1.4-.9 2.3-2.2 2.3-3.7Zm-7.9-1.6a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Zm4.1 0a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Z" />
    </svg>
  );
}

export function LoginPage() {
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // 界面阶段：不发送验证码、不发起登录请求
    event.preventDefault();
  }

  return (
    <div className="page login">
      <div className="login__grid">
        <section className="login__intro" aria-labelledby="login-title">
          <span className="eyebrow">
            <SparklesIcon size={14} />
            账号
          </span>

          <div className="login__brand">
            <BrandMark size={44} className="login__mark" />
            <div>
              <p className="login__brand-name">疆果智创</p>
              <p className="login__brand-tag">新疆风土 · AIGC 营销物料</p>
            </div>
          </div>

          <h1 className="login__title" id="login-title">
            欢迎回来，<br />
            继续做能卖货的物料
          </h1>

          <p className="login__lead">
            登录后可以保存作品、随时重新下载，也能查看会员额度。
            现在还没接后台，下面只展示界面，不会发送短信，也不会保存你输入的内容。
          </p>

          <ul className="login__perks">
            <li>作品云端留存，换手机也能找回</li>
            <li>胡杨林、葡萄架等风土场景全量可用</li>
            <li>主图 / 图文 / 短视频一次生成</li>
          </ul>
        </section>

        <Card padding="lg" className="login__panel">
          <form className="login__form" onSubmit={handleSubmit}>
            <Input
              label="手机号"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="请输入 11 位手机号"
              maxLength={11}
            />

            <Input
              label="短信验证码"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="请输入 6 位验证码"
              maxLength={6}
              addon={
                <Button variant="ghost" size="sm" disabled>
                  获取验证码
                </Button>
              }
              hint="界面阶段不发送短信，验证码按钮为占位状态。"
            />

            <Button type="submit" size="lg" block>
              登录
            </Button>

            <p className="login__pending small">功能待接入：当前点击不会发起任何请求。</p>
          </form>

          <div className="login__alt">
            <p className="login__divider">
              <span>或</span>
            </p>
            <Button variant="secondary" size="lg" block icon={<WeChatIcon />} disabled>
              微信登录
            </Button>
            <p className="login__pending small">功能待接入：微信授权与公众号内登录稍后开放。</p>
          </div>

          <label className="login__agree">
            <input
              type="checkbox"
              className="login__agree-box"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span className="login__agree-text">
              我已阅读并同意
              <Link to="/login" className="login__link">
                《用户协议》
              </Link>
              与
              <Link to="/login" className="login__link">
                《隐私政策》
              </Link>
            </span>
          </label>

          <div className="login__compliance" role="note">
            <LeafIcon size={16} />
            <p>
              <strong>AI 生成内容标识说明：</strong>
              本产品生成的图片与视频均为人工智能合成内容。按相关法规要求，
              成品会附带显式标识；正式上线前，标识样式与展示位置会在此页说明。
            </p>
          </div>
        </Card>
      </div>

      <p className="login__foot small muted">
        还没有账号？
        <Link to="/upload" className="login__link">
          先去制作第一套物料
        </Link>
      </p>
    </div>
  );
}
