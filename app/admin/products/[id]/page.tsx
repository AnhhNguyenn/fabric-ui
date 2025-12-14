// app/admin/products/[id]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { productApi, categoryApi } from '../../../../src/utils/api';
import { Category } from '../../../../src/types';
import { Save, Image, Tag, Loader2, X } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [fileList, setFileList] = useState<FileList | null>(null);

    // Form data
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [categoryId, setCategoryId] = useState('');
    const [tag, setTag] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]); // Lưu trữ ảnh cũ

    // Fetch initial data (Product and Categories)
    useEffect(() => {
        const fetchData = async () => {
            if (!productId) return;

            try {
                // 1. Fetch Product Details (API 4.4)
                const product = await productApi.getById(productId);
                
                // Set form state with fetched data
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setTag(product.tag || '');
                setExistingImageUrls(product.imageUrls || []);
                setSeoTitle(product.seo?.title || '');
                setSeoDescription(product.seo?.description || '');
                
                // 2. Fetch Categories (API 3.1)
                const cats = await categoryApi.getAll();
                setCategories(cats);

                // Set selected category ID
                const currentCatId = typeof product.category === 'object' ? product.category._id : product.category;
                setCategoryId(currentCatId || (cats.length > 0 ? cats[0]._id : ''));

            } catch (err) {
                console.error("Lỗi tải dữ liệu sản phẩm:", err);
                setError("Không thể tải dữ liệu sản phẩm để chỉnh sửa.");
            } finally {
                setInitialLoading(false);
                setCategoryLoading(false);
            }
        };
        fetchData();
    }, [productId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileList(e.target.files);
        }
    };
    
    const handleRemoveExistingImage = (urlToRemove: string) => {
        setExistingImageUrls(prev => prev.filter(url => url !== urlToRemove));
    };

    // Handle update submission (API 4.3: PATCH /products/:id)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (!name || !price || !categoryId) {
            setError('Vui lòng điền đầy đủ Tên, Giá và Danh mục.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        // Chỉ gửi những trường có thể thay đổi
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('category', categoryId);
        formData.append('tag', tag);
        
        // Gửi danh sách ảnh cũ còn lại (để API biết những ảnh nào không bị xóa)
        formData.append('imageUrls', JSON.stringify(existingImageUrls)); 

        // SEO data
        formData.append('seo[title]', seoTitle);
        formData.append('seo[description]', seoDescription);
        formData.append('seo[keywords]', ''); 

        // Append NEW files if selected
        if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                formData.append('files', fileList[i]);
            }
        }

        try {
            await productApi.update(productId, formData);
            alert('Cập nhật sản phẩm thành công!');
            router.push('/admin/products');
        } catch (err) {
            console.error("Lỗi cập nhật sản phẩm:", err);
            setError('Cập nhật sản phẩm thất bại. Vui lòng kiểm tra console hoặc API.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="text-center p-20 flex flex-col items-center">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500 mb-4" />
                <p>Đang tải dữ liệu sản phẩm...</p>
            </div>
        );
    }
    
    if (error) {
        return <p className="text-red-500 text-lg p-4">Lỗi: {error}</p>;
    }


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Chỉnh sửa Sản phẩm: {name}</h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
                
                {/* THÔNG TIN CƠ BẢN */}
                <h2 className="text-xl font-semibold text-rose-500 border-b pb-2">Thông tin Cơ bản</h2>
                <input 
                    type="text" placeholder="Tên Sản phẩm" required
                    value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <textarea 
                    placeholder="Mô tả chi tiết" rows={4}
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                    <input 
                        type="number" placeholder="Giá (VND/mét)" required min="1000"
                        value={price} onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                    />
                    <select 
                        required
                        value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full p-2 border rounded disabled:bg-gray-100"
                        disabled={categoryLoading || categories.length === 0}
                    >
                        {categoryLoading && <option>Đang tải danh mục...</option>}
                        {categories.length === 0 && !categoryLoading && <option value="">Vui lòng tạo danh mục trước</option>}
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                    <Tag className="w-4 h-4" />
                    <input 
                        type="text" placeholder="Tag (VD: Best Seller, New)"
                        value={tag} onChange={(e) => setTag(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                

                {/* HÌNH ẢNH HIỆN TẠI */}
                <h2 className="text-xl font-semibold text-rose-500 border-b pb-2 pt-4">Hình ảnh Hiện tại</h2>
                <div className="flex flex-wrap gap-4">
                    {existingImageUrls.map(url => (
                        <div key={url} className="relative w-32 h-32 border rounded-lg shadow-sm">
                            <img src={url} alt="Existing product" className="w-full h-full object-cover rounded-lg" />
                            <button 
                                type="button"
                                onClick={() => handleRemoveExistingImage(url)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    {existingImageUrls.length === 0 && <p className="text-gray-500 italic">Không có ảnh nào được lưu.</p>}
                </div>
                
                {/* UPLOAD HÌNH ẢNH MỚI */}
                <h2 className="text-xl font-semibold text-rose-500 border-b pb-2 pt-4">Upload Hình ảnh mới (Sẽ được thêm vào)</h2>
                <div className="flex items-center space-x-2 text-gray-500">
                    <Image className="w-4 h-4" />
                    <input 
                        type="file" multiple 
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded bg-gray-50"
                    />
                </div>
                <p className="text-sm text-gray-500 ml-6">{fileList ? `${fileList.length} files đã chọn để upload.` : 'Chọn ảnh mới để thêm.'}</p>


                {/* SEO */}
                <h2 className="text-xl font-semibold text-rose-500 border-b pb-2 pt-4">Tối ưu SEO</h2>
                <input 
                    type="text" placeholder="SEO Title"
                    value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <textarea 
                    placeholder="SEO Description" rows={2}
                    value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />

                <button
                    type="submit"
                    disabled={loading || categoryLoading}
                    className="bg-rose-600 text-white px-6 py-3 rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-rose-700 transition"
                >
                    <Save className="w-5 h-5 mr-2" /> {loading ? 'Đang cập nhật...' : 'Lưu Thay Đổi'}
                </button>
            </form>
        </div>
    );
}