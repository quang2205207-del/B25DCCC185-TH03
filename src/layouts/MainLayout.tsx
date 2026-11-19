import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content"><Outlet /></main>
      <footer className="site-footer">
        <span className="footer-brand">shop<span>mini</span></span>
        <span>Mua sắm vui hơn, mỗi ngày.</span>
        <span>© 2026 ShopMini</span>
      </footer>
    </div>
  );
}
