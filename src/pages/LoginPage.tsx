import { Button, Card, Input } from '../components';
import './Login.css';

export function LoginPage() {
  return (
    <div className="page">
      <div className="login">
        <div className="page-head">
          <span className="eyebrow">账号</span>
          <h1 className="page-title">登录疆果智创</h1>
          <p className="page-desc">
            登录后可保存作品、管理会员。当前为界面阶段，不会发送验证码，
            也不会保存你输入的内容。
          </p>
        </div>

        <Card padding="lg">
          <form className="login__form" onSubmit={(event) => event.preventDefault()}>
            <Input
              label="手机号"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="请输入 11 位手机号"
            />
            <Input
              label="短信验证码"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="请输入 6 位验证码"
              hint="界面阶段不发送短信验证码。"
              addon={
                <Button variant="ghost" size="sm" disabled>
                  获取验证码
                </Button>
              }
            />
            <Button type="submit" size="lg" block>
              登录（待接入）
            </Button>
          </form>

          <div className="login__alt">
            <p className="small muted">在微信中打开时，可改用微信授权登录。</p>
            <Button variant="accent" block disabled>
              微信一键登录（待接入）
            </Button>
          </div>

          <p className="login__terms small muted">
            继续即表示同意《用户协议》与《隐私政策》，正式条款由后续阶段接入。
          </p>
        </Card>
      </div>
    </div>
  );
}