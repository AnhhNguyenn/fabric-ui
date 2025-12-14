'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '../../../lib/api';
import { Product } from '../../../types';

// Giao diện (đã được sửa lại) cho trang thêm sản phẩm mới
export default function NewProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState<Omit<Product, '_id' | 'slug'>>({
    name: '',
    price: 0,
    description: '',
    imageUrls: ['', ''], // Bắt đầu với 2 trường nhập URL ảnh
    colors: [{ name: '', hex: '' }], // Bắt đầu với 1 trường nhập màu
    tags: [],
  });
  const [tagsInput, setTagsInput] = useState(''); // Dùng để nhập tags dạng chuỗi
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleColorChange = (index: number, field: 'name' | 'hex', value: string) => {
    const newColors = [...product.colors];
    newColors[index][field] = value;
    setProduct(prev => ({ ...prev, colors: newColors }));
  };

  const addColorField = () => {
    setProduct(prev => ({ ...prev, colors: [...prev.colors, { name: '', hex: '' }] }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...product.imageUrls];
    newImageUrls[index] = value;
    setProduct(prev => ({ ...prev, imageUrls: newImageUrls }));
  }

  const addImageUrlField = () => {
    setProduct(prev => ({...prev, imageUrls: [...prev.imageUrls, '']}));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const productData = { 
        ...product, 
        tags: tagsArray,
        // Lọc ra các URL rỗng trước khi gửi
        imageUrls: product.imageUrls.filter(url => url.trim() !== ''),
      };

      // Gọi hàm createProduct từ lib/api.ts
      const newProduct = await createProduct(productData);
      
      alert(`Sản phẩm "${newProduct.name}" đã được tạo thành công!`);
      
      // Chuyển hướng về trang dashboard
      router.push('/dashboard');

    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra khi tạo sản phẩm.');
    } finally {
      setIsLoading(false);
    }
  };

  const formStyles: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '700px', margin: 'auto' };
  const inputStyles: React.CSSProperties = { width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' };
  const labelStyles: React.CSSProperties = { fontWeight: 500, marginBottom: '0.25rem', display: 'block' };
  const buttonStyles: React.CSSProperties = { padding: '0.8rem', backgroundColor: isLoading ? '#ccc' : '#1a1a1a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '2.5rem', textAlign: 'center' }}>Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div>
          <label htmlFor="name" style={labelStyles}>Tên sản phẩm</label>
          <input id="name" name="name" type="text" value={product.name} onChange={handleInputChange} required style={inputStyles} />
        </div>

        <div>
          <label htmlFor="price" style={labelStyles}>Giá (VND)</label>
          <input id="price" name="price" type="number" value={product.price} onChange={handleInputChange} required style={inputStyles} />
        </div>

        <div>
          <label htmlFor="description" style={labelStyles}>Mô tả</label>
          <textarea id="description" name="description" value={product.description} onChange={handleInputChange} rows={5} style={inputStyles} />
        </div>

        <div>
          <label style={labelStyles}>Đường dẫn hình ảnh</label>
          {product.imageUrls.map((url, index) => (
            <input key={index} type="text" value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} style={{...inputStyles, marginBottom: '0.5rem'}} placeholder={`URL hình ảnh ${index + 1}`} />
          ))}
          <button type="button" onClick={addImageUrlField} style={{...buttonStyles, fontSize: '0.8rem', padding: '0.4rem 0.8rem', backgroundColor: '#4a5568'}}>+ Thêm ảnh</button>
        </div>

        <div>
          <label style={labelStyles}>Màu sắc</label>
          {product.colors.map((color, index) => (
            <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <input type="text" value={color.name} onChange={(e) => handleColorChange(index, 'name', e.target.value)} placeholder="Tên màu (ví dụ: Hồng Pastel)" style={{...inputStyles, width: '60%'}} />
              <input type="text" value={color.hex} onChange={(e) => handleColorChange(index, 'hex', e.target.value)} placeholder="Mã hex (ví dụ: #FFD1DC)" style={{...inputStyles, width: '40%'}} />
            </div>
          ))}
          <button type="button" onClick={addColorField} style={{...buttonStyles, fontSize: '0.8rem', padding: '0.4rem 0.8rem', backgroundColor: '#4a5568'}}>+ Thêm màu</button>
        </div>

        <div>
          <label htmlFor="tags" style={labelStyles}>Tags (phân cách bởi dấu phẩy)</label>
          <input id="tags" type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} style={inputStyles} placeholder="váy, lụa, mùa hè..." />
        </div>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>Lỗi: {error}</p>}

        <button type="submit" disabled={isLoading} style={buttonStyles}>
          {isLoading ? 'Đang tạo...' : 'Tạo sản phẩm'}
        </button>
      </form>
    </div>
  );
}
