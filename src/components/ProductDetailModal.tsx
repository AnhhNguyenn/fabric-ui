// src/components/ProductDetailModal.tsx
"use client";
import React, { useState } from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Minus, Plus, ChevronLeft, ChevronRight, Check, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onNext, onPrev }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  // Prevent click propagation from modal content to backdrop
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    // Lưu ý: product.features không còn tồn tại trong Product interface, nhưng logic thêm vào giỏ hàng là đúng
    addItem(product, quantity); 
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  // Lấy ảnh đầu tiên, dùng placeholder nếu không có ảnh
  const imageUrl = product.imageUrls?.[0] || 'https://via.placeholder.com/600x800?text=No+Image';
  
  // Lấy danh mục, dùng tên nếu category là object, hoặc dùng giá trị nếu là string ID
  const categoryName = typeof product.category === 'object' 
    ? (product.category as any).name || 'Vải' 
    : 'Vải';
    
  // Format giá
  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
  
  // Dữ liệu Features tạm thời (Vì Product interface mới không có features)
  const dummyFeatures = [
    "100% Tơ tằm tự nhiên", "Khổ vải 1.5m", "Không tích điện", "Giữ ấm mùa đông, mát mùa hè"
  ];


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <div 
        className="relative bg-white w-full max-w-5xl max-h-[90vh] md:max-h-[600px] rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-rose-900/10 overflow-hidden flex flex-col md:flex-row z-10 animate-fade-up"
        onClick={handleContentClick}
      >
        
        {/* Close Button - Mobile: Top Right floating */}
        <button 
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 z-50 w-8 h-8 bg-black/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-colors"
        >
          <X size={18} />
        </button>

        {/* --- LEFT: IMAGE SECTION --- */}
        <div className="w-full md:w-[45%] h-[30vh] md:h-auto relative bg-lavender-blush group shrink-0">
           <img 
            src={imageUrl} // FIX: Dùng imageUrl đã được tính toán
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-30 transition-opacity"></div>
           
           {/* Tag Overlay */}
           <div className="absolute top-6 left-6 hidden md:block">
              <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-deep-rose shadow-sm border border-white">
                 {product.tag || 'MỚI'}
              </span>
           </div>
        </div>

        {/* --- RIGHT: CONTENT SECTION --- */}
        <div className="w-full md:w-[55%] flex flex-col bg-white min-h-0">
           
           {/* Scrollable Content Area */}
           <div className="flex-1 overflow-y-auto p-6 md:p-10 md:pr-12">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                 <div>
                    <div className="flex items-center gap-2 mb-2">
                         <span className="text-rose-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{categoryName} Collection</span>
                         <div className="flex text-amber-400">
                            {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                         </div>
                    </div>
                    <h2 className="font-serif text-2xl md:text-4xl text-charcoal leading-tight">{product.name}</h2>
                 </div>
                 
                 {/* Desktop Close Button */}
                 <button 
                    onClick={onClose}
                    className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-deep-rose transition-colors"
                 >
                    <X size={20} />
                 </button>
              </div>

              {/* Price Row */}
              <div className="flex items-end gap-3 mb-6 pb-6 border-b border-dashed border-rose-100">
                  <span className="text-2xl md:text-3xl font-serif text-deep-rose font-medium">{formattedPrice}/m</span> {/* FIX: Định dạng giá */}
                  <span className="mb-1.5 text-xs text-gray-400 line-through">550.000đ/m</span>
                  <span className="mb-1.5 px-2 py-0.5 bg-rose-100 text-deep-rose text-[10px] font-bold rounded uppercase">Tiết kiệm 20%</span>
              </div>

              {/* Description */}
              <p className="text-charcoal/70 leading-relaxed mb-8 font-light text-sm md:text-base text-justify">
                {product.description}
              </p>

              {/* Features Grid */}
              <div className="bg-lavender-blush/40 rounded-2xl p-5 mb-6">
                 <h4 className="font-serif text-charcoal text-base mb-3 font-bold">Chi tiết sản phẩm</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                   {/* Dùng features tạm thời nếu API không trả về mảng features */}
                   {dummyFeatures.map((f, i) => ( 
                      <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-charcoal/80">
                         <Check size={14} className="text-deep-rose mt-0.5 flex-shrink-0" />
                         <span>{f}</span>
                      </div>
                   ))}
                 </div>
              </div>
           </div>

           {/* Sticky Bottom Actions */}
           <div className="p-4 md:p-8 border-t border-gray-100 bg-white z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.02)] shrink-0">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
                 
                 {/* Quantity Selector */}
                 <div className="flex items-center justify-between bg-gray-50 rounded-xl px-2 py-1.5 sm:w-auto border border-transparent hover:border-rose-200 transition-colors">
                    <button 
                        onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                        className="w-10 h-10 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-white text-charcoal transition-all disabled:opacity-50"
                        disabled={quantity <= 0.5}
                    >
                       <Minus size={16} />
                    </button>
                    <span className="w-16 text-center font-bold text-charcoal text-sm md:text-base">{quantity}m</span>
                    <button 
                        onClick={() => setQuantity(quantity + 0.5)}
                        className="w-10 h-10 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-white text-charcoal transition-all"
                    >
                       <Plus size={16} />
                    </button>
                 </div>

                 {/* Add to Cart Button */}
                 <button 
                    onClick={handleAddToCart} 
                    className={`flex-1 py-3.5 md:py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs md:text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2
                        ${isAdding ? 'bg-green-600 text-white' : 'bg-charcoal text-white hover:bg-deep-rose'}
                    `}
                >
                    {isAdding ? <Check size={18} /> : <ShoppingBag size={18} />}
                    {isAdding ? 'Đã thêm' : 'Thêm vào giỏ'}
                 </button>
                 
                 {/* Wishlist Button */}
                 <button className="w-12 h-12 flex-shrink-0 border border-gray-200 rounded-xl flex items-center justify-center hover:border-rose-300 hover:bg-rose-50 hover:text-deep-rose text-gray-400 transition-all hidden sm:flex">
                    <Heart size={20} />
                 </button>
              </div>
           </div>
        </div>

        {/* Navigation Arrows - Floating on Desktop */}
        <button 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white text-charcoal rounded-full items-center justify-center shadow-2xl hover:bg-deep-rose hover:text-white transition-all hover:scale-110"
        >
           <ChevronLeft size={24} />
        </button>
        <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white text-charcoal rounded-full items-center justify-center shadow-2xl hover:bg-deep-rose hover:text-white transition-all hover:scale-110"
        >
           <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;