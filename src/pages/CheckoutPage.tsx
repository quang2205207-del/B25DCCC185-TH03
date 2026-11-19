import { ArrowLeft, Check, PackageCheck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearCart, selectCartItems, selectCartTotal } from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(price);
}

export default function CheckoutPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const placeOrder = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="page-wrap success-page">
        <div className="success-icon"><Check size={32} /></div>
        <span className="eyebrow">ĐẶT HÀNG THÀNH CÔNG</span>
        <h1>Cảm ơn bạn,<br /><span>{user?.username}.</span></h1>
        <p>Đơn hàng của bạn đã được ghi nhận. Một niềm vui nhỏ đang trên đường đến!</p>
        <Link className="primary-button button-link" to="/">Tiếp tục khám phá <span>→</span></Link>
        <span className="success-sparkle">✳</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page-wrap checkout-empty">
        <div className="empty-cart-icon"><ShoppingBag size={26} /></div>
        <h1>Chưa có gì để thanh toán.</h1>
        <p>Thêm sản phẩm vào giỏ trước khi đặt hàng nhé.</p>
        <Link className="primary-button button-link" to="/">Khám phá sản phẩm</Link>
      </div>
    );
  }

  return (
    <div className="page-wrap checkout-page">
      <Link to="/cart" className="back-link"><ArrowLeft size={16} /> Quay lại giỏ hàng</Link>
      <div className="checkout-heading"><span className="eyebrow">CHỈ CÒN MỘT BƯỚC NỮA</span><h1>Thanh toán<span className="heading-period">.</span></h1><p>Xin chào, {user?.username}. Kiểm tra lại đơn hàng nhé.</p></div>
      <div className="checkout-card">
        <div className="checkout-items">
          <div className="checkout-section-title"><PackageCheck size={18} /><h2>Đơn hàng của bạn</h2></div>
          {items.map(({ product, quantity }) => (
            <div className="checkout-product" key={product.id}>
              <div className="checkout-product-image"><img src={product.image} alt={product.title} /><span>{quantity}</span></div>
              <span className="checkout-product-name">{product.title}</span>
              <strong>{formatPrice(product.price * quantity)}</strong>
            </div>
          ))}
        </div>
        <aside className="checkout-total-panel">
          <span className="eyebrow">TỔNG THANH TOÁN</span>
          <div className="checkout-total-amount">{formatPrice(total)}</div>
          <p>Phí vận chuyển miễn phí</p>
          <div className="checkout-assurance"><Check size={15} /> Thông tin đơn hàng đã được xác nhận</div>
          <button className="primary-button place-order-button" onClick={placeOrder}>Đặt hàng <span>→</span></button>
          <span className="checkout-safe">✳ Thanh toán an toàn & bảo mật</span>
        </aside>
      </div>
    </div>
  );
}
