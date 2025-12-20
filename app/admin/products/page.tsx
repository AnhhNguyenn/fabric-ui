
// app/admin/products/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IProduct } from '@/src/models/Product';
import { Eye, Loader2, DollarSign, Database, PlusCircle } from 'lucide-react';

export default function ProductManagementPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`Lỗi API: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        console.error(err);
        setError("Không thể tải sản phẩm từ cơ sở dữ liệu. Vui lòng kiểm tra kết nối API.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
      <div className="flex items-center justify-center p-20 text-lg text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải dữ liệu từ MongoDB...
      </div>
  );
  if (error) return <p className="text-red-500 text-lg p-4 bg-red-50 border border-red-200 rounded-xl">Lỗi: {error}</p>;

  return (
    <div className="space-y-8">
        <div className="p-6 bg-green-50 border-2 border-dashed border-green-200 rounded-2xl text-green-800">
            <div className="flex items-start gap-4">
                <Database className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                <div>
                    <h2 className="text-xl font-bold">Chế độ Quản lý Cơ sở dữ liệu</h2>
                    <p className="mt-1 text-sm">
                        Dữ liệu sản phẩm hiện đang được tải trực tiếp từ cơ sở dữ liệu MongoDB.
                    </p>
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4"> 
            <h1 className="text-3xl font-bold text-gray-800 font-serif">Sản phẩm Hiện có ({products.length})</h1>
            {/* SỬA LỖI: Chuyển button thành Link */}
            <Link href="/admin/products/new" className="flex items-center gap-2 bg-deep-rose text-white font-bold py-2 px-4 rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200/80">
                <PlusCircle size={20} />
                Thêm Sản phẩm
            </Link>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
            <div className="min-w-[600px]">
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 italic mb-4">Không tìm thấy sản phẩm nào trong cơ sở dữ liệu.</p>
                        <p className="text-gray-500">Hãy bắt đầu bằng cách thêm sản phẩm đầu tiên của bạn!</p>
                    </div>
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
                                <tr key={product._id.toString()} className="hover:bg-rose-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img 
                                            src={product.images && product.images.length > 0 ? product.images[0].url : '/images/placeholder.png'} 
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
                                            href={`/admin/products/${product._id.toString()}`}
                                            className="text-gray-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition flex items-center w-fit"
                                            title="Xem chi tiết"
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
