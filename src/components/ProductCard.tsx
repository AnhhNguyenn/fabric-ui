'use client';
import React, { useState } from 'react';
import { ShoppingCart, Maximize2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ProductCardProps {
  product: {
    id: any;
    name: string;
    type: string;
    displayPrice: string;
    image: string; // Link ảnh từ API (thường là Cloudinary)
    tag: string;
    description: string;
    _id: string;
    price: number;
    imageUrls: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 1. HÀM TỐI ƯU ẢNH THUMBNAIL (Dành riêng cho Cloudinary)
  // Chèn 'w_500,c_fill,g_auto,q_auto,f_auto' để lấy ảnh chất lượng vừa phải, siêu nhẹ cho Grid
  const getThumbnailUrl = (url: string) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', '/upload/w_500,c_fill,g_auto,q_auto,f_auto/');
  };

  const handleAddToCart = () => {
    const productForCart: Product = {
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.type,
      imageUrls: product.imageUrls || [product.image],
      tag: product.tag,
    } as any;
    addItem(productForCart, 1);
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Best Seller': return 'bg-rose-500';
      case 'New': return 'bg-teal-500';
      case 'Premium': return 'bg-amber-500';
      default: return 'bg-gray-700';
    }
  };

  return (
    <>
      <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-64 overflow-hidden">
          {/* SỬ DỤNG THUMBNAIL Ở ĐÂY */}
          <img 
            src={getThumbnailUrl(product.image)} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy" 
          />
          
          {/* Nút xem ảnh gốc chất lượng cao */}
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Xem ảnh chất lượng cao"
          >
            <div className="bg-white/90 p-2 rounded-full text-charcoal shadow-lg">
              <Maximize2 size={20} />
            </div>
          </button>

          <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full text-white ${getTagColor(product.tag)} shadow-sm`}>
            {product.tag}
          </span>
        </div>

        <div className="p-5 space-y-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2 h-14" title={product.name}>
            {product.name}
          </h3>
          <p className="text-sm text-rose-500 font-semibold uppercase tracking-wider">{product.type}</p>
          <p className="text-2xl font-extrabold text-gray-900">{product.displayPrice}</p>
          <p className="text-sm text-gray-500 line-clamp-2 h-10">{product.description}</p>
          
          <button
            onClick={handleAddToCart}
            className="mt-3 w-full bg-rose-500 text-white py-3 rounded-xl flex items-center justify-center space-x-2 transition-all hover:bg-rose-600 active:scale-95 shadow-md shadow-rose-200"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-bold uppercase text-xs tracking-widest">Thêm vào giỏ</span>
          </button>
        </div>
      </div>

      {/* 2. MODAL XEM ẢNH GỐC (LOAD ẢNH CHẤT LƯỢNG CAO NHẤT KHI BẤM VÀO) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <button 
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform"
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
            {/* TẢI LINK GỐC NGUYÊN BẢN TỪ API */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute bottom-10 text-white text-center">
            <p className="text-lg font-serif italic">{product.name}</p>
            <p className="text-xs uppercase tracking-[0.3em] opacity-60">Chế độ xem ảnh gốc</p>
          </div>
        </div>
      )}
    </>
  );
}
