import { ArrowLeft, ArrowRight, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface RedirectState {
  from: Pick<Location, "pathname" | "search" | "hash">;
}

function isRedirectState(value: unknown): value is RedirectState {
  if (typeof value !== "object" || value === null || !("from" in value)) {
    return false;
  }
  const from = value.from;
  return typeof from === "object" && from !== null && "pathname" in from && typeof from.pathname === "string";
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectState = isRedirectState(location.state) ? location.state : null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const isAuthenticated = login(username, password);
    if (!isAuthenticated) {
      setError("Tên đăng nhập hoặc mật khẩu chưa đúng. Thử lại nhé.");
      setIsSubmitting(false);
      return;
    }

    const destination = redirectState?.from;
    navigate(destination ? `${destination.pathname}${destination.search}${destination.hash}` : "/", { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <Link className="brand login-brand" to="/"><span className="brand-mark"><Sparkles size={18} /></span><span>shop<span className="brand-accent">mini</span></span></Link>
        <div className="login-visual-copy">
          <span className="eyebrow">CHÀO MỪNG BẠN TRỞ LẠI</span>
          <h1>Thêm một chút<br /><em>vui vẻ.</em></h1>
          <p>Những món đồ yêu thích vẫn đang chờ bạn.</p>
        </div>
        <div className="login-decoration">✳</div>
        <span className="login-visual-footer">GOOD THINGS, SMALL MOMENTS.</span>
      </div>
      <div className="login-form-side">
        <Link to="/" className="back-link login-back"><ArrowLeft size={16} /> Về cửa hàng</Link>
        <div className="login-form-wrap">
          <span className="eyebrow">TÀI KHOẢN SHOPMINI</span>
          <h2>Đăng nhập<span className="heading-period">.</span></h2>
          <p className="login-intro">Đăng nhập để tiếp tục trải nghiệm mua sắm.</p>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username">Tên đăng nhập</label>
            <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" placeholder="Tên của bạn" required />
            <label htmlFor="password">Mật khẩu</label>
            <div className="password-field"><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" placeholder="Nhập mật khẩu" required /><LockKeyhole size={17} /></div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="primary-button login-submit" disabled={isSubmitting}>Đăng nhập <ArrowRight size={17} /></button>
          </form>
          <div className="demo-hint"><span className="demo-dot" /><span>Demo: nhập mật khẩu <strong>123456</strong> để đăng nhập.</span></div>
          <p className="login-terms">Tiếp tục đồng nghĩa với việc bạn đồng ý với các điều khoản sử dụng của ShopMini.</p>
        </div>
      </div>
    </div>
  );
}
