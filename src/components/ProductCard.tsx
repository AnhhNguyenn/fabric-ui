// src/components/ProductCard.tsx
'use client';
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

// Định nghĩa props cho ProductCard, nhận dữ liệu đã được ánh xạ từ ProductGrid
interface ProductCardProps {
  product: {
    // Các trường được dùng để hiển thị (display fields)
    id: any; // ID tạm, dùng làm key
    name: string;
    type: string; // Tên danh mục
    displayPrice: string; // <<<< ĐÃ ĐỔI TÊN ĐỂ KHẮC PHỤC LỖI
    image: string;
    tag: string;
    description: string;
    
    // Các trường gốc từ API cần thiết cho CartContext
    _id: string; // ID API chính thức
    price: number; // Giá gốc (number) từ API
    imageUrls: string[]; // Mảng ảnh gốc từ API
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    // Chuyển đổi props ProductCard thành Product type cho CartContext
    const productForCart: Product = {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price as any, // Giá gốc (number)
        category: product.type, // Tên Category
        imageUrls: product.imageUrls || [product.image],
        tag: product.tag,
    } as any; 
    
    addItem(productForCart, 1); 
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Best Seller':
        return 'bg-rose-500';
      case 'New':
        return 'bg-teal-500';
      case 'Premium':
        return 'bg-amber-500';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-64">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full text-white ${getTagColor(product.tag)}`}>
          {product.tag}
        </span>
      </div>
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 h-14" title={product.name}>
          {product.name}
        </h3>
        <p className="text-sm text-rose-500 font-semibold uppercase">{product.type}</p>
        <p className="text-2xl font-extrabold text-gray-900">{product.displayPrice}</p> {/* Dùng displayPrice */}
        
        <p className="text-sm text-gray-500 line-clamp-2 h-10">{product.description}</p>
        
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-rose-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  );
}