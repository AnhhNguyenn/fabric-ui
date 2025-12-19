
// src/components/ProductCard.tsx
'use client';
import React, { useState } from 'react'; // Import useState
import Link from 'next/link';
import { Product } from '../types';
import { ImageIcon } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : null;
  const categoryName = typeof product.category === 'string' ? product.category : product.category.name;

  // Hiển thị placeholder nếu không có URL hoặc nếu ảnh bị lỗi
  const showPlaceholder = !imageUrl || imageError;

  return (
    <Link href={`/products/${product._id}`} legacyBehavior>
      <a className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {showPlaceholder ? (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-gray-300" />
            </div>
          ) : (
            <img 
              src={imageUrl!} // Thêm ! vì đã kiểm tra ở trên
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              // Khi lỗi, bật cờ imageError để re-render và hiển thị placeholder
              onError={() => setImageError(true)}
            />
          )}
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
      </a>
    </Link>
  );
}
