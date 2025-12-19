
// src/components/ProductDetailModal.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductImage from './ProductImage';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
    const { addItem } = useCart(); // FIX: Changed addToCart to addItem
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleAddToCart = () => {
        addItem(product, quantity); // FIX: Changed addToCart to addItem
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            onClose(); 
        }, 1500); 
    };

    const hasImages = product.imageUrls && product.imageUrls.length > 0;
    const activeImageUrl = hasImages ? product.imageUrls[activeImage] : undefined;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div 
                className="fixed inset-0" 
                onClick={onClose} 
            ></div>
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col md:flex-row animate-scale-in overflow-hidden">
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-rose-100 rounded-full text-gray-700 hover:text-rose-500 transition-all duration-200 hover:rotate-90"
                >
                    <X size={20} />
                </button>

                <div className="w-full md:w-1/2 p-4 space-y-3">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
                        <ProductImage 
                            key={activeImageUrl} 
                            src={activeImageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover animate-fade-in"
                        />
                    </div>
                    {hasImages && product.imageUrls.length > 1 && (
                        <div className="grid grid-cols-5 gap-2">
                            {product.imageUrls.map((url, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-square rounded-md overflow-hidden transition-all duration-200 ${activeImage === index ? 'ring-2 ring-offset-2 ring-rose-500' : 'opacity-70 hover:opacity-100'}`}>
                                     <ProductImage src={url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col">
                    <h2 className="text-3xl font-serif text-gray-800 tracking-tight">{product.name}</h2>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed flex-grow overflow-y-auto">{product.description}</p>
                    
                    <div className="my-4">
                        <span className="text-3xl font-light text-green-700">{product.price.toLocaleString('vi-VN')}</span>
                        <span className="text-lg text-gray-500"> đ/m</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-3">
                         <div className="flex items-center gap-4">
                            <h3 className="font-medium text-gray-600 w-20">Số lượng:</h3>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setQuantity(q => Math.max(0.5, q - 0.5))} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                                    <Minus className="w-4 h-4 text-gray-600" />
                                </button>
                                <span className="text-lg font-bold w-12 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 0.5)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                                    <Plus className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <h3 className="font-medium text-gray-600 w-20">Trong kho:</h3>
                            <span className="text-sm font-semibold text-gray-800">{product.stock ? `${product.stock} mét` : 'Hết hàng'}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-5">
                         <button 
                            onClick={handleAddToCart}
                            disabled={isAdded || !product.stock || product.stock < 1}
                            className="w-full text-base font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center text-white disabled:opacity-70 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400"
                        >
                            {isAdded ? (
                                <><Check className="w-5 h-5 mr-2" /> Đã thêm!</>
                            ) : (
                                <><ShoppingCart className="w-5 h-5 mr-3" /> Thêm vào giỏ</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
