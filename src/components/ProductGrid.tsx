
// src/components/ProductGrid.tsx
'use client'; 
import React, { useState, useEffect } from 'react';
// Thay đổi: Nhập từ dữ liệu hardcode
import { getProducts } from '../data/products'; 
import { Product } from '../types';
import ProductCard from './ProductCard'; 

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Thay đổi: Gọi hàm getProducts từ tệp dữ liệu
        const data = await getProducts(); 
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        // Cập nhật thông báo lỗi
        setError("Không thể tải sản phẩm. Vui lòng kiểm tra tệp dữ liệu.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ... phần còn lại của component không thay đổi ...

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <p className="text-xl text-gray-600">Đang tải sản phẩm...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <p className="text-xl text-red-500">Lỗi: {error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Bộ Sưu Tập Vải</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => {
            // Đơn giản hóa vì dữ liệu đã nhất quán
            const productForCard = {
                ...product,
                id: product._id,
                type: product.category,
                price: product.price.toLocaleString('vi-VN') + 'đ/m', 
                image: product.imageUrls[0] || '/images/placeholder.png', 
            };

            return (
                <ProductCard 
                    key={productForCard.id} 
                    product={productForCard as any}
                />
            );
          })}
        </div>
        
        {products.length === 0 && (
          <p className="text-center text-gray-500">Không có sản phẩm nào được định nghĩa trong `src/data/products.ts`.</p>
        )}
      </div>
    </section>
  );
}
