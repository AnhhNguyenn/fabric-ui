
// app/admin/categories/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { ICategory } from '@/src/models/Category';
import { Loader2, PlusCircle, Trash2, Edit, Save, Tag } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for creating/editing
  const [isEditing, setIsEditing] = useState<string | null>(null); // null for new, or category._id for editing
  const [currentName, setCurrentName] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories.');
      const data = await response.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!currentName.trim()) {
      setActionError('Tên danh mục không được để trống.');
      return;
    }
    setIsSubmitting(true);
    setActionError(null);
    
    const url = isEditing ? `/api/categories/${isEditing}` : '/api/categories';
    const method = isEditing ? 'PUT' : 'POST';
    const body = JSON.stringify({ name: currentName, description: currentDescription });

    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Thao tác thất bại');
      }
      await fetchCategories(); // Refresh list
      handleCancel(); // Close modal
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này không? Các sản phẩm thuộc danh mục này sẽ không bị ảnh hưởng.')) {
      try {
        const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Xóa thất bại.');
        await fetchCategories(); // Refresh list
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleAddNew = () => {
    setIsEditing(null);
    setCurrentName('');
    setCurrentDescription('');
    setActionError(null);
  };

  const handleEdit = (category: ICategory) => {
    setIsEditing(category._id.toString());
    setCurrentName(category.name);
    setCurrentDescription(category.description || '');
    setActionError(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setCurrentName('');
    setCurrentDescription('');
    setActionError(null);
  };

  if (loading) return <div className="flex items-center justify-center p-20"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải...</div>;
  if (error) return <p className="text-red-500 p-4">Lỗi: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 font-serif flex items-center gap-3"><Tag size={30}/>Quản lý Danh mục</h1>
        <button onClick={handleAddNew} className="flex items-center gap-2 bg-deep-rose text-white font-bold py-2 px-4 rounded-xl hover:bg-rose-700 transition-colors">
          <PlusCircle size={20} />
          Thêm Danh mục mới
        </button>
      </div>

      {/* Form/Modal for Add/Edit */}
      {(isEditing !== null || currentName) && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{isEditing ? 'Chỉnh sửa Danh mục' : 'Tạo Danh mục mới'}</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Tên Danh mục</label>
              <input id="name" type="text" value={currentName} onChange={(e) => setCurrentName(e.target.value)} placeholder="Ví dụ: Vải Cotton" className="w-full border-gray-300 rounded-lg"/>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">Mô tả (tùy chọn)</label>
              <textarea id="description" value={currentDescription} onChange={(e) => setCurrentDescription(e.target.value)} rows={3} placeholder="Mô tả ngắn về danh mục" className="w-full border-gray-300 rounded-lg"></textarea>
            </div>
            {actionError && <p className="text-sm text-red-600">{actionError}</p>}
            <div className="flex justify-end gap-3">
              <button onClick={handleCancel} className="py-2 px-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Hủy</button>
              <button onClick={handleSave} disabled={isSubmitting} className="py-2 px-4 flex items-center gap-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {isSubmitting ? <Loader2 className="animate-spin"/> : <Save/>}
                {isEditing ? 'Lưu thay đổi' : 'Tạo mới'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="min-w-[600px] overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-rose-50/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tl-xl">Tên Danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Mô tả</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tr-xl">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {categories.map(cat => (
                  <tr key={cat._id.toString()} className="hover:bg-rose-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                    <td className="px-6 py-4 text-gray-500 italic">{cat.description || 'Không có mô tả'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1"><Edit size={16}/> Sửa</button>
                        <button onClick={() => handleDelete(cat._id.toString())} className="text-red-600 hover:text-red-800 flex items-center gap-1"><Trash2 size={16}/> Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
