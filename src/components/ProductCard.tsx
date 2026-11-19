import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import type { Product } from "../types";

const categoryLabels: Record<string, string> = {
  "men's clothing": "Thời trang nam",
  "women's clothing": "Thời trang nữ",
  electronics: "Điện tử",
  jewelry: "Trang sức",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const dispatch = useAppDispatch();

  return (
    <article className="product-card" style={{ animationDelay: `${index * 55}ms` }}>
      <Link to={`/products/${product.id}`} className="product-image-wrap" aria-label={`Xem ${product.title}`}>
        <span className="product-category">{categoryLabels[product.category] ?? product.category}</span>
        <img src={product.image} alt={product.title} loading="lazy" />
        <span className="image-arrow"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="product-info">
        <Link to={`/products/${product.id}`} className="product-title">{product.title}</Link>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button className="add-button" onClick={() => dispatch(addToCart(product))} aria-label={`Thêm ${product.title} vào giỏ`}>
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
