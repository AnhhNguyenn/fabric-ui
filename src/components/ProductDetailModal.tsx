
// src/components/ProductDetailModal.tsx
'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingCart, Minus, Plus, Check, ArrowLeft } from 'lucide-react';

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
        onClose(); 
    }, 1500); 
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
            className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-scale-in" 
            onClick={(e) => e.stopPropagation()}
        >
            {/* Nút đóng modal */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 bg-white/50 hover:bg-white rounded-full p-2 z-20 transition-all duration-200">
                <X className="w-6 h-6" />
            </button>

            {/* Phần hình ảnh */}
            <div className="w-full md:w-1/2 relative flex-shrink-0">
                <img 
                    src={product.imageUrls[0]} 
                    alt={product.name} 
                    className="w-full h-64 md:h-full object-cover"
                />
                {/* SỬA LỖI: Hiển thị tag đầu tiên trong mảng `tags` */}
                <div className="absolute top-6 left-6 hidden md:block">
                   <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-deep-rose shadow-sm border border-white">
                      {product.tags && product.tags[0] || 'MỚI'}
                   </span>
                </div>
            </div>

            {/* Phần thông tin */}
            <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col overflow-y-auto">
                 {/* Nút Back trên mobile */}
                 <button onClick={onClose} className="flex items-center gap-2 text-sm text-gray-600 mb-4 md:hidden">
                    <ArrowLeft className="w-4 h-4" /> Trở lại
                </button>

                <div className="flex-grow">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 font-serif tracking-tight">{product.name}</h2>
                    <p className="text-gray-500 mt-2 text-sm">{product.description}</p>

                    <p className="text-4xl font-light text-green-600 my-4">
                        {product.price.toLocaleString('vi-VN')} <span className="text-2xl text-gray-500">đ/m</span>
                    </p>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-3">Số lượng</h3>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                            >
                                <Minus className="w-5 h-5 text-gray-700" />
                            </button>
                            <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(q => q + 1)}
                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                            >
                                <Plus className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nút thêm vào giỏ */}
                 <div className="mt-6 pt-6 border-t border-gray-200">
                    <button 
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`w-full text-lg font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center ${isAdded ? 'bg-green-500' : 'bg-rose-500 hover:bg-rose-600'} text-white`}
                    >
                        {isAdded ? (
                            <><Check className="w-6 h-6 mr-2 animate-bounce" /> Đã thêm!</>
                        ) : (
                            <><ShoppingCart className="w-6 h-6 mr-3" /> Thêm vào giỏ</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}