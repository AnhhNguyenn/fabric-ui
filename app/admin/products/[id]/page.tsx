
// app/admin/products/[id]/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Loader2, Save, Upload, Plus, X, ImageIcon, Palette, Ruler, Box, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { IProduct } from '@/src/models/Product'; // Sử dụng interface từ model

// --- Interfaces for state management ---
interface Variant {
  color: string;
  size: string;
  stock: number;
}

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Product State ---
  // Sử dụng một state duy nhất cho product data để dễ quản lý
  const [product, setProduct] = useState<Partial<IProduct>>({}); 

  // --- UI State ---
  const [loading, setLoading] = useState(true); // Loading initial data
  const [saving, setSaving] = useState(false); // Saving changes
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');

  // --- Data Fetching ---
  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu sản phẩm.');
        }
        const data: IProduct = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // --- Handlers ---
  const handleInputChange = (field: keyof IProduct, value: any) => {
      setProduct(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((product.images || []).length === 0) {
        setError('Sản phẩm phải có ít nhất một hình ảnh.');
        return;
    }
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${productId}`, { 
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(product) 
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi cập nhật');
      }
      router.push('/admin/products');
      // TODO: Thêm toast notification thành công
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleDelete = async () => {
      if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"? Hành động này không thể hoàn tác.`)) return;

      setDeleting(true);
      setError(null);
      try {
          const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
          if (!response.ok) {
              throw new Error("Xóa sản phẩm thất bại.");
          }
          router.push('/admin/products');
          // TODO: Thêm toast notification thành công
      } catch (err: any) {
          setError(err.message);
          setDeleting(false);
      }
  }
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!response.ok) throw new Error('Tải lên thất bại.');
        const data = await response.json();
        const newImages = [...(product.images || []), { url: data.url, alt: product.name || 'Ảnh sản phẩm' }];
        handleInputChange('images', newImages);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setUploading(false);
        if(fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  // --- Helper functions for managing complex state ---
  // These now update the single 'product' state object
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
        e.preventDefault();
        const newTags = [...(product.tags || [])];
        if (!newTags.includes(tagInput.trim())) {
            newTags.push(tagInput.trim());
            handleInputChange('tags', newTags);
        }
        setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => handleInputChange('tags', (product.tags || []).filter(tag => tag !== tagToRemove));

  const handleImageAltChange = (index: number, alt: string) => {
      const newImages = [...(product.images || [])];
      newImages[index].alt = alt;
      handleInputChange('images', newImages)
  };

  const removeImage = (index: number) => handleInputChange('images', (product.images || []).filter((_, i) => i !== index));

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
      const newVariants = [...(product.variants || [])];
      (newVariants[index] as any)[field] = value;
      handleInputChange('variants', newVariants);
  };

  const addVariant = () => handleInputChange('variants', [...(product.variants || []), { color: '', size: '', stock: 0}]);
  const removeVariant = (index: number) => handleInputChange('variants', (product.variants || []).filter((_, i) => i !== index));

  // --- Render ---
  if (loading) return (
      <div className="flex items-center justify-center p-20 text-lg text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải dữ liệu sản phẩm...
      </div>
  );

  if (error && !loading) return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative max-w-lg mx-auto" role="alert">
          <strong className="font-bold">Đã xảy ra lỗi! </strong>
          <span className="block sm:inline">{error}</span>
          <div className="mt-4">
              <Link href="/admin/products" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
                  <ArrowLeft size={16} />
                  Quay lại danh sách sản phẩm
              </Link>
          </div>
      </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-8 mb-12">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <Link href="/admin/products" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-2">
            <ArrowLeft size={18} />
            Quay lại danh sách
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 font-serif">Chỉnh sửa Sản phẩm</h1>
          <p className="text-sm text-gray-500 mt-1">ID: {productId}</p>
        </div>
        <div className="flex items-center gap-3">
             <button type="button" onClick={handleDelete} disabled={deleting || saving} className="flex items-center gap-2 bg-gray-200 text-red-600 font-bold py-2.5 px-5 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50">
                {deleting ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
             </button>
            <button type="submit" disabled={saving || uploading || deleting} className="flex items-center gap-2 bg-deep-rose text-white font-bold py-2.5 px-5 rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200/80 disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {saving ? 'Đang lưu...' : 'Lưu Thay đổi'}
            </button>
        </div>
      </div>

      {/* Main Grid Layout - Tái sử dụng từ trang tạo mới */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Tên sản phẩm</label>
                  <input type="text" id="name" value={product.name || ''} onChange={e => handleInputChange('name', e.target.value)} className="w-full border-gray-300 rounded-lg" required />
              </div>
              <div>
                  <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">Mô tả chi tiết</label>
                  <textarea id="description" value={product.description || ''} onChange={e => handleInputChange('description', e.target.value)} rows={6} className="w-full border-gray-300 rounded-lg"></textarea>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><ImageIcon size={22}/> Quản lý Hình ảnh</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(product.images || []).map((image, index) => (
                <div key={index} className="relative group border rounded-lg overflow-hidden shadow-sm">
                  <img src={image.url} alt={image.alt} className="h-40 w-full object-cover"/>
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => removeImage(index)} className="text-white p-2 bg-red-500 rounded-full hover:bg-red-600"><X size={18} /></button>
                  </div>
                  <input type="text" placeholder="Mô tả ảnh..." value={image.alt} onChange={e => handleImageAltChange(index, e.target.value)} className="w-full text-xs p-2 border-t"/>
                </div>
              ))}
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex flex-col items-center justify-center gap-2 text-sm font-semibold text-rose-600 border-2 border-dashed rounded-lg py-3 transition-colors hover:bg-rose-50 disabled:opacity-50 aspect-square">
                {uploading ? <><Loader2 size={24} className="animate-spin"/><span>Đang tải...</span></> : <><Upload size={24}/><span>Tải ảnh lên</span></>}
              </button>
            </div>
          </div>

           {/* Variants */}
           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">Các phiên bản</h2>
              <div className="space-y-4">
                {(product.variants || []).map((variant, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg items-center">
                      <div className="flex items-center gap-2"><Palette size={16} className="text-gray-500"/><input type="text" placeholder="Màu sắc" value={variant.color} onChange={e => handleVariantChange(index, 'color', e.target.value)} className="w-full border-gray-300 rounded-lg text-sm" required/></div>
                      <div className="flex items-center gap-2"><Ruler size={16} className="text-gray-500"/><input type="text" placeholder="Kích thước" value={variant.size} onChange={e => handleVariantChange(index, 'size', e.target.value)} className="w-full border-gray-300 rounded-lg text-sm" required/></div>
                      <div className="flex items-center gap-2"><Box size={16} className="text-gray-500"/><input type="number" placeholder="Tồn kho" value={variant.stock} onChange={e => handleVariantChange(index, 'stock', Number(e.target.value))} className="w-full border-gray-300 rounded-lg text-sm" required/></div>
                      <div className="text-right"><button type="button" onClick={() => removeVariant(index)} className="text-gray-400 hover:text-red-500 p-2"><X size={18} /></button></div>
                    </div>
                ))}
                 <button type="button" onClick={addVariant} className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-rose-600 border-2 border-dashed rounded-lg py-3 transition-colors hover:bg-rose-50"><Plus size={18} /> Thêm phiên bản</button>
              </div>
           </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tổ chức</h2>
              <div className="space-y-4">
                  <div>
                      <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-1">Giá (VNĐ/m)</label>
                      <input type="number" id="price" value={product.price || ''} onChange={e => handleInputChange('price', Number(e.target.value))} className="w-full border-gray-300 rounded-lg" required />
                  </div>
                  <div>
                      <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-1">Danh mục</label>
                      <input type="text" id="category" value={product.category || ''} onChange={e => handleInputChange('category', e.target.value)} className="w-full border-gray-300 rounded-lg" required />
                  </div>
                  <div>
                      <label htmlFor="tags" className="block text-sm font-bold text-gray-700 mb-1">Thẻ (Tags)</label>
                      <div className="flex flex-wrap gap-2"><input type="text" id="tags" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="Nhập thẻ & Enter" className="w-full border-gray-300 rounded-lg mt-2"/>
                        {(product.tags || []).map(tag => (
                            <div key={tag} className="flex items-center gap-1 bg-rose-100 text-rose-800 text-xs font-semibold px-2 py-1 rounded-full">
                                {tag}<button type="button" onClick={() => removeTag(tag)} className="ml-1"><X size={14} /></button>
                            </div>
                        ))}
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </form>
  );
};

export default EditProductPage;
