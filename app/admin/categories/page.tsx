// app/admin/categories/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { categoryApi } from '../../../src/utils/api';
import { Category } from '../../../src/types';
import { Trash2, Plus, Edit, Save, X, Loader2, Info, Search, Share2 } from 'lucide-react';

// Hàm hỗ trợ tạo slug (chuẩn hóa tên thành đường dẫn)
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

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State cho Form Tạo mới
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [newMetaTitle, setNewMetaTitle] = useState('');
  const [newMetaDescription, setNewMetaDescription] = useState('');
  // THÊM CÁC TRƯỜNG OPEN GRAPH BẮT BUỘC
  const [newOgTitle, setNewOgTitle] = useState('');
  const [newOgDescription, setNewOgDescription] = useState('');
  const [newOgImage, setNewOgImage] = useState(''); 
  
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  
  // State cho Chỉnh sửa
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editMetaTitle, setEditMetaTitle] = useState('');
  const [editMetaDescription, setEditMetaDescription] = useState('');
  const [editOgTitle, setEditOgTitle] = useState('');
  const [editOgDescription, setEditOgDescription] = useState('');
  const [editOgImage, setEditOgImage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err) {
      setError("Không thể tải danh mục. Đã xảy ra lỗi API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}"? Thao tác này không thể hoàn tác.`)) {
      try {
        await categoryApi.delete(id);
        fetchCategories(); 
        alert(`Đã xóa danh mục "${name}" thành công.`);
      } catch (err) {
        alert("Xóa danh mục thất bại. Vui lòng kiểm tra lại quyền hạn hoặc kết nối API.");
      }
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    if (!newCategoryName || !newMetaTitle || !newMetaDescription || !newOgTitle || !newOgDescription || !newOgImage) {
        setCreateError("Vui lòng điền đủ Tên, Meta Title, Meta Description VÀ TẤT CẢ CÁC TRƯỜNG OPEN GRAPH.");
        return;
    }
    
    // TẠO TRƯỜNG BẮT BUỘC BẰNG LOGIC
    const newSlug = createSlug(newCategoryName);
    const newCanonicalUrl = `/categories/${newSlug}`;

    setIsCreating(true);
    try {
        await categoryApi.create({ 
            name: newCategoryName, 
            description: newCategoryDesc, 
            seo: { 
                metaTitle: newMetaTitle,
                metaDescription: newMetaDescription,
                slug: newSlug, 
                canonicalUrl: newCanonicalUrl, 
                keywords: '',
                // FIX: BỔ SUNG OPEN GRAPH CÓ DỮ LIỆU
                openGraph: { 
                    title: newOgTitle,
                    description: newOgDescription,
                    image: newOgImage, // PHẢI LÀ MỘT URL ẢNH HỢP LỆ
                }
            }
        });
        
        // Reset form
        setNewCategoryName('');
        setNewCategoryDesc('');
        setNewMetaTitle('');
        setNewMetaDescription('');
        setNewOgTitle('');
        setNewOgDescription('');
        setNewOgImage('');

        fetchCategories();
        alert(`Đã tạo danh mục "${newCategoryName}" thành công.`);
    } catch (error: any) {
        const apiErrorMessage = error.message; 
        if (apiErrorMessage && apiErrorMessage.includes('400')) {
             setCreateError(`Lỗi 400: Dữ liệu không hợp lệ. Hãy kiểm tra lại Tên/Meta Title/Meta Description VÀ CÁC TRƯỜNG OPEN GRAPH (độ dài/định dạng).`);
        } else {
             setCreateError(apiErrorMessage || "Tạo danh mục thất bại. Đã có lỗi xảy ra.");
        }
    } finally {
        setIsCreating(false);
    }
  };
  
  const handleEditStart = (category: Category) => {
    setEditingId(category._id);
    setEditName(category.name);
    setEditDesc(category.description);
    // Tải dữ liệu SEO hiện tại
    setEditMetaTitle(category.seo?.metaTitle || category.seo?.title || '');
    setEditMetaDescription(category.seo?.metaDescription || category.seo?.description || '');
    // Tải dữ liệu OG hiện tại
    setEditOgTitle(category.seo?.openGraph?.title || '');
    setEditOgDescription(category.seo?.openGraph?.description || '');
    setEditOgImage(category.seo?.openGraph?.image || '');
  };
  
  const handleEditSave = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingId || !editName) return;
      setIsUpdating(true);

      const editSlug = createSlug(editName);
      const editCanonicalUrl = `/categories/${editSlug}`;
      
      try {
          await categoryApi.update(editingId, { 
              name: editName, 
              description: editDesc,
              seo: { 
                  metaTitle: editMetaTitle,
                  metaDescription: editMetaDescription,
                  slug: editSlug, 
                  canonicalUrl: editCanonicalUrl,
                  keywords: '',
                  openGraph: {
                     title: editOgTitle,
                     description: editOgDescription,
                     image: editOgImage,
                  }
              }
          });
          setEditingId(null);
          fetchCategories();
          alert(`Cập nhật danh mục thành công.`);
      } catch (error) {
          alert("Cập nhật danh mục thất bại.");
      } finally {
          setIsUpdating(false);
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
        <h1 className="text-3xl font-bold text-gray-800 font-serif">Quản lý Danh mục</h1>

        {/* Form Tạo mới */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-rose-500 mb-4 border-b pb-2">Tạo Danh mục mới</h2>
            <form onSubmit={handleCreate} className="space-y-4">
                {createError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl flex items-center text-sm">
                        <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{createError}</span>
                    </div>
                )}
                
                {/* Thông tin cơ bản */}
                <input 
                    type="text" 
                    placeholder="VD: Lụa Tơ Tằm"
                    required
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                />
                <textarea 
                    placeholder="VD: Các loại lụa cao cấp, tơ tằm, satin"
                    value={newCategoryDesc}
                    onChange={(e) => setNewCategoryDesc(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                />

                {/* SEO Section */}
                <h3 className="text-lg font-semibold text-gray-700 pt-2 flex items-center gap-2">
                    <Search className="w-4 h-4 text-rose-400" />
                    Tối ưu SEO (Meta Title & Description)
                </h3>
                <input 
                    type="text" 
                    placeholder="Meta Title: VD: Danh mục Lụa Tơ Tằm | Muse Fabric (BẮT BUỘC)" 
                    required
                    value={newMetaTitle}
                    onChange={(e) => setNewMetaTitle(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                />
                <textarea 
                    placeholder="Meta Description: VD: Tổng hợp các loại vải lụa tơ tằm nguyên chất... (BẮT BUỘC)" 
                    required
                    value={newMetaDescription}
                    onChange={(e) => setNewMetaDescription(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                    rows={2}
                />
                
                {/* OPEN GRAPH SECTION */}
                <h3 className="text-lg font-semibold text-gray-700 pt-4 flex items-center gap-2 border-t mt-4">
                    <Share2 className="w-4 h-4 text-pink-500" />
                    Open Graph (Chia sẻ Social - BẮT BUỘC)
                </h3>
                <input 
                    type="text" 
                    placeholder="OG Title: Tiêu đề khi chia sẻ (BẮT BUỘC)" 
                    required
                    value={newOgTitle}
                    onChange={(e) => setNewOgTitle(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                />
                 <textarea 
                    placeholder="OG Description: Mô tả khi chia sẻ (BẮT BUỘC)" 
                    required
                    value={newOgDescription}
                    onChange={(e) => setNewOgDescription(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                    rows={2}
                />
                <input 
                    type="url" 
                    placeholder="OG Image URL: Link ảnh khi chia sẻ (BẮT BUỘC)" 
                    required
                    value={newOgImage}
                    onChange={(e) => setNewOgImage(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                />


                <p className='text-xs text-gray-500'>* Lưu ý: Slug, Canonical URL sẽ được tự động tạo.</p>

                <button 
                    type="submit" 
                    disabled={isCreating}
                    className="bg-rose-500 text-white px-4 py-2.5 rounded-xl flex items-center disabled:opacity-50 hover:bg-rose-600 transition shadow-md shadow-rose-300/50 font-semibold uppercase text-sm"
                >
                    <Plus className="w-5 h-5 mr-2" /> {isCreating ? 'Đang tạo...' : 'Tạo mới Danh mục'}
                </button>
            </form>
        </div>

        {/* Danh sách (Giữ nguyên) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Danh sách ({categories.length})</h2>
            <ul className="divide-y divide-gray-100">
                {categories.map((cat) => (
                    <li key={cat._id} className="py-4 flex flex-col transition-colors hover:bg-rose-50/30 rounded-lg px-2 -mx-2">
                        {editingId === cat._id ? (
                            // Form chỉnh sửa (Rút gọn)
                            <form onSubmit={handleEditSave} className="flex flex-col space-y-2 p-4 border border-blue-200 rounded-xl bg-blue-50/50">
                                <h4 className="font-bold text-lg">Chỉnh sửa: {cat.name}</h4>
                                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required className="p-2 border border-blue-300 rounded-lg font-semibold text-lg" />
                                <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="p-2 border border-blue-300 rounded-lg text-sm" rows={2} />
                                
                                <h5 className="text-sm font-semibold text-blue-800 pt-2">Dữ liệu SEO</h5>
                                <input type="text" placeholder="Meta Title" value={editMetaTitle} onChange={(e) => setEditMetaTitle(e.target.value)} className="p-2 border border-blue-300 rounded-lg text-sm" />
                                <textarea placeholder="Meta Description" value={editMetaDescription} onChange={(e) => setEditMetaDescription(e.target.value)} className="p-2 border border-blue-300 rounded-lg text-sm" rows={1} />
                                
                                <h5 className="text-sm font-semibold text-pink-800 pt-2">Dữ liệu OG</h5>
                                <input type="text" placeholder="OG Title" value={editOgTitle} onChange={(e) => setEditOgTitle(e.target.value)} className="p-2 border border-pink-300 rounded-lg text-sm" />
                                <input type="text" placeholder="OG Description" value={editOgDescription} onChange={(e) => setEditOgDescription(e.target.value)} className="p-2 border border-pink-300 rounded-lg text-sm" />
                                <input type="text" placeholder="OG Image URL" value={editOgImage} onChange={(e) => setEditOgImage(e.target.value)} className="p-2 border border-pink-300 rounded-lg text-sm" />

                                <div className="flex space-x-2 justify-end pt-2">
                                    <button type="button" onClick={() => setEditingId(null)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg flex items-center transition"><X className="w-4 h-4 mr-1" /> Hủy</button>
                                    <button type="submit" disabled={isUpdating} className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center disabled:opacity-50 hover:bg-green-600 transition shadow-md"><Save className="w-4 h-4 mr-1" /> {isUpdating ? 'Đang lưu...' : 'Lưu'}</button>
                                </div>
                            </form>
                        ) : (
                            // Chế độ hiển thị
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-900">{cat.name}</p>
                                    <p className="text-sm text-gray-500">{cat.description}</p>
                                    {cat.seo?.metaTitle && <p className="text-xs text-rose-400 mt-1">SEO Title: {cat.seo.metaTitle}</p>}
                                </div>
                                <div className="space-x-2 flex items-center">
                                    <button onClick={() => handleEditStart(cat)} className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition" title="Chỉnh sửa"><Edit className="w-5 h-5" /></button>
                                    <button onClick={() => handleDelete(cat._id, cat.name)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition" title="Xóa"><Trash2 className="w-5 h-5" /></button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {categories.length === 0 && <p className="text-gray-500 italic p-4 text-center">Chưa có danh mục nào được tạo.</p>}
        </div>
    </div>
  );
}