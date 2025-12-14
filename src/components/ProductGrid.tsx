"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PRODUCTS } from '../constants.tsx';
import { Product } from '../types';
import { Heart, Plus, Filter, ArrowDownUp, Search, X, Grid, LayoutGrid, ChevronDown, Check } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';
import { useCart } from '../context/CartContext';

const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  
  // Shop Mode States
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default'); // default, price-asc, price-desc
  const [searchQuery, setSearchQuery] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false); // New state for custom dropdown
  
  const sortRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- LOGIC: Fake a larger database when expanded ---
  const allProducts = useMemo(() => {
    if (!isExpanded) return PRODUCTS; // Return original 6 items
    
    // Duplicate items to simulate a full catalog of 18 items
    const extended = [
      ...PRODUCTS,
      ...PRODUCTS.map(p => ({ ...p, id: p.id + 100, name: p.name + ' (Ver. 2)' })),
      ...PRODUCTS.map(p => ({ ...p, id: p.id + 200, name: p.name + ' (Ver. 3)' }))
    ];
    return extended;
  }, [isExpanded]);

  // --- LOGIC: Filtering & Sorting ---
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Filter by Category
    if (activeCategory !== 'All') {
      const typeMap: {[key: string]: string} = { 'Silk': 'Lụa', 'Umi': 'Umi', 'Tussi': 'Tussi' };
      const targetType = typeMap[activeCategory] || activeCategory;
      result = result.filter(p => p.type === targetType);
    }

    // 2. Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    // 3. Sort
    if (sortOption === 'price-asc') {
        result.sort((a, b) => parseInt(a.price.replace(/\D/g,'')) - parseInt(b.price.replace(/\D/g,'')));
    } else if (sortOption === 'price-desc') {
        result.sort((a, b) => parseInt(b.price.replace(/\D/g,'')) - parseInt(a.price.replace(/\D/g,'')));
    }

    return result;
  }, [allProducts, activeCategory, searchQuery, sortOption]);

  const handleNext = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % filteredProducts.length;
    setSelectedProduct(filteredProducts[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
    setSelectedProduct(filteredProducts[prevIndex]);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); 
    e.preventDefault(); 
    addItem(product, 1);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const toggleLike = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    e.preventDefault();
    setLikedProducts(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleExpand = () => {
    setIsExpanded(true);
    // Smooth scroll slightly up to toolbar
    setTimeout(() => {
        document.getElementById('catalog-toolbar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const filterMap: {[key: string]: string} = {
      'All': 'Tất cả',
      'Silk': 'Lụa',
      'Umi': 'Umi',
      'Tussi': 'Tussi'
  };

  const sortOptions = [
      { value: 'default', label: 'Mặc định' },
      { value: 'price-asc', label: 'Giá: Thấp - Cao' },
      { value: 'price-desc', label: 'Giá: Cao - Thấp' },
  ];

  const currentSortLabel = sortOptions.find(o => o.value === sortOption)?.label;

  return (
    <section id="products" className="py-20 md:py-32 bg-lavender-blush relative min-h-screen">
      {/* Background Typography */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none">
          <h2 className="text-[20vw] font-serif font-bold text-white leading-none opacity-60 text-center select-none">
              FABRICS
          </h2>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <h2 className="font-serif text-4xl md:text-6xl text-charcoal max-w-lg leading-[0.9]">
                Tinh Tuyển Cho <br/>
                <span className="italic text-deep-rose">Sự Hoàn Hảo.</span>
            </h2>
            
            {/* Category Tabs (Original Style) - Only show if NOT expanded */}
            {!isExpanded && (
                <div className="flex flex-wrap gap-2 md:gap-4">
                    {['All', 'Silk', 'Umi', 'Tussi'].map((filter, idx) => (
                        <button 
                            key={filter} 
                            onClick={() => setActiveCategory(filter)}
                            className={`px-5 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all border border-charcoal ${activeCategory === filter ? 'bg-charcoal text-white' : 'bg-transparent text-charcoal hover:bg-charcoal hover:text-white'}`}
                        >
                            {filterMap[filter]}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* --- SMART CATALOG TOOLBAR (Visible when Expanded) --- */}
        {isExpanded && (
            <div id="catalog-toolbar" className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft rounded-2xl p-4 mb-10 animate-fade-up">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                    
                    {/* Left: Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
                        {['All', 'Silk', 'Umi', 'Tussi'].map((filter) => (
                             <button 
                                key={filter} 
                                onClick={() => setActiveCategory(filter)}
                                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === filter ? 'bg-deep-rose text-white shadow-md' : 'bg-white text-charcoal/60 hover:bg-rose-50 border border-transparent'}`}
                            >
                                {filterMap[filter]}
                            </button>
                        ))}
                    </div>

                    {/* Right: Search & Sort */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        {/* Search Input */}
                        <div className="relative flex-1 lg:w-72 group">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-deep-rose transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm vải..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-rose-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-deep-rose focus:ring-1 focus:ring-deep-rose/20 transition-all placeholder:text-gray-300"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-deep-rose">
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Custom Sort Dropdown */}
                        <div className="relative min-w-[180px]" ref={sortRef}>
                            <button 
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className={`w-full flex items-center justify-between bg-white border rounded-xl px-4 py-3 text-sm font-bold text-charcoal transition-all hover:border-deep-rose/50 ${isSortOpen ? 'border-deep-rose ring-1 ring-deep-rose/20' : 'border-rose-100'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <ArrowDownUp size={14} className="text-deep-rose" />
                                    <span>{currentSortLabel}</span>
                                </div>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute right-0 top-full mt-2 w-full min-w-[200px] bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden transform transition-all duration-300 origin-top-right z-50 ${isSortOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                                <ul className="py-2">
                                    {sortOptions.map((option) => (
                                        <li key={option.value}>
                                            <button 
                                                onClick={() => {
                                                    setSortOption(option.value);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full text-left px-5 py-3 text-sm font-medium flex items-center justify-between hover:bg-rose-50 transition-colors ${sortOption === option.value ? 'text-deep-rose bg-rose-50/50' : 'text-charcoal'}`}
                                            >
                                                {option.label}
                                                {sortOption === option.value && <Check size={14} className="text-deep-rose" />}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Result Count */}
                <div className="mt-4 pt-4 border-t border-rose-100/50 flex justify-between items-center text-xs text-charcoal/50 font-medium">
                    <span>Hiển thị {filteredProducts.length} sản phẩm</span>
                    {activeCategory !== 'All' && <span className="text-deep-rose bg-rose-50 px-2 py-1 rounded-md">Đang lọc: {filterMap[activeCategory]}</span>}
                </div>
            </div>
        )}

        {/* --- PRODUCT GRID --- */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-20 transition-all duration-500 ${isExpanded ? 'opacity-100' : ''}`}>
          {filteredProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className={`group cursor-pointer animate-fade-up ${!isExpanded && index % 2 !== 0 ? 'md:translate-y-20' : ''}`} // Stagger effect only on initial view
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative mb-6">
                 {/* Card Container */}
                <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] transition-all duration-700 ease-out transform group-hover:-translate-y-2 md:group-hover:-translate-y-4 group-hover:shadow-2xl shadow-md bg-white">
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Like Button */}
                    <button 
                        onClick={(e) => toggleLike(e, product.id)}
                        className={`absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-20 ${likedProducts.includes(product.id) ? 'bg-deep-rose text-white' : 'bg-white/30 text-white hover:bg-white hover:text-deep-rose'}`}
                    >
                         <Heart size={18} fill={likedProducts.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                    
                    {/* Hover Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 flex flex-col items-center">
                         <button 
                            onClick={(e) => handleQuickAdd(e, product)}
                            className={`w-full py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg flex items-center justify-center gap-2 transition-colors ${ 
                                addedToCart === product.id ? 'bg-green-500 text-white' : 'bg-white text-charcoal hover:bg-deep-rose hover:text-white'
                            }`}
                        >
                            {addedToCart === product.id ? 'Đã thêm' : 'Thêm nhanh'} <Plus size={14} />
                        </button>
                    </div>
                </div>
                
                {/* Decorative shadow element */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Product Info */}
              <div className="text-center group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-deep-rose uppercase mb-2">{product.type}</p>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2 group-hover:italic transition-all leading-tight line-clamp-1">{product.name}</h3>
                <p className="font-medium text-base md:text-lg text-charcoal/60">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* --- VIEW ALL BUTTON / FOOTER OF GRID --- */}
        {!isExpanded && (
            <div className="mt-20 md:mt-32 text-center">
                <button 
                    onClick={handleExpand}
                    className="group relative px-10 py-4 border-2 border-charcoal rounded-full font-bold uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300 text-sm md:text-base overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Xem tất cả sản phẩm <ArrowDownUp size={16} className="group-hover:rotate-180 transition-transform" />
                    </span>
                </button>
                <p className="mt-4 text-xs text-charcoal/40 font-serif italic">Khám phá hơn 18+ mẫu vải thiết kế độc quyền</p>
            </div>
        )}

        {isExpanded && filteredProducts.length === 0 && (
             <div className="text-center py-20 opacity-50">
                <Filter size={48} className="mx-auto mb-4 text-charcoal" />
                <p className="text-xl font-serif">Không tìm thấy sản phẩm phù hợp.</p>
                <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="mt-4 text-deep-rose underline">Xóa bộ lọc</button>
             </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
};

export default ProductGrid;