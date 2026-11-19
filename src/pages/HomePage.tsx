import { Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../features/products/productsSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("vi");
    return items.filter((product) => product.title.toLocaleLowerCase("vi").includes(query));
  }, [items, search]);

  return (
    <div className="page-wrap home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> MÓN ĐỒ BẠN SẼ YÊU</span>
          <h1>Một chút vui,<br /><span>mỗi ngày.</span></h1>
          <p>Những món đồ hay ho, được tuyển chọn để làm ngày của bạn thêm dễ chịu.</p>
          <a className="hero-cta" href="#products">Khám phá ngay <span>↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-sun">☼</div>
          <div className="hero-note note-top">good things<br />inside</div>
          <div className="hero-note note-bottom">find your<br />little joy <span>✳</span></div>
          <div className="hero-product-image"><img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png" alt="" /></div>
          <div className="hero-sticker">SHOP<br />SMALL<br />♡</div>
        </div>
        <div className="hero-index"><span>01</span> / 04</div>
      </section>

      <section className="catalog-section" id="products">
        <div className="section-heading">
          <div>
            <span className="eyebrow section-eyebrow">BỘ SƯU TẬP CỦA CHÚNG MÌNH</span>
            <h2>Chọn món bạn thích<span className="heading-period">.</span></h2>
          </div>
          <label className="search-box">
            <Search size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm sản phẩm..." aria-label="Tìm sản phẩm theo tên" />
            {search && <button type="button" className="clear-search" onClick={() => setSearch("")} aria-label="Xóa tìm kiếm">×</button>}
          </label>
        </div>

        {status === "loading" && (
          <div className="product-grid" aria-label="Đang tải sản phẩm">
            {Array.from({ length: 8 }, (_, index) => <div className="skeleton-card" key={index}><div className="skeleton-image" /><div className="skeleton-line" /><div className="skeleton-line short" /></div>)}
          </div>
        )}
        {status === "failed" && (
          <div className="state-card error-state">
            <span className="state-icon">!</span>
            <h3>Chưa tải được sản phẩm</h3>
            <p>{error}</p>
            <button className="primary-button" onClick={() => void dispatch(fetchProducts())}>Thử lại</button>
          </div>
        )}
        {status === "succeeded" && filteredProducts.length > 0 && (
          <>
            <div className="catalog-meta"><span>{search ? `${filteredProducts.length} kết quả` : "Tất cả sản phẩm"}</span><span>{String(filteredProducts.length).padStart(2, "0")} món</span></div>
            <div className="product-grid">
              {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
            </div>
          </>
        )}
        {status === "succeeded" && filteredProducts.length === 0 && (
          <div className="state-card">
            <span className="state-icon"><Search size={20} /></span>
            <h3>Chưa tìm thấy món này</h3>
            <p>Thử một từ khóa khác để khám phá thêm nhé.</p>
            <button className="text-button" onClick={() => setSearch("")}>Xem tất cả sản phẩm</button>
          </div>
        )}
      </section>
    </div>
  );
}
