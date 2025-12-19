
// app/admin/products/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
// Thay đổi: Nhập từ dữ liệu hardcode
import { getProducts } from '../../../src/data/products';
import { Product } from '../../../src/types';
import Link from 'next/link';
import { Eye, Loader2, DollarSign, FileCode } from 'lucide-react'; 

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Thay đổi: Gọi hàm getProducts từ tệp dữ liệu
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Không thể tải sản phẩm. Đã xảy ra lỗi khi đọc tệp `src/data/products.ts`.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
      <div className="flex items-center justify-center p-20 text-lg text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải dữ liệu...
      </div>
  );
  if (error) return <p className="text-red-500 text-lg p-4 bg-red-50 border border-red-200 rounded-xl">Lỗi: {error}</p>;

  return (
    <div className="space-y-8">
        <div className="p-6 bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl text-blue-800">
            <div className="flex items-start gap-4">
                <FileCode className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                    <h2 className="text-xl font-bold">Chế độ Quản lý Hardcode</h2>
                    <p className="mt-1 text-sm">
                        Tất cả sản phẩm hiện đang được quản lý trực tiếp trong tệp 
                        <code className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded-md text-xs mx-1 font-mono">src/data/products.ts</code>.
                    </p>
                    <p className="mt-2 text-sm">
                        Để <span className="font-semibold">thêm, sửa, hoặc xóa</span> sản phẩm, bạn cần phải chỉnh sửa tệp đó và lưu lại. 
                        Trang web sẽ tự động cập nhật sau khi bạn lưu thay đổi.
                    </p>
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4"> 
            <h1 className="text-3xl font-bold text-gray-800 font-serif">Sản phẩm Hiện có ({products.length})</h1>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
            <div className="min-w-[600px]">
                {products.length === 0 ? (
                    <p className="text-gray-500 italic p-4 text-center">Không có sản phẩm nào trong `src/data/products.ts`.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-rose-50/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tl-xl">Ảnh</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Tên Sản phẩm</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Giá/m</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tr-xl">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-rose-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img 
                                            src={product.imageUrls[0] || '/images/placeholder.png'} 
                                            alt={product.name} 
                                            className="h-12 w-12 object-cover rounded-lg shadow-sm" 
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-xs">{product.name}</td>
                                    <td className="px-6 py-4 flex items-center gap-1">
                                        <DollarSign className="w-4 h-4 text-green-600" />
                                        <span className="font-bold text-sm text-green-700">
                                            {product.price.toLocaleString('vi-VN')} đ
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <Link 
                                            href={`/admin/products/${product._id}`}
                                            className="text-gray-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition flex items-center w-fit"
                                            title="Xem chi tiết (Read-only)"
                                        >
                                            <Eye className="w-5 h-5 mr-2" /> Xem Chi tiết
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </div>
  );
}
