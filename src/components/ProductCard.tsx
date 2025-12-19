'use client';
import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Logic thông minh: Nếu giá là số thì format VNĐ, nếu là chữ (hardcode) thì hiện nguyên
  const displayPrice = typeof product.price === 'number' 
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)
    : product.price;

  // Lấy tên danh mục an toàn (dù là string hay object)
  const categoryName = typeof product.category === 'string' 
    ? product.category 
    : product.category?.name || 'Thời trang';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
      {/* Ảnh sản phẩm - GIỮ NGUYÊN DESIGN CŨ */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image || product.images?.[0] || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Tag - GIỮ NGUYÊN */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-rose-600 shadow-sm">
            {product.tag}
          </div>
        )}

        {/* Nút thao tác - GIỮ NGUYÊN */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button className="bg-white p-3 rounded-full shadow-lg hover:bg-rose-500 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <Link href={`/products/${product._id}`} className="bg-white p-3 rounded-full shadow-lg hover:bg-rose-500 hover:text-white transition-colors">
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Thông tin - GIỮ NGUYÊN */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">
            {categoryName}
          </div>
          <h3 className="font-serif font-bold text-lg text-gray-800 mb-2 group-hover:text-rose-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-rose-600 font-bold text-lg">
            {displayPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
