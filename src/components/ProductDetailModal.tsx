
// src/components/ProductDetailModal.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, ShoppingCart, Minus, Plus, Check, Heart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductImage from './ProductImage';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isAdded, setIsAdded] = useState(false);

    // Đóng modal khi nhấn phím Escape
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden'; // Chặn cuộn trang nền
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto'; // Cho phép cuộn lại
        };
    }, [onClose]);

    const handleAddToCart = () => {
        if (isAdded) return;
        addItem(product, quantity);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            onClose(); 
        }, 1500);
    };

    const hasImages = product.imageUrls && product.imageUrls.length > 0;
    const activeImageUrl = hasImages ? product.imageUrls[activeImage] : '/placeholder-image.png';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" onClick={onClose}>
            <div 
                className="relative bg-white w-full max-w-4xl max-h-[95vh] rounded-2xl shadow-2xl flex flex-col lg:flex-row m-4 animate-scale-in-fast"
                onClick={(e) => e.stopPropagation()} // Ngăn việc bấm vào modal làm nó đóng lại
            >
                {/* Nút đóng modal */}
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center bg-gray-100/80 hover:bg-rose-100 rounded-full text-gray-700 hover:text-rose-500 transition-all duration-300 hover:rotate-180 transform"
                >
                    <X size={24} />
                </button>

                {/* Phần hình ảnh sản phẩm */}
                <div className="w-full lg:w-1/2 p-4 sm:p-6 space-y-4 flex-shrink-0">
                    <div className="aspect-square rounded-xl overflow-hidden shadow-inner bg-gray-100">
                        <ProductImage 
                            key={activeImageUrl} 
                            src={activeImageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-opacity duration-300 animate-fade-in"
                        />
                    </div>
                    {hasImages && product.imageUrls.length > 1 && (
                        <div className="grid grid-cols-5 gap-3">
                            {product.imageUrls.map((url, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-square rounded-lg overflow-hidden transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ${activeImage === index ? 'ring-2 ring-offset-2 ring-rose-500' : 'opacity-60 hover:opacity-100'}`}>
                                     <ProductImage src={url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Phần thông tin sản phẩm */}
                <div className="w-full lg:w-1/2 p-6 flex flex-col overflow-y-auto">
                    <div className="flex-grow">
                        <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 tracking-tight mb-2">{product.name}</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>
                        
                        <div className="my-5">
                            <span className="text-4xl font-light text-green-800">{product.price.toLocaleString('vi-VN')}đ</span>
                            <span className="text-lg text-gray-500"> / mét</span>
                        </div>

                        <div className="border-t border-gray-200 pt-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-gray-700">Số lượng</h3>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setQuantity(q => Math.max(0.5, q - 0.5))} className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition active:scale-90">
                                        <Minus className="w-4 h-4 text-gray-700" />
                                    </button>
                                    <span className="text-lg font-bold w-16 text-center tabular-nums">{quantity}m</span>
                                    <button onClick={() => setQuantity(q => q + 0.5)} className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition active:scale-90">
                                        <Plus className="w-4 h-4 text-gray-700" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-gray-700">Trong kho</h3>
                                <span className={`text-sm font-bold px-2 py-1 rounded ${product.stock && product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {product.stock ? `${product.stock} mét` : 'Hết hàng'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Phần chân modal: nút bấm */}
                    <div className="mt-auto pt-6 space-y-3">
                        <button 
                            onClick={handleAddToCart}
                            disabled={isAdded || !product.stock || product.stock < 1}
                            className={`w-full text-lg font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center text-white transform active:scale-95 ${isAdded ? 'bg-green-500' : 'bg-rose-500 hover:bg-rose-600'} disabled:bg-gray-400 disabled:cursor-not-allowed`}
                        >
                            {isAdded ? (
                                <><Check className="w-6 h-6 mr-2" /> ĐÃ THÊM VÀO GIỎ</>
                            ) : (
                                <><ShoppingCart className="w-6 h-6 mr-3" /> THÊM VÀO GIỎ HÀNG</>
                            )}
                        </button>
                         <div className="flex items-center justify-center gap-4 text-sm">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"><Heart size={16}/> Thêm vào yêu thích</button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"><Share2 size={16}/> Chia sẻ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
