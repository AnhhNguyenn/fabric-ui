// src/components/ProductGrid.tsx
'use client'; 
import React, { useState, useEffect } from 'react';
import { productApi } from '../utils/api'; 
import { Product, Category } from '../types';
import ProductCard from './ProductCard'; 

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getAll(); 
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Không thể tải sản phẩm. Vui lòng kiểm tra kết nối API.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
            const categoryName = typeof product.category === 'object' 
                ? (product.category as Category).name 
                : 'Khác';
            
            // Ánh xạ data API sang props component ProductCard cũ
            const productForCard = {
                ...product,
                id: product._id as any, 
                type: categoryName as any, 
                price: product.price.toLocaleString('vi-VN') + 'đ/m', 
                image: product.imageUrls[0] || 'https://via.placeholder.com/600x800?text=No+Image', 
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
          <p className="text-center text-gray-500">Khách yêu hãy đợi và cập nhập thường xuyên nhé.</p>
        )}
      </div>
    </section>
  );
}