import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page-wrap not-found-page">
      <span className="not-found-number">404</span>
      <span className="eyebrow">ÔI, KHÔNG TÌM THẤY TRANG NÀY</span>
      <h1>Đi lạc một chút<br />rồi nhỉ<span className="heading-period">?</span></h1>
      <p>Đường dẫn này không tồn tại hoặc đã được chuyển đi nơi khác.</p>
      <Link to="/" className="primary-button button-link"><ArrowLeft size={17} /> Về trang chủ</Link>
      <span className="not-found-star">✳</span>
    </div>
  );
}
