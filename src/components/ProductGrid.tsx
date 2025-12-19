
// src/components/ProductGrid.tsx
'use client'; 
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getProducts } from '../data/products';
import { getCategories } from '../data/categories';
import { Product, Category } from '../types';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { Loader2, Search, X, Tag, ArrowDown } from 'lucide-react';

export default function ProductGrid() {
  // === State chính ===
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // === State cho Modal ===
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // === State cho UI mở rộng & Lọc ===
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // === State và Ref cho Sticky Filter ===
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const productSectionRef = useRef<HTMLElement>(null);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  // --- 1. Tải dữ liệu ban đầu ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()]);
        setAllProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- 2. Logic cho Sticky Filter khi cuộn trang ---
  useEffect(() => {
    const handleScroll = () => {
      if (!isExpanded || !productSectionRef.current || !filterContainerRef.current) {
        if (isFilterSticky) setIsFilterSticky(false);
        return;
      }

      const sectionRect = productSectionRef.current.getBoundingClientRect();
      const filterHeight = filterContainerRef.current.offsetHeight;

      // Ghim khi đỉnh của section chạm đỉnh viewport
      // Bỏ ghim khi đáy của section vượt lên trên chiều cao của thanh filter
      const shouldBeSticky = sectionRect.top <= 0 && sectionRect.bottom >= filterHeight;
      
      if (shouldBeSticky !== isFilterSticky) {
        setIsFilterSticky(shouldBeSticky);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded, isFilterSticky]);

  // --- 3. Logic lọc và hiển thị sản phẩm ---
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(p => 
        selectedCategory === 'all' || (typeof p.category === 'string' ? p.category : p.category.name) === selectedCategory
      )
      .filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allProducts, selectedCategory, searchTerm]);

  const productsToShow = isExpanded ? filteredProducts : allProducts.slice(0, 4);

  if (loading) {
    return (
      <section id="products" className="py-20 bg-rose-50/30">
         <div className="text-center p-10 flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-rose-400 mb-4" />
            <p className="text-lg text-rose-800/60">Đang chuẩn bị những thước vải đẹp nhất...</p>
        </div>
      </section>
    );
  }

  return (
    <>
        <section id="products" ref={productSectionRef} className={`py-16 md:py-24 transition-colors duration-500 ${isExpanded ? 'bg-white' : 'bg-rose-50/30'}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">Cảm Hứng Từ Vải</h2>
                    <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">Mỗi thước vải là một câu chuyện. Khám phá ngay bộ sưu tập độc đáo của chúng tôi.</p>
                </div>

                {/* === CONTAINER CHO BỘ LỌC (để giữ không gian) === */}
                {isExpanded && (
                    <div ref={filterContainerRef} className={`mb-10 transition-all`} style={{ height: isFilterSticky ? filterContainerRef.current?.offsetHeight : 'auto' }}>
                        <div className={`transition-all duration-300 ${isFilterSticky ? 'fixed top-0 left-0 right-0 z-40 animate-fade-in-down' : 'relative'}`}>
                            <div className={`container mx-auto px-4 ${isFilterSticky ? 'py-3' : ''}`}>
                                <div className={`p-4 rounded-xl border ${isFilterSticky ? 'bg-white/80 backdrop-blur-lg shadow-lg border-gray-200' : 'bg-rose-50/50 border-rose-100/80'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                        <div className="md:col-span-2 relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" size={20} />
                                            <input 
                                                type="text"
                                                placeholder="Tìm theo tên, chất liệu..."
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 border border-rose-200/50 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none transition bg-white"
                                            />
                                            {searchTerm && <X onClick={() => setSearchTerm('')} size={18} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600 cursor-pointer'/>}
                                        </div>
                                        <div className="md:col-span-3 flex flex-wrap items-center justify-start gap-2">
                                            <button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all ${selectedCategory === 'all' ? 'bg-rose-600 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-rose-100/80 border border-gray-200/80'}`}>
                                                Tất cả
                                            </button>
                                            {categories.map(cat => (
                                                <button key={cat._id} onClick={() => setSelectedCategory(cat.name)} className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all ${selectedCategory === cat.name ? 'bg-rose-600 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-rose-100/80 border border-gray-200/80'}`}>
                                                    <Tag size={14}/> {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {productsToShow.map(product => (
                        <div key={product._id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-14">
                    {!isExpanded ? (
                        <button 
                            onClick={() => setIsExpanded(true)}
                            className="bg-white border border-rose-200/80 text-rose-700 font-bold py-3 px-8 rounded-full shadow-sm hover:shadow-lg hover:border-rose-300 hover:-translate-y-0.5 transform transition-all duration-300 flex items-center gap-2 mx-auto"
                        >
                            <ArrowDown size={18}/> Khám phá Toàn bộ Bộ sưu tập
                        </button>
                    ) : (filteredProducts.length === 0 &&
                        <p className="text-lg text-gray-500">Không tìm thấy sản phẩm nào phù hợp với lựa chọn của bạn.</p>
                    )}
                </div>
            </div>
        </section>

        {selectedProduct && (
            <ProductDetailModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />
        )}
    </>
  );
}
