
// src/components/ProductGrid.tsx
'use client'; 
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getProducts } from '../data/products';
import { getCategories } from '../data/categories';
import { Product, Category } from '../types';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
// Sửa lỗi: Đã xóa ArrowDown không được sử dụng
import { Loader2, Search, X, Tag, ChevronDown } from 'lucide-react';

export default function ProductGrid() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const productSectionRef = useRef<HTMLElement>(null);
  const filterContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!isExpanded || !productSectionRef.current || !filterContainerRef.current) {
        if (isFilterSticky) setIsFilterSticky(false);
        return;
      }
      const navbarHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 0;
      const sectionRect = productSectionRef.current.getBoundingClientRect();
      const filterHeight = filterContainerRef.current.offsetHeight;

      const shouldBeSticky = sectionRect.top <= navbarHeight && sectionRect.bottom >= (filterHeight + navbarHeight);
      
      if (shouldBeSticky !== isFilterSticky) {
        setIsFilterSticky(shouldBeSticky);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded, isFilterSticky]);

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

  const productsToShow = isExpanded ? filteredProducts : allProducts.slice(0, 8);

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

                {isExpanded && (
                    <div ref={filterContainerRef} className={`mb-10 transition-all`} style={{ height: isFilterSticky ? filterContainerRef.current?.offsetHeight : 'auto' }}>
                        <div 
                            className={`transition-all duration-300 ${isFilterSticky ? 'fixed left-0 right-0 z-40 animate-fade-in-down' : 'relative'}`}
                            style={{ top: isFilterSticky ? 'var(--navbar-height)' : 'auto' }}
                        >
                            <div className={`container mx-auto px-4 ${isFilterSticky ? 'py-3' : ''}`}>
                                <div className={`p-4 rounded-xl border ${isFilterSticky ? 'bg-white/90 backdrop-blur-lg shadow-lg border-gray-200' : 'bg-rose-50/50 border-rose-100/80'}`}>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                                        <div className="lg:col-span-1 relative">
                                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400" size={20} />
                                            <input 
                                                type="text"
                                                placeholder="Tìm tên vải, chất liệu..."
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                                className="w-full pl-11 pr-10 py-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition bg-white shadow-sm"
                                            />
                                            {searchTerm && <X onClick={() => setSearchTerm('')} size={18} className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600 cursor-pointer'/>}
                                        </div>
                                        <div className="lg:col-span-2 flex flex-wrap items-center justify-start gap-2">
                                            <CategoryButton 
                                                name="Tất cả sản phẩm"
                                                isActive={selectedCategory === 'all'}
                                                onClick={() => setSelectedCategory('all')}
                                            />
                                            {categories.map(cat => (
                                                <CategoryButton 
                                                    key={cat._id} 
                                                    name={cat.name}
                                                    isActive={selectedCategory === cat.name}
                                                    onClick={() => setSelectedCategory(cat.name)}
                                                />
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
                        <div key={product._id} onClick={() => setSelectedProduct(product)} className="cursor-pointer group">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-14">
                    {!isExpanded ? (
                        <button 
                            onClick={() => setIsExpanded(true)}
                            className="bg-white border border-rose-200/80 text-rose-700 font-bold py-3.5 px-10 rounded-full shadow-sm hover:shadow-lg hover:border-rose-300 hover:-translate-y-0.5 transform transition-all duration-300 flex items-center gap-3 mx-auto"
                        >
                            <ChevronDown size={20}/> Khám phá Toàn bộ
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

const CategoryButton = ({ name, isActive, onClick }: { name: string, isActive: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick} 
        className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all duration-200 border transform-gpu active:scale-95 ${isActive ? 'bg-deep-rose text-white border-deep-rose shadow-md' : 'bg-white text-gray-700 hover:bg-rose-50 border-gray-200'}`}>
        {isActive && <Tag size={14} className="-ml-1"/>} {name}
    </button>
);
