
import { getProducts } from '../../../lib/api';
import Image from 'next/image';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Quản lý sản phẩm</h1>
        <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '0.25rem' }}>
          Thêm sản phẩm mới
        </button>
      </div>

      <table style={{ width: '100%', marginTop: '2rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Hình ảnh</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Tên sản phẩm</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Giá</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.5rem' }}>
                <Image src={product.imageUrls[0]} alt={product.name} width={50} height={50} style={{ objectFit: 'cover' }} />
              </td>
              <td style={{ padding: '0.5rem' }}>{product.name}</td>
              <td style={{ padding: '0.5rem' }}>{product.price.toLocaleString('vi-VN')}₫</td>
              <td style={{ padding: '0.5rem' }}>
                <button style={{ marginRight: '0.5rem' }}>Sửa</button>
                <button style={{ color: '#e53e3e' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
