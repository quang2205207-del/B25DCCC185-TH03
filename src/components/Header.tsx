import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Moon, ShoppingBag, Sun } from "lucide-react";
import { useAppSelector } from "../app/hooks";
import { selectCartCount } from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const itemCount = useAppSelector(selectCartCount);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="ShopMini - Trang chủ">
          <span className="brand-mark"><ShoppingBag size={19} strokeWidth={2.5} /></span>
          <span>shop<span className="brand-accent">mini</span></span>
        </Link>
        <nav className="main-nav" aria-label="Điều hướng chính">
          <NavLink to="/" end>Khám phá</NavLink>
          <NavLink to="/cart">Giỏ hàng</NavLink>
        </nav>
        <div className="header-actions">
          {user ? (
            <div className="user-chip">
              <span className="user-avatar">{user.username.slice(0, 1).toUpperCase()}</span>
              <span className="user-name">{user.username}</span>
              <button className="icon-button logout-button" onClick={handleLogout} aria-label="Đăng xuất" title="Đăng xuất">
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <Link className="login-link" to="/login">Đăng nhập</Link>
          )}
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={theme === "light" ? "Bật giao diện tối" : "Bật giao diện sáng"} title="Đổi giao diện">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link className="cart-button" to="/cart" aria-label={`Giỏ hàng, ${itemCount} sản phẩm`}>
            <ShoppingBag size={19} />
            <span className="cart-label">Giỏ hàng</span>
            <span className="cart-count">{itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
