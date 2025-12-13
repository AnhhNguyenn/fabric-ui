'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Giao diện (thô sơ) cho trang thêm sản phẩm mới
export default function NewProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const newProduct = {
      name,
      description,
      price,
      // Các trường khác sẽ được thêm vào sau (màu sắc, hình ảnh...)
      slug: name.toLowerCase().replace(/\s+/g, '-'), // slug đơn giản
      imageUrls: ['https://via.placeholder.com/300'], // Ảnh placeholder
      colors: [{ name: 'Default', hex: '#000000' }], // Màu placeholder
    };

    try {
      const response = await fetch('https://api-server-plum.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể tạo sản phẩm');
      }

      alert('Sản phẩm đã được tạo thành công!');
      // Chuyển hướng về trang quản lý sản phẩm
      router.push('/admin/products');
      // Revalidate cache cho trang products - tính năng nâng cao hơn
      // await fetch('/api/revalidate?path=/admin/products')

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <div>
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="description">Mô tả</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="price">Giá (VND)</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

        <button type="submit" disabled={isLoading} style={{ padding: '0.75rem', backgroundColor: isLoading ? '#ccc' : '#3182ce', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isLoading ? 'Đang tạo...' : 'Tạo sản phẩm'}
        </button>
      </form>
    </div>
  );
}
