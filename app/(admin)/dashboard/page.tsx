
// app/(admin)/dashboard/page.tsx
import { getAllProducts } from "../../../lib/api";
import { Product } from "../../../types";
import Link from "next/link";

export default async function DashboardPage() {
  const products = await getAllProducts();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Bảng điều khiển</h1>
        <Link href="/dashboard/products/new" style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>
          + Thêm sản phẩm
        </Link>
      </div>

      <p>Chào mừng đến với trang quản trị. Dưới đây là danh sách các sản phẩm hiện có.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eaeaea' }}>
              <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f9f9f9' }}>Tên sản phẩm</th>
              <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f9f9f9' }}>Giá</th>
              <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f9f9f9' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product._id} style={{ borderBottom: '1px solid #eaeaea' }}>
                <td style={{ padding: '12px', fontWeight: 500 }}>{product.name}</td>
                <td style={{ padding: '12px' }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </td>
                <td style={{ padding: '12px' }}>
                  <Link href={`/dashboard/products/${product._id}/edit`} style={{ color: '#0070f3', textDecoration: 'none', marginRight: '1rem' }}>Sửa</Link>
                  {/* Delete would need a client component and a form action/API call */}
                  <button style={{ color: '#f44336', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Xóa</button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
