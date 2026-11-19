import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeFromCart, selectCartItems, selectCartTotal, updateQuantity } from "../features/cart/cartSlice";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(price);
}

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <div className="page-wrap">
        <div className="cart-heading"><span className="eyebrow">TÚI ĐỒ CỦA BẠN</span><h1>Giỏ hàng<span className="heading-period">.</span></h1></div>
        <div className="empty-cart">
          <div className="empty-cart-icon"><ShoppingBag size={28} /></div>
          <span className="eyebrow">CÒN NHIỀU ĐIỀU ĐANG CHỜ</span>
          <h2>Giỏ hàng đang trống.</h2>
          <p>Hãy dạo quanh một chút và tìm món đồ khiến bạn mỉm cười.</p>
          <Link className="primary-button button-link" to="/">Khám phá sản phẩm <ArrowRight size={17} /></Link>
          <span className="empty-doodle">✳</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="cart-heading"><span className="eyebrow">TÚI ĐỒ CỦA BẠN</span><h1>Giỏ hàng<span className="heading-period">.</span></h1><p>{items.length} món đồ đang đợi bạn.</p></div>
      <div className="cart-layout">
        <section className="cart-items" aria-label="Sản phẩm trong giỏ">
          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <Link to={`/products/${product.id}`} className="cart-item-image"><img src={product.image} alt={product.title} /></Link>
              <div className="cart-item-info">
                <span className="eyebrow cart-item-category">{product.category}</span>
                <Link to={`/products/${product.id}`} className="cart-item-title">{product.title}</Link>
                <span className="cart-item-price">{formatPrice(product.price)}</span>
                <div className="quantity-control">
                  <button aria-label="Giảm số lượng" onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }))} disabled={quantity <= 1}><Minus size={14} /></button>
                  <span>{quantity}</span>
                  <button aria-label="Tăng số lượng" onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }))}><Plus size={14} /></button>
                </div>
              </div>
              <div className="cart-item-end">
                <strong>{formatPrice(product.price * quantity)}</strong>
                <button className="remove-button" onClick={() => dispatch(removeFromCart(product.id))} aria-label={`Xóa ${product.title}`}><Trash2 size={17} /></button>
              </div>
            </article>
          ))}
          <Link to="/" className="continue-shopping"><span>←</span> Tiếp tục mua sắm</Link>
        </section>
        <aside className="order-summary">
          <span className="eyebrow">TÓM TẮT ĐƠN HÀNG</span>
          <h2>Một lựa chọn<br />thật tuyệt.</h2>
          <div className="summary-row"><span>Tạm tính</span><span>{formatPrice(total)}</span></div>
          <div className="summary-row"><span>Phí vận chuyển</span><span className="free-shipping">Miễn phí</span></div>
          <div className="summary-total"><span>Tổng cộng</span><strong>{formatPrice(total)}</strong></div>
          <Link to="/checkout" className="primary-button checkout-button">Tiến hành thanh toán <ArrowRight size={17} /></Link>
          <p className="summary-footnote">Thanh toán an toàn · Giao hàng tận nơi</p>
          <span className="summary-sparkle">✳</span>
        </aside>
      </div>
    </div>
  );
}
