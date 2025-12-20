
// app/admin/products/new/page.tsx
'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Save, Upload, Plus, X, ImageIcon, Palette, Ruler, Box } from 'lucide-react';
import Link from 'next/link';

// --- Interfaces for state management ---
interface Variant {
  color: string;
  size: string;
  stock: number;
}

interface ProductImage {
  url: string;
  alt: string;
}

const NewProductPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Basic Fields ---
  const [name, setName] = useState('Vải Lụa Tơ Tằm Cao Cấp');
  const [description, setDescription] = useState('Chất liệu mềm mại, thoáng mát, phù hợp cho các thiết kế áo dài và váy sang trọng.');
  const [price, setPrice] = useState<number | ''>(350000);
  const [category, setCategory] = useState('Vải lụa');
  const [tags, setTags] = useState<string[]>(['Lụa', 'Cao cấp', 'Thời trang']);
  
  // --- Complex Fields ---
  const [images, setImages] = useState<ProductImage[]>([]);
  const [variants, setVariants] = useState<Variant[]>([ { color: 'Hồng phấn', size: '1.5m', stock: 100 } ]);
  
  // --- UI State ---
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Handlers ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
        setError('Sản phẩm phải có ít nhất một hình ảnh.');
        return;
    }
    setLoading(true);
    setError(null);

    const productData = { name, description, price: Number(price), category, tags, images, variants, isFeatured: false };

    try {
      const response = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(productData) });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi tạo sản phẩm');
      }
      router.push('/admin/products');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  // --- SỬA LỖI: Hàm tải file lên Cloudinary ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Tải lên thất bại.');
        }

        const data = await response.json();
        // Thêm ảnh mới vào danh sách, đặt alt text mặc định là tên sản phẩm
        setImages([...images, { url: data.url, alt: name || 'Ảnh sản phẩm' }]);

    } catch (err: any) {
        setError(err.message);
    } finally {
        setUploading(false);
        // Reset file input để có thể tải lên lại cùng một file
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
  }

  // --- Helper functions for managing complex state ---
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
        e.preventDefault();
        if (!tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
        }
        setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => setTags(tags.filter(tag => tag !== tagToRemove));

  const handleImageAltChange = (index: number, alt: string) => {
    const newImages = [...images];
    newImages[index].alt = alt;
    setImages(newImages);
  };

  const removeImage = (index: number) => setImages(images.filter((_, i) => i !== index));

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...variants];
    (newVariants[index] as any)[field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => setVariants([...variants, { color: '', size: '', stock: 0}]);
  const removeVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));


  // --- Render --- 
  return (
    <form onSubmit={handleSubmit} className="space-y-8 mb-12">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <Link href="/admin/products" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-2">
            <ArrowLeft size={18} />
            Quay lại danh sách
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 font-serif">Tạo Sản phẩm Mới</h1>
        </div>
        <button type="submit" disabled={loading || uploading} className="flex items-center gap-2 bg-deep-rose text-white font-bold py-2.5 px-5 rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200/80 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {loading ? 'Đang lưu...' : 'Lưu Sản phẩm'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
          <strong className="font-bold">Đã xảy ra lỗi! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info Card*/}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Tên sản phẩm</label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-rose-500 focus:border-rose-500" required />
              </div>
              <div>
                  <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">Mô tả chi tiết</label>
                  <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={6} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-rose-500 focus:border-rose-500"></textarea>
              </div>
            </div>
          </div>

          {/* SỬA LỖI: Images Card với Chức năng Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><ImageIcon size={22}/> Quản lý Hình ảnh</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group border rounded-lg overflow-hidden shadow-sm">
                  <img src={image.url} alt={image.alt} className="h-40 w-full object-cover"/>
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => removeImage(index)} className="text-white p-2 bg-red-500 rounded-full hover:bg-red-600">
                          <X size={18} />
                      </button>
                  </div>
                  <input type="text" placeholder="Mô tả ảnh..." value={image.alt} onChange={e => handleImageAltChange(index, e.target.value)} className="w-full text-xs p-2 border-t"/>
                </div>
              ))}
              
              {/* Nút Upload */}
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex flex-col items-center justify-center gap-2 text-sm font-semibold text-rose-600 border-2 border-dashed border-rose-200 hover:bg-rose-50 rounded-lg py-3 transition-colors disabled:opacity-50 disabled:cursor-wait aspect-square">
                {uploading ? (
                    <><Loader2 size={24} className="animate-spin" /> <span>Đang tải...</span></>
                ) : (
                    <><Upload size={24} /> <span>Tải ảnh lên</span></>
                )}
              </button>
            </div>
          </div>

           {/* Variants Card */}
           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">Các phiên bản (Màu sắc, Kích thước)</h2>
              <div className="space-y-4">
                {variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg items-center">
                      <div className="flex items-center gap-2">
                          <Palette size={16} className="text-gray-500"/>
                          <input type="text" placeholder="Màu sắc" value={variant.color} onChange={e => handleVariantChange(index, 'color', e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm text-sm" required/>
                      </div>
                      <div className="flex items-center gap-2">
                          <Ruler size={16} className="text-gray-500"/>
                          <input type="text" placeholder="Kích thước" value={variant.size} onChange={e => handleVariantChange(index, 'size', e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm text-sm" required/>
                      </div>
                      <div className="flex items-center gap-2">
                          <Box size={16} className="text-gray-500"/>
                          <input type="number" placeholder="Tồn kho" value={variant.stock} onChange={e => handleVariantChange(index, 'stock', Number(e.target.value))} className="w-full border-gray-300 rounded-lg shadow-sm text-sm" required/>
                      </div>
                      <div className="text-right">
                          <button type="button" onClick={() => removeVariant(index)} className="text-gray-400 hover:text-red-500 p-2"><X size={18} /></button>
                      </div>
                    </div>
                ))}
                 <button type="button" onClick={addVariant} className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-rose-600 border-2 border-dashed border-rose-200 hover:bg-rose-50 rounded-lg py-3 transition-colors">
                    <Plus size={18} /> Thêm phiên bản
                </button>
              </div>
           </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
           {/* Organizing Card*/}
           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tổ chức</h2>
              <div className="space-y-4">
                  <div>
                      <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-1">Giá (VNĐ/m)</label>
                      <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-rose-500 focus:border-rose-500" required />
                  </div>
                  <div>
                      <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-1">Danh mục</label>
                      <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-rose-500 focus:border-rose-500" placeholder="Ví dụ: Vải lụa" required />
                  </div>
                  <div>
                      <label htmlFor="tags" className="block text-sm font-bold text-gray-700 mb-1">Thẻ (Tags)</label>
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <div key={tag} className="flex items-center gap-1 bg-rose-100 text-rose-800 text-xs font-semibold px-2 py-1 rounded-full">
                                {tag}
                                <button type="button" onClick={() => removeTag(tag)} className="ml-1"><X size={14} /></button>
                            </div>
                        ))}
                      </div>
                      <input type="text" id="tags" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="Nhập thẻ và nhấn Enter" className="w-full border-gray-300 rounded-lg shadow-sm mt-2 focus:ring-rose-500 focus:border-rose-500"/>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </form>
  );
};

export default NewProductPage;
