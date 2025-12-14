// app/admin/products/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { productApi } from '../../../src/utils/api';
import { Product, Category } from '../../../src/types';
import Link from 'next/link';
import { Plus, Trash2, Edit, Loader2, DollarSign } from 'lucide-react'; 

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll();
      setProducts(data);
    } catch (err) {
      setError("Không thể tải sản phẩm. Đã xảy ra lỗi API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"? Thao tác này không thể hoàn tác.`)) {
      try {
        await productApi.delete(id);
        fetchProducts(); 
        alert(`Đã xóa sản phẩm "${name}" thành công.`);
      } catch (err) {
        alert("Xóa sản phẩm thất bại. Vui lòng kiểm tra lại quyền hạn hoặc kết nối API.");
      }
    }
  };

  if (loading) return (
      <div className="flex items-center justify-center p-20 text-lg text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải dữ liệu...
      </div>
  );
  if (error) return <p className="text-red-500 text-lg p-4 bg-red-50 border border-red-200 rounded-xl">Lỗi: {error}</p>;

  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-4"> 
            <h1 className="text-3xl font-bold text-gray-800 font-serif">Quản lý Sản phẩm ({products.length})</h1>
            
            {/* NÚT TẠO MỚI SẢN PHẨM (NÚT BẠN CẦN) */}
            <Link href="/admin/products/create" className="bg-rose-500 text-white px-4 py-2.5 rounded-xl flex items-center hover:bg-rose-600 transition shadow-md shadow-rose-300/50 font-semibold uppercase text-sm">
                <Plus className="w-5 h-5 mr-2" /> Tạo mới sản phẩm
            </Link>
        </div>

        {/* BẢNG SẢN PHẨM (RESPONSIVE) */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
            <div className="min-w-[700px]"> 
                {products.length === 0 ? (
                    <p className="text-gray-500 italic p-4 text-center">Chưa có sản phẩm nào được tạo.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-rose-50/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tl-xl">Ảnh</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Tên Sản phẩm</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Danh mục</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Giá/m</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tr-xl">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {products.map((product) => {
                                const categoryName = typeof product.category === 'object' 
                                    ? (product.category as Category).name 
                                    : product.category;
                                return (
                                    <tr key={product._id} className="hover:bg-rose-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <img 
                                                src={product.imageUrls[0] || 'https://via.placeholder.com/50x50?text=No+Img'} 
                                                alt={product.name} 
                                                className="h-12 w-12 object-cover rounded-lg shadow-sm" 
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-xs">{product.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                                                {categoryName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-1">
                                            <DollarSign className="w-4 h-4 text-green-600" />
                                            <span className="font-bold text-sm text-green-700">
                                                {product.price.toLocaleString('vi-VN')} đ
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium space-x-2 whitespace-nowrap">
                                            {/* NÚT CHỈNH SỬA */}
                                            <Link 
                                                href={`/admin/products/${product._id}`} 
                                                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            {/* NÚT XÓA */}
                                            <button 
                                                onClick={() => handleDelete(product._id, product.name)}
                                                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </div>
  );
}