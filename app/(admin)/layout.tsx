
// app/(admin)/layout.tsx

import '../globals.scss';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside style={{ width: '250px', backgroundColor: '#f7fafc', padding: '1rem', borderRight: '1px solid #e2e8f0' }}>
        <h2>Trang quản trị</h2>
        <nav>
          <ul>
            <li><a href="/admin/dashboard">Tổng quan</a></li>
            <li><a href="/admin/products">Sản phẩm</a></li>
            <li><a href="/admin/orders">Đơn hàng</a></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
