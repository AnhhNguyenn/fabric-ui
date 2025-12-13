
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '../../../lib/api';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// Trang này cần là Server Component để fetch dữ liệu lúc build hoặc request
export default async function AdminProductsPage() {
  // Lấy dữ liệu sản phẩm từ API
  const products = await getAllProducts();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Quản lý Sản phẩm</h1>
        {/* Nút này sẽ dẫn đến trang tạo sản phẩm mới sau này */}
        <Link href="/admin/products/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#3182ce', color: 'white', borderRadius: '0.5rem' }}>
          <PlusCircle size={20} />
          Thêm Sản phẩm
        </Link>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f7fafc' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>Hình ảnh</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>Tên sản phẩm</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>Giá</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>Màu sắc</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem' }}>
                  <Image src={product.imageUrls[0]} alt={product.name} width={60} height={60} style={{ objectFit: 'cover', borderRadius: '0.25rem' }} />
                </td>
                <td style={{ padding: '0.75rem', fontWeight: '500' }}>{product.name}</td>
                <td style={{ padding: '0.75rem' }}>{product.price.toLocaleString('vi-VN')}₫</td>
                <td style={{ padding: '0.75rem' }}>
                  {/* Hiển thị bảng màu nhỏ */}
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {product.colors.map(color => (
                          <span key={color.name} style={{ width: '20px', height: '20px', backgroundColor: color.hex, borderRadius: '50%', border: '1px solid #ccc' }} title={color.name}></span>
                      ))}
                  </div>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {/* Các nút này sẽ có chức năng sau */}
                    <button title="Sửa" style={{ color: '#3182ce' }}><Edit size={18} /></button>
                    <button title="Xóa" style={{ color: '#e53e3e' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
