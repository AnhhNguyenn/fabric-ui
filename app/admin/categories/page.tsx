
// app/admin/categories/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
// Thay đổi: Nhập từ dữ liệu hardcode
import { getCategories } from '../../../src/data/categories';
import { Category } from '../../../src/types';
// Sửa lỗi: Loại bỏ icon 'Info' không được sử dụng
import { Trash2, Edit, Loader2, FileCode } from 'lucide-react';

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Thay đổi: Gọi hàm getCategories từ tệp dữ liệu
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError("Không thể tải danh mục. Đã xảy ra lỗi khi đọc tệp `src/data/categories.ts`.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Các hàm xử lý (handleCreate, handleDelete, etc.) đã bị loại bỏ vì không còn cần thiết.

  if (loading) return (
      <div className="flex items-center justify-center p-20 text-lg text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải dữ liệu...
      </div>
  );
  if (error) return <p className="text-red-500 text-lg p-4 bg-red-50 border border-red-200 rounded-xl">Lỗi: {error}</p>;

  return (
    <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 font-serif">Quản lý Danh mục</h1>

        {/* Thay đổi: Thông báo về chế độ hardcode */}
        <div className="p-6 bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl text-blue-800">
            <div className="flex items-start gap-4">
                <FileCode className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                    <h2 className="text-xl font-bold">Chế độ Quản lý Hardcode</h2>
                    <p className="mt-1 text-sm">
                        Các danh mục hiện đang được quản lý trực tiếp trong tệp 
                        <code className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded-md text-xs mx-1 font-mono">src/data/categories.ts</code>.
                    </p>
                     <p className="mt-2 text-sm">
                        Để <span className="font-semibold">thêm, sửa, hoặc xóa</span> danh mục, bạn cần phải chỉnh sửa trực tiếp tệp đó.
                    </p>
                </div>
            </div>
        </div>

        {/* Giữ nguyên Form Tạo mới nhưng VÔ HIỆU HÓA */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 opacity-50 cursor-not-allowed">
            <h2 className="text-xl font-bold text-rose-500 mb-4 border-b pb-2">Tạo Danh mục mới (Đã tắt)</h2>
            <fieldset disabled className="space-y-4">
                {/* Các trường input được giữ lại về mặt giao diện nhưng không thể tương tác */}
                <input type="text" placeholder="Tên danh mục" className="w-full p-3 border border-gray-200 rounded-xl" />
                <textarea placeholder="Mô tả" className="w-full p-3 border border-gray-200 rounded-xl" />
                <div className="pt-2 border-t">
                  <h3 className="text-lg font-semibold text-gray-400">Tối ưu SEO (Đã tắt)</h3>
                  <input type="text" placeholder="Meta Title" className="w-full p-3 mt-2 border border-gray-200 rounded-xl" />
                </div>
                <button type="button" className="bg-rose-500 text-white px-4 py-2.5 rounded-xl flex items-center font-semibold uppercase text-sm">Tạo mới</button>
            </fieldset>
        </div>

        {/* Danh sách Danh mục (Chỉ hiển thị) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Danh sách ({categories.length})</h2>
            <ul className="divide-y divide-gray-100">
                {categories.map((cat) => (
                    <li key={cat._id} className="py-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-gray-900">{cat.name}</p>
                            <p className="text-sm text-gray-500">{cat.description || <span className="italic">Không có mô tả.</span>}</p>
                        </div>
                        {/* Thay đổi: Loại bỏ nút Sửa/Xóa, thay bằng thông báo */}
                        <div className="space-x-2 flex items-center">
                            <button disabled className="text-blue-300 p-2 rounded-full cursor-not-allowed" title="Chỉnh sửa trong tệp src/data/categories.ts">
                                <Edit className="w-5 h-5" />
                            </button>
                            <button disabled className="text-red-300 p-2 rounded-full cursor-not-allowed" title="Xóa trong tệp src/data/categories.ts">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {categories.length === 0 && <p className="text-gray-500 italic p-4 text-center">Không có danh mục nào trong `src/data/categories.ts`.</p>}
        </div>
    </div>
  );
}
