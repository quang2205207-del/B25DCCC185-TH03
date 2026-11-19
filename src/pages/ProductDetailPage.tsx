import { ArrowLeft, Check, Plus, ShoppingBag, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(price);
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useAppSelector((state) => state.products.items.find((item) => item.id === Number(id)));
  const status = useAppSelector((state) => state.products.status);
  const dispatch = useAppDispatch();

  if (status === "loading" || status === "idle") {
    return <div className="page-wrap detail-loading"><div className="detail-skeleton" /><div className="detail-skeleton-copy"><div className="skeleton-line short" /><div className="skeleton-line" /><div className="skeleton-line" /></div></div>;
  }

  if (!product) {
    return (
      <div className="page-wrap state-card not-found-product">
        <span className="state-icon">?</span>
        <h2>Không tìm thấy sản phẩm</h2>
        <p>Sản phẩm này có thể đã rời khỏi cửa hàng.</p>
        <Link className="primary-button button-link" to="/">Quay lại cửa hàng</Link>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Quay lại cửa hàng</Link>
      <section className="detail-layout">
        <div className="detail-image-panel">
          <span className="detail-image-tag">SHOPMINI SELECTED</span>
          <img src={product.image} alt={product.title} />
          <span className="detail-image-caption">Một lựa chọn nhỏ, niềm vui lớn.</span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow detail-category">{product.category}</span>
          <h1>{product.title}</h1>
          <div className="detail-rating"><span className="rating-stars"><Star size={15} fill="currentColor" /> 4.8</span><span>Được yêu thích bởi khách hàng</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price">{formatPrice(product.price)} <span>Đã bao gồm thuế</span></div>
          <button className="primary-button add-to-cart-button" onClick={() => dispatch(addToCart(product))}><ShoppingBag size={18} /> Thêm vào giỏ <Plus size={16} /></button>
          <div className="detail-perks"><span><Check size={15} /> Sản phẩm chính hãng</span><span><Check size={15} /> Đổi trả trong 7 ngày</span></div>
          <div className="detail-note">Được tuyển chọn kỹ lưỡng <span>✳</span> Gói quà miễn phí theo yêu cầu</div>
        </div>
      </section>
    </div>
  );
}
