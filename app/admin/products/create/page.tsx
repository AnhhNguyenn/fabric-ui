'use client';
import React, { useState, useEffect } from 'react';
import { productApi, categoryApi } from '../../../../src/utils/api';
import { Category } from '../../../../src/types';
import { Save, Loader2, Search, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [categoryId, setCategoryId] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    categoryApi.getAll().then(setCategories).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !fileList || fileList.length === 0) {
      setFormError('Vui lòng nhập Tên, Giá và chọn ít nhất 1 Hình ảnh!');
      return;
    }

    setLoading(true);
    setFormError(null);
    const formData = new FormData();

    // Gửi dữ liệu phẳng để tránh lỗi 400 Bad Request
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('category', categoryId || (categories[0]?._id));
    formData.append('metaTitle', metaTitle || name);
    formData.append('metaDescription', metaDescription || description);

    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }

    try {
      await productApi.create(formData);
      alert('Tạo sản phẩm thành công!');
      router.push('/admin/products');
    } catch (error: any) {
      setFormError(error.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Thêm Sản Phẩm Mới</h1>
      
      {formError && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          {Array.isArray(formError) ? formError.join(', ') : formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
          <h2 className="font-bold text-rose-500 flex items-center gap-2 border-b pb-2"><ImageIcon className="w-5 h-5"/> Thông tin cơ bản</h2>
          <input placeholder="Tên sản phẩm *" required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-xl outline-rose-400" />
          <textarea placeholder="Mô tả sản phẩm" rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border rounded-xl outline-rose-400" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Giá (VNĐ) *" required value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-3 border rounded-xl outline-rose-400" />
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full p-3 border rounded-xl outline-rose-400">
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="p-4 border-2 border-dashed rounded-xl">
             <input type="file" multiple required onChange={e => setFileList(e.target.files)} className="w-full text-sm file:bg-rose-50 file:text-rose-700 file:rounded-full file:border-0 file:px-4 file:py-2" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
          <h2 className="font-bold text-gray-700 flex items-center gap-2 border-b pb-2"><Search className="w-5 h-5" /> Cấu hình SEO (Tùy chọn)</h2>
          <input placeholder="Tiêu đề SEO (Nếu bỏ trống sẽ lấy tên SP)" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full p-3 border rounded-xl" />
          <textarea placeholder="Mô tả SEO (Nếu bỏ trống sẽ lấy mô tả SP)" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className="w-full p-3 border rounded-xl" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all disabled:opacity-70 shadow-lg shadow-rose-100">
          {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Save className="w-6 h-6" />}
          <span>{loading ? 'ĐANG LƯU SẢN PHẨM...' : 'LƯU SẢN PHẨM NGAY'}</span>
        </button>
      </form>
    </div>
  );
}
