'use client';
import React, { useState, useEffect } from 'react';
import { productApi, categoryApi } from '../../../../src/utils/api';
import { Category } from '../../../../src/types';
import { Save, Image, Loader2, Info, DollarSign, Search } from 'lucide-react';
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
    categoryApi.getAll().then(data => {
      setCategories(data);
      if (data.length > 0) setCategoryId(data[0]._id);
    }).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Kiểm tra dữ liệu bắt buộc (name, price, category là bắt buộc trong Schema)
    if (!name || !price || !categoryId || !fileList || fileList.length === 0) {
      setFormError('Vui lòng điền đủ Tên, Giá và chọn ít nhất 1 Ảnh.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    
    // 1. Dữ liệu cơ bản - KHỚP TỪNG CHỮ VỚI CreateProductDto
    formData.append('name', name.trim());
    formData.append('description', description.trim());
    formData.append('price', price.toString()); // BE dùng @Type(() => Number)
    formData.append('category', categoryId); // Phải là IsMongoId

    // 2. SEO Object - Backend dùng SeoDto với title, description, keywords
    // MÀY LƯU Ý: Tuyệt đối không gửi metaTitle vì DTO đéo có, sẽ bị forbidNonWhitelisted chặn
    formData.append('seo[title]', metaTitle.trim() || name.trim());
    formData.append('seo[description]', metaDescription.trim() || description.trim());
    formData.append('seo[keywords]', name.trim());

    // 3. File ảnh - Key 'files' khớp với FilesInterceptor trong Controller
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
      console.error("Lỗi BE trả về:", error.response?.data);
      const msg = error.response?.data?.message;
      // Trình bày lỗi từ ValidationPipe của NestJS
      setFormError(Array.isArray(msg) ? msg.join(', ') : msg || 'Lỗi 500: Kiểm tra Cloudinary hoặc Database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tạo Sản Phẩm Mới</h1>
      
      {formError && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl flex items-start shadow-sm">
          <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm font-medium">{formError}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 border border-gray-100 rounded-2xl shadow-sm space-y-5 bg-white">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Tên sản phẩm *</label>
            <input 
              placeholder="Nhập tên sản phẩm..." 
              required 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Mô tả sản phẩm</label>
            <textarea 
              placeholder="Nhập mô tả chi tiết..." 
              rows={4}
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Giá sản phẩm (VNĐ) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="number" 
                  placeholder="0" 
                  required 
                  value={price} 
                  onChange={e => setPrice(Number(e.target.value))} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Danh mục sản phẩm *</label>
              <select 
                value={categoryId} 
                onChange={e => setCategoryId(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none bg-white cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Hình ảnh sản phẩm *</label>
            <div className="flex items-center gap-4 border-2 border-dashed border-gray-200 p-6 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer relative">
              <Image className="w-8 h-8 text-gray-400" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">Nhấn để chọn nhiều ảnh</span>
                <span className="text-xs text-gray-400">Yêu cầu ít nhất 1 ảnh</span>
              </div>
              <input 
                type="file" 
                multiple 
                required 
                onChange={e => setFileList(e.target.files)} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-100 rounded-2xl space-y-5 bg-gray-50/50">
          <h2 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
            <Search className="w-5 h-5 text-rose-500" /> SEO (Tùy chọn)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Title</label>
              <input 
                placeholder="Tiêu đề Google" 
                value={metaTitle} 
                onChange={e => setMetaTitle(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Description</label>
              <textarea 
                placeholder="Mô tả Google" 
                rows={1}
                value={metaDescription} 
                onChange={e => setMetaDescription(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none" 
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-rose-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
          <span className="uppercase tracking-widest">{loading ? 'Đang lưu...' : 'Lưu Sản Phẩm'}</span>
        </button>
      </form>
    </div>
  );
}
