'use client';
import React, { useState, useEffect } from 'react';
import { productApi, categoryApi } from '../../../../src/utils/api';
import { Category } from '../../../../src/types';
import { Save, Image, Loader2, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

const createSlug = (name: string) => {
  if (!name) return '';
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

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
    categoryApi.getAll().then(data => {
      setCategories(data);
      if (data.length > 0) setCategoryId(data[0]._id);
    }).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name || !price || !categoryId || !fileList || fileList.length === 0) {
      setFormError('Vui lòng điền đủ Tên, Giá và chọn Ảnh.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    const productSlug = createSlug(name);

    // 1. Dữ liệu cơ bản
    formData.append('name', name.trim());
    formData.append('description', description.trim());
    formData.append('price', price.toString());
    formData.append('category', categoryId);

    // 2. Đóng gói SEO lồng nhau cho đúng cấu trúc Backend mong đợi
    formData.append('seo[title]', metaTitle || name);
    formData.append('seo[description]', metaDescription || description);
    
    // keywords có thể tự sinh hoặc để trống
    formData.append(
      'seo[keywords]',
      `${name}, ${categories.find(c => c._id === categoryId)?.name || ''}`
    );

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        formData.append('files', fileList[i]);
      }
    }

    try {
      await productApi.create(formData);
      alert('Thành công!');
      router.push('/admin/products');
    } catch (error: any) {
      const msg = error.response?.data?.message;
      setFormError(Array.isArray(msg) ? msg.join(', ') : msg || 'Lỗi 400 từ server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Tạo Sản Phẩm Mới</h1>
      {formError && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg flex items-center">
          <Info className="w-5 h-5 mr-2" />
          <span className="text-sm">{formError}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 border rounded-xl space-y-4">
          <input placeholder="Tên sản phẩm *" required value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" />
          <textarea placeholder="Mô tả" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Giá *" required value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-2 border rounded" />
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full p-2 border rounded bg-white">
              {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 border-2 border-dashed p-4 rounded-xl">
            <Image className="w-6 h-6 text-gray-400" />
            <input type="file" multiple required onChange={e => setFileList(e.target.files)} className="text-sm cursor-pointer" />
          </div>
        </div>

        <div className="p-4 border rounded-xl space-y-4 bg-gray-50">
          <h2 className="font-bold text-gray-700">SEO (Tùy chọn)</h2>
          <input placeholder="Meta Title" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full p-2 border rounded" />
          <textarea placeholder="Meta Description" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{loading ? 'ĐANG LƯU...' : 'LƯU SẢN PHẨM'}</span>
        </button>
      </form>
    </div>
  );
}
