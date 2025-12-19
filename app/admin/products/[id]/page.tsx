
// app/admin/products/[id]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
// Thay đổi: Nhập từ dữ liệu hardcode
import { getProductById } from '../../../../src/data/products';
import { Category, Product } from '../../../../src/types';
import { Loader2, ArrowLeft, Tag, FileText, ImageIcon, Edit } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function ViewProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            try {
                const data = await getProductById(productId);
                if (data) {
                    setProduct(data);
                } else {
                    setError("Không tìm thấy sản phẩm với ID này trong tệp dữ liệu.");
                }
            } catch (err) {
                setError("Lỗi tải dữ liệu sản phẩm.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="text-center p-20 flex flex-col items-center">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500 mb-4" />
                <p>Đang tải chi tiết sản phẩm...</p>
            </div>
        );
    }
    
    if (error || !product) {
        return <p className="text-red-500 text-lg p-4 bg-red-50 rounded-xl">Lỗi: {error || 'Không thể hiển thị sản phẩm.'}</p>;
    }

    const getCategoryName = (category: string | Category): string => {
        if (typeof category === 'string') {
            return category;
        }
        return category.name;
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-3xl font-bold text-gray-800 font-serif">Chi tiết Sản phẩm (Chỉ xem)</h1>
            </div>

             <div className="p-6 bg-amber-50 border-2 border-dashed border-amber-200 rounded-2xl text-amber-800">
                <div className="flex items-start gap-4">
                    <Edit className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                        <h2 className="text-xl font-bold">Chế độ Chỉ xem</h2>
                        <p className="mt-1 text-sm">
                            Đây là bản xem trước của dữ liệu sản phẩm. Để chỉnh sửa, hãy mở tệp 
                            <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-md text-xs mx-1 font-mono">src/data/products.ts</code> 
                            và tìm sản phẩm với ID <code className='font-mono bg-amber-100 px-1.5 py-0.5 rounded-md'>{product._id}</code>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Cột ảnh */}
                    <div className="md:w-1/3">
                        <h3 className="text-lg font-semibold text-gray-500 mb-3 flex items-center"><ImageIcon className='w-5 h-5 mr-2'/>Hình ảnh</h3>
                        <div className="space-y-3">
                            {product.imageUrls && product.imageUrls.length > 0 ? (
                                product.imageUrls.map((url, index) => (
                                    <div key={index} className='relative group'>
                                        <img src={url} alt={`${product.name} - ảnh ${index + 1}`} className="w-full h-auto object-cover rounded-xl shadow-md" />
                                        <div className='absolute bottom-1 right-1 text-xs bg-black/50 text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
                                           {url}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Không có hình ảnh.</p>
                            )}
                        </div>
                    </div>

                    {/* Cột thông tin */}
                    <div className="md:w-2/3 space-y-4">
                        <h2 className='text-4xl font-bold text-rose-800 font-serif tracking-tight'>{product.name}</h2>

                        <div>
                             <p className="text-4xl font-light text-green-600">
                                {product.price.toLocaleString('vi-VN')} <span className='text-2xl'>đ/m</span>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-500 mb-2 flex items-center"><FileText className='w-5 h-5 mr-2'/>Mô tả</h3>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description || <span className='italic text-gray-400'>Không có mô tả.</span>}</p>
                        </div>

                         <div>
                            <h3 className="text-lg font-semibold text-gray-500 mb-2 flex items-center"><Tag className='w-5 h-5 mr-2'/>Thông tin khác</h3>
                            <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm'>
                                <strong className='text-gray-500'>ID:</strong> <code className='text-purple-700'>{product._id}</code>
                                <strong className='text-gray-500'>Danh mục:</strong> 
                                <span className='font-medium text-gray-800'>{getCategoryName(product.category)}</span>
                                {/* SỬA LỖI: Hiển thị lại tags là mảng */}
                                <strong className='text-gray-500'>Tags:</strong> <span className='font-medium text-gray-800'>{product.tags?.join(', ') || 'Không có'}</span>
                                {/* SỬA LỖI: Hiển thị stock */}
                                <strong className='text-gray-500'>Tồn kho:</strong> <span className='font-medium text-gray-800'>{product.stock !== undefined ? `${product.stock} mét` : 'Chưa rõ'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
