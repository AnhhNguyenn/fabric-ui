'use client';
import React, { useState, useEffect } from 'react';
import { productApi, categoryApi } from '../../../../src/utils/api';
import { Category } from '../../../../src/types';
// Đã xóa 'Tag' khỏi lucide-react để tránh lỗi 'declared but never read' khi build
import { Save, Image, Loader2, Info, DollarSign, Search, Zap, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Hàm hỗ trợ tạo slug chuẩn SEO
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

  // Form data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [categoryId, setCategoryId] = useState('');
  const [tag, setTag] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAll();
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0]._id);
      } catch (err) {
        console.error("Lỗi tải danh mục:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFileList(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation cơ bản
    if (!name || !price || !categoryId || !fileList || fileList.length === 0 || !metaTitle || !metaDescription) {
      setFormError('Vui lòng điền đầy đủ các thông tin bắt buộc (*).');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    const productSlug = createSlug(name);

    // 1. Gửi các trường cơ bản (Dạng phẳng để NestJS ValidationPipe không chặn)
    formData.append('name', name.trim());
    formData.append('description', description.trim());
    formData.append('price', price.toString());
    formData.append('category', categoryId); 
    formData.append('tag', tag);

    // 2. Gửi dữ liệu SEO & Open Graph (Phẳng hóa thay vì dùng seo[metaTitle])
    formData.append('metaTitle', metaTitle);
    formData.append('metaDescription', metaDescription);
    formData.append('slug', productSlug);
    formData.append('canonicalUrl', `/products/${productSlug}`);
    formData.append('keywords', tag);
    formData.append('ogTitle', ogTitle);
    formData.append('ogDescription', ogDescription);
    formData.append('ogImage', ogImage);

    // 3. Gửi danh sách Files (Key 'files' phải trùng với FilesInterceptor ở BE)
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }

    try {
      await productApi.create(formData);
      alert('Tạo sản phẩm thành công!');
      router.push('/admin/products');
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Lỗi kết nối API.';
      setFormError(Array.isArray(msg) ? msg.join(', ') : msg);
      console.error("Chi tiết lỗi BE:", error.response?.data);
    } finally {
      // Đảm bảo loading được tắt dù thành công hay thất bại để hiện lại nút
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-20">
      <h1 className="text-3xl font-bold text-gray-800 font-serif">Tạo Sản phẩm mới</h1>
      
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center">
          <Info className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm font-medium">{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-rose-500 border-b pb-3 font-serif flex items-center gap-2">
                <Zap className="w-5 h-5" /> Thông tin cơ bản
              </h2>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Tên sản phẩm *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Mô tả</label>
                <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none transition" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Giá (VNĐ/m) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="number" required value={price} onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Danh mục *</label>
                  <select required value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none bg-white">
                    {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Tag (VD: New)</label>
                  <input type="text" value={tag} onChange={(e) => setTag(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-xl font-bold text-rose-500 border-b pb-3 font-serif flex items-center gap-2">
                <Image className="w-5 h-5" /> Hình ảnh sản phẩm *
              </h2>
              <input type="file" multiple required onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-rose-500 border-b pb-2 font-serif flex items-center gap-2">
                <Search className="w-4 h-4" /> Cấu hình SEO
              </h2>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Meta Title *</label>
                <input type="text" required value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-400" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Meta Description *</label>
                <textarea rows={3} required value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-400" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-rose-500 border-b pb-2 font-serif flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Open Graph
              </h2>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">OG Title</label>
                <input type="text" value={ogTitle} onChange={(e) => setOgTitle(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-400" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">OG Description</label>
                <textarea rows={2} value={ogDescription} onChange={(e) => setOgDescription(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-400" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">OG Image URL</label>
                <input type="url" value={ogImage} onChange={(e) => setOgImage(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-400" />
              </div>
            </div>

            {/* Sửa lại UI nút bấm để không bị trắng chữ khi đang loading */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Lưu Sản Phẩm</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
