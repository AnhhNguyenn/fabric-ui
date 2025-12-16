// app/admin/products/create/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { productApi, categoryApi } from '../../../../src/utils/api';
import { Category } from '../../../../src/types';
import { Save, Image, Tag, Loader2, Info, List, DollarSign, Search, Zap, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Hàm hỗ trợ tạo slug
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
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<FileList | null>(null);

    // Form data
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [categoryId, setCategoryId] = useState('');
    const [tag, setTag] = useState('');
    
    // SEO fields (MetaTitle/Description)
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    
    // OPEN GRAPH fields (BẮT BUỘC)
    const [ogTitle, setOgTitle] = useState('');
    const [ogDescription, setOgDescription] = useState('');
    const [ogImage, setOgImage] = useState('');
    
    const [formError, setFormError] = useState<string | null>(null);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryApi.getAll();
                setCategories(data);
                if (data.length > 0) {
                    setCategoryId(data[0]._id);
                }
            } catch (err) {
                console.error("Lỗi tải danh mục:", err);
            } finally {
                setCategoryLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileList(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        
        // Kiểm tra tất cả các trường bắt buộc (cả SEO/OG)
        if (!name || !price || !categoryId || !fileList || fileList.length === 0 || !metaTitle || !metaDescription || !ogTitle || !ogDescription || !ogImage) {
            setFormError('Vui lòng điền đầy đủ tất cả các trường, bao gồm cả SEO và Open Graph BẮT BUỘC (Title, Description, Image URL).');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        const productSlug = createSlug(name);
        const productCanonicalUrl = `/products/${productSlug}`;

        // Thông tin cơ bản
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('category', categoryId);
        formData.append('tag', tag);

        // --- Dữ liệu SEO BẮT BUỘC ---
        formData.append('seo[metaTitle]', metaTitle);
        formData.append('seo[metaDescription]', metaDescription);
        formData.append('seo[slug]', productSlug); // Tự động tạo
        formData.append('seo[canonicalUrl]', productCanonicalUrl); // Tự động tạo
        formData.append('seo[keywords]', ''); 

        // --- Dữ liệu Open Graph BẮT BUỘC ---
        formData.append('seo[openGraph][title]', ogTitle);
        formData.append('seo[openGraph][description]', ogDescription);
        formData.append('seo[openGraph][image]', ogImage); 
        
        // Files
        for (let i = 0; i < fileList.length; i++) {
            formData.append('files', fileList[i]);
        }

        try {
            await productApi.create(formData);
            alert('Tạo sản phẩm thành công!');
            router.push('/admin/products');
        } catch (error) {
            console.error("Lỗi tạo sản phẩm:", error);
            setFormError('Tạo sản phẩm thất bại. Vui lòng kiểm tra console hoặc API.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 font-serif">Tạo Sản phẩm mới</h1>
            
            {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center">
                    <Info className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>{formError}</span>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* THÔNG TIN CƠ BẢN (Col 1 & 2) */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                        <h2 className="text-2xl font-bold text-rose-500 border-b pb-3 font-serif flex items-center gap-2">
                             <Zap className="w-5 h-5"/> Dữ liệu Bán hàng
                        </h2>
                        
                        {/* Name & Description */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Tên Sản phẩm <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                placeholder="VD: Lụa Tơ Tằm cao cấp màu Hồng Phấn"
                                required
                                value={name} onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Mô tả chi tiết</label>
                            <textarea 
                                placeholder="VD: Dòng lụa thượng hạng, 100% tơ tằm tự nhiên, mềm mịn, thoáng khí..."
                                rows={4}
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                            />
                        </div>

                        {/* Price, Category, Tag */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="number" 
                                    placeholder="VD: 450000 (đơn vị/mét) *"
                                    required min="1000"
                                    value={price} onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                                />
                            </div>
                            <div className="relative">
                                <List className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <select 
                                    required
                                    value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition disabled:bg-gray-100 appearance-none"
                                    disabled={categoryLoading || categories.length === 0}
                                >
                                    {categoryLoading && <option>Đang tải danh mục...</option>}
                                    {categories.length === 0 && !categoryLoading && <option value="">Vui lòng tạo danh mục trước</option>}
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <Tag className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text" 
                                    placeholder="VD: Best Seller"
                                    value={tag} onChange={(e) => setTag(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                                />
                            </div>
                        </div>

                        {/* HÌNH ẢNH */}
                        <h2 className="text-2xl font-bold text-rose-500 border-b pb-3 pt-4 font-serif flex items-center gap-2">
                             <Image className="w-5 h-5"/> Hình ảnh <span className="text-red-500 text-base">*</span>
                        </h2>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Upload ảnh (Tối đa 5 ảnh)</label>
                            <div className="flex items-center space-x-4">
                                <Image className="w-6 h-6 text-gray-400" />
                                <input 
                                    type="file" multiple required
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                                />
                            </div>
                            <p className="text-xs text-gray-500 ml-10">{fileList ? `${fileList.length} files đã chọn.` : 'Chọn 1 hoặc nhiều ảnh.'}</p>
                        </div>
                    </div>

                    {/* SEO & Open Graph (Col 3) */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-6 self-start">
                        <h2 className="text-xl font-bold text-rose-500 border-b pb-3 font-serif flex items-center gap-2">
                            <Search className="w-5 h-5"/> Tối ưu SEO (Google)
                        </h2>
                        
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Meta Title <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                placeholder="VD: Lụa Tơ Tằm Hồng Phấn | RiCa"
                                required
                                value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Meta Description <span className="text-red-500">*</span></label>
                            <textarea 
                                placeholder="VD: Mua lụa tơ tằm nguyên chất, satin, umi tại RiCa với giá tốt nhất."
                                required
                                rows={3}
                                value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                            />
                        </div>

                        {/* OPEN GRAPH SECTION */}
                        <h3 className="text-xl font-bold text-rose-500 border-b pb-3 pt-4 font-serif flex items-center gap-2">
                            <Share2 className="w-5 h-5"/> Open Graph (Social)
                        </h3>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">OG Title <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                placeholder="Tiêu đề khi chia sẻ (BẮT BUỘC)" 
                                required
                                value={ogTitle}
                                onChange={(e) => setOgTitle(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">OG Description <span className="text-red-500">*</span></label>
                            <textarea 
                                placeholder="Mô tả khi chia sẻ (BẮT BUỘC)" 
                                required
                                value={ogDescription}
                                onChange={(e) => setOgDescription(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                                rows={2}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">OG Image URL <span className="text-red-500">*</span></label>
                            <input 
                                type="url" 
                                placeholder="Link ảnh cho Social (VD: https://imgur.com/...)" 
                                required
                                value={ogImage}
                                onChange={(e) => setOgImage(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition"
                            />
                        </div>
                    </div>
                </div>

                {/* SAVE BUTTON - Full width below sections */}
                <div className="pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading || categoryLoading}
                        className="w-full bg-rose-600 text-white px-6 py-3.5 rounded-xl flex items-center justify-center disabled:opacity-50 hover:bg-rose-700 transition shadow-lg shadow-rose-300/50 font-extrabold uppercase text-lg"
                    >
                        {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                        {loading ? 'Đang tạo...' : 'LƯU SẢN PHẨM'}
                    </button>
                </div>
            </form>
        </div>
    );
}