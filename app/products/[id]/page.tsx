
// app/products/[id]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '../../../src/data/products';
import { Product } from '../../../src/types';
import { Loader2, ArrowLeft, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '../../../src/context/CartContext';
import ProductImage from '../../../src/components/ProductImage'; // << IMPORT COMPONENT MỚI

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            try {
                const data = await getProductById(productId);
                if (data) {
                    setProduct(data);
                } else {
                    setError("Không tìm thấy sản phẩm này.");
                }
            } catch (err) {
                setError("Lỗi tải dữ liệu sản phẩm.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000); 
    };

    if (loading) {
        return (
            <div className="text-center p-20 flex flex-col items-center">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500 mb-4" />
                <p>Đang tải chi tiết sản phẩm...</p>
            </div>
        );
    }
    
    if (error || !product) {
        return (
            <div className="text-center p-20">
                <h2 className="text-2xl font-bold text-red-600">Đã xảy ra lỗi</h2>
                <p className="text-red-500 mt-2">{error || 'Không thể hiển thị sản phẩm.'}</p>
                 <button onClick={() => router.back()} className="mt-6 bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition">
                    Quay lại
                </button>
            </div>
        );
    }

    const hasImages = product.imageUrls && product.imageUrls.length > 0;
    const activeImageUrl = hasImages ? product.imageUrls[activeImage] : undefined;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
             <button onClick={() => router.push('/products')} className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-gray-900 transition">
                <ArrowLeft className="w-4 h-4" /> Trở về danh sách sản phẩm
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Cột hình ảnh */}
                <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                        {/* --- SỬ DỤNG ProductImage Component --- */}
                        <ProductImage 
                            key={activeImageUrl} // Key để trigger animation
                            src={activeImageUrl} 
                            alt={`${product.name} - ảnh ${activeImage + 1}`} 
                            className="w-full h-full object-cover animate-fade-in"
                        />
                    </div>
                    {hasImages && product.imageUrls.length > 1 && (
                        <div className="grid grid-cols-5 gap-2">
                            {product.imageUrls.map((url, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-square rounded-md overflow-hidden transition-all duration-200 ${activeImage === index ? 'ring-2 ring-offset-2 ring-rose-500' : 'opacity-60 hover:opacity-100'}`}>
                                     {/* --- SỬ DỤNG ProductImage cho thumbnail --- */}
                                     <ProductImage src={url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cột thông tin (giữ nguyên) */}
                <div className="flex flex-col pt-4">
                    <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 tracking-tight">{product.name}</h1>
                    <p className="text-gray-500 mt-3 text-base leading-relaxed">{product.description}</p>
                    
                    <div className="my-5">
                        <span className="text-4xl font-light text-green-600">{product.price.toLocaleString('vi-VN')}</span>
                        <span className="text-xl text-gray-500"> đ/m</span>
                    </div>

                    <div className="w-full border-t border-gray-200 pt-5 space-y-4">
                         <div className="flex items-center gap-4">
                            <h3 className="font-bold text-gray-700 w-24">Số lượng:</h3>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                                    <Minus className="w-5 h-5 text-gray-700" />
                                </button>
                                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                                    <Plus className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <h3 className="font-bold text-gray-700 w-24">Kho:</h3>
                            <span className="text-gray-800">{product.stock ? `${product.stock} mét có sẵn` : 'Hết hàng'}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-6">
                         <button 
                            onClick={handleAddToCart}
                            disabled={isAdded || !product.stock || product.stock < 1}
                            className="w-full text-lg font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center text-white disabled:opacity-60 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isAdded ? (
                                <><Check className="w-6 h-6 mr-2" /> Đã thêm vào giỏ</>
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