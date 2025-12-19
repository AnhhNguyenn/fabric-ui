
// src/components/ProductCard.tsx
'use client';
import React from 'react';
import { Product } from '../types';
import ProductImage from './ProductImage'; // Import the reusable image component

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : undefined;
  const categoryName = typeof product.category === 'string' ? product.category : product.category.name;

  return (
    // ĐÃ SỬA LỖI: Loại bỏ thẻ <Link> và <a>, thay bằng thẻ <div>.
    // Sự kiện onClick để mở modal đã được xử lý ở component cha (ProductGrid).
    <div className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {/* CẢI TIẾN: Sử dụng lại component ProductImage để nhất quán và sạch sẽ */}
        <ProductImage
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-rose-500 font-semibold uppercase tracking-wide">{categoryName}</p>
        <h3 className="mt-1 text-base font-bold text-gray-800 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-medium text-green-600">
          {product.price.toLocaleString('vi-VN')} đ
        </p>
      </div>
    </div>
  );
}
