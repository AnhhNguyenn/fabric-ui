
// app/products/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { getProducts } from '../../src/data/products';
import { getCategories } from '../../src/data/categories';
import { Product, Category } from '../../src/types';
import ProductCard from '../../src/components/ProductCard';
import { Loader2, LayoutGrid, Tag } from 'lucide-react';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);
                setProducts(productsData);
                setFilteredProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => {
                // Xử lý cả trường hợp category là object hoặc string
                const categoryName = typeof p.category === 'string' ? p.category : p.category.name;
                return categoryName === selectedCategory;
            }));
        }
    }, [selectedCategory, products]);

    if (loading) {
        return (
            <div className="text-center p-20 flex flex-col items-center">
                <Loader2 className="w-10 h-10 animate-spin text-rose-500 mb-4" />
                <p className="text-lg text-gray-600">Đang tải các sản phẩm vải...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-800">Bộ Sưu Tập Vải</h1>
                <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">Khám phá thế giới chất liệu đa dạng, từ lụa là gấm vóc đến cotton thoáng mát.</p>
            </div>

            {/* Bộ lọc danh mục */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                 <button 
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-200 flex items-center gap-2 ${selectedCategory === 'all' ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-rose-50'}`}>
                     <LayoutGrid size={16}/> Tất cả
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat._id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-200 flex items-center gap-2 ${selectedCategory === cat.name ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-rose-50'}`}>
                        <Tag size={16}/> {cat.name}
                    </button>
                ))}
            </div>

            {/* Lưới sản phẩm */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

             {filteredProducts.length === 0 && (
                <div className="text-center col-span-full py-16">
                    <p className="text-xl text-gray-500">Không tìm thấy sản phẩm nào phù hợp.</p>
                </div>
            )}
        </div>
    );
}
