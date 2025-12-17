'use client';
import React, { useState, useEffect } from 'react';
import { productApi, categoryApi } from '../../../../src/utils/api';
import { Category } from '../../../../src/types';
// Đã xóa DollarSign và các icon gây lỗi build
import { Save, Image, Loader2, Info, Search, Zap, Share2 } from 'lucide-react';
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
  const [tag, setTag] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  
  // Giữ lại các biến này để dùng trong handleSubmit, tránh lỗi build
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
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
    formData.append('tag', tag);

    // 2. Đóng gói SEO lồng nhau cho đúng cấu trúc Backend cũ
    formData.append('seo[metaTitle]', metaTitle || name);
    formData.append('seo[metaDescription]', metaDescription || description);
    formData.append('seo[slug]', productSlug);
    formData.append('seo[canonicalUrl]', `/products/${productSlug}`);
    formData.append('seo[keywords]', tag);
    
    // Gộp Open Graph vào trong Object SEO để khớp DTO
    formData.append('seo[openGraph][title]', ogTitle || metaTitle || name);
    formData.append('seo[openGraph][description]', ogDescription || metaDescription || description);
    formData.append('seo[openGraph][image]', ogImage);

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        formData.append('files', fileList[i]);
      }
    }

    try {
      await productApi.create(formData);
      alert('Tạo sản phẩm thành công!');
      router.push('/admin/products');
    } catch (error: any) {
      const msg = error.response?.data?.message;
      setFormError(Array.isArray(msg) ? msg.join(', ') : msg || 'Lỗi server (400).');
      console.error("Lỗi API:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-20 pt-10 bg-white">
      <h1 className="text-3xl font-bold text-gray-800">Tạo Sản phẩm mới</h1>
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center">
          <Info className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm font-medium">{formError}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
              <h2 className="text-xl font-bold text-rose-500 border-b pb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Thông tin cơ bản
              </h2>
              <input type="text" placeholder="Tên sản phẩm *" required value={name} onChange={e => setName(e.target.value)}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-rose-400 outline-none" />
              <textarea rows={4} placeholder="Mô tả" value={description} onChange={e => setDescription(e.target.value)}
                className="w-full p-3 border rounded-xl outline-none" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="number" placeholder="Giá (VNĐ/m) *" required value={price} onChange={e => setPrice(Number(e.target.value))}
                  className="w-full p-3 border rounded-xl outline-none" />
                <select required value={categoryId} onChange={e => setCategoryId(e.target.value)}
                  className="w-full p-3 border rounded-xl bg-white outline-none">
                  {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
                <input type="text" placeholder="Tag" value={tag} onChange={e => setTag(e.target.value)} className="w-full p-3 border rounded-xl" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
              <h2 className="text-xl font-bold text-rose-500 border-b pb-3 flex items-center gap-2">
                <Image className="w-5 h-5" /> Hình ảnh sản phẩm *
              </h2>
              <input type="file" multiple required onChange={e => setFileList(e.target.files)} className="w-full text-sm cursor-pointer" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
              <h2 className="text-lg font-bold text-rose-500 border-b pb-2 flex items-center gap-2">
                <Search className="w-4 h-4" /> SEO & OG
              </h2>
              <input placeholder="Meta Title" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              <textarea placeholder="Meta Description" rows={2} value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              <input placeholder="OG Title" value={ogTitle} onChange={e => setOgTitle(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              <textarea placeholder="OG Description" value={ogDescription} onChange={e => setOgDescription(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              <input placeholder="OG Image URL" value={ogImage} onChange={e => setOgImage(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-70 transition-all">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>ĐANG LƯU...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>LƯU SẢN PHẨM</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
