"use client";
import React, { useState, useEffect } from 'react';
// Đã loại bỏ import { PRODUCTS } từ '../constants'
import { ShoppingBag, Search, Menu, X, MessageCircle, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use Global Cart State
  const { 
    items, 
    isOpen: isCartOpen, 
    openCart, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    total, 
    checkoutZalo 
  } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Đóng menu sau khi scroll
    }
  };

  const handleZaloCheckout = () => {
    checkoutZalo(); 
    closeCart();
  };

  return (
    <>
      <nav className={`fixed w-full z-40 transition-all duration-500 border-b ${scrolled ? 'bg-lavender-blush/90 backdrop-blur-xl border-rose-200 py-3 shadow-sm' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 grid grid-cols-3 items-center">
          {/* Left Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollToSection('products')} className="text-deep-rose hover:text-rose-accent font-medium text-xs uppercase tracking-[0.15em] transition-colors relative group">
              Sản phẩm
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-accent transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('features')} className="text-deep-rose hover:text-rose-accent font-medium text-xs uppercase tracking-[0.15em] transition-colors relative group">
              Tính năng
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-accent transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('palette')} className="text-deep-rose hover:text-rose-accent font-medium text-xs uppercase tracking-[0.15em] transition-colors relative group">
              Bảng màu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-accent transition-all group-hover:w-full"></span>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-deep-rose p-2 -ml-2 hover:bg-rose-50 rounded-full transition-colors"
            >
                <Menu size={24} />
            </button>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center">
            <button className="text-center group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <h1 className="font-serif text-4xl font-bold text-deep-rose tracking-tighter group-hover:opacity-80 transition-opacity">RiCa</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-rose-accent mt-1 font-semibold">Fabric & Silk</p>
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex justify-end items-center gap-3 md:gap-5">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-deep-rose hover:text-rose-accent transition-colors hidden sm:block hover:bg-white/50 rounded-full"
            >
                <Search className="w-5 h-5" />
            </button>
            
            <button 
                onClick={openCart}
                className="relative p-2 text-deep-rose hover:text-rose-accent transition-colors hover:bg-white/50 rounded-full group"
            >
              <ShoppingBag className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-deep-rose text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- UI OVERLAYS --- */}

      {/* 0. Mobile Menu Drawer */}
      <div 
         className={`fixed inset-0 z-[200] bg-lavender-blush transition-transform duration-500 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
          <div className="flex justify-between items-center p-6 border-b border-rose-200/50">
             <h2 className="font-serif text-3xl text-deep-rose italic">Menu</h2>
             <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-deep-rose shadow-sm hover:rotate-90 transition-transform">
                <X size={24} />
             </button>
          </div>
          <div className="flex-1 flex flex-col p-8 gap-6 overflow-y-auto">
             <div className="space-y-6">
                 <button onClick={() => scrollToSection('products')} className="w-full text-left flex items-center justify-between group">
                    <span className="text-3xl font-serif text-charcoal group-hover:text-deep-rose transition-colors">Sản phẩm</span>
                    <ArrowRight size={20} className="text-rose-300 group-hover:text-deep-rose -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                 </button>
                 <button onClick={() => scrollToSection('features')} className="w-full text-left flex items-center justify-between group">
                    <span className="text-3xl font-serif text-charcoal group-hover:text-deep-rose transition-colors">Tính năng</span>
                     <ArrowRight size={20} className="text-rose-300 group-hover:text-deep-rose -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                 </button>
                 <button onClick={() => scrollToSection('palette')} className="w-full text-left flex items-center justify-between group">
                    <span className="text-3xl font-serif text-charcoal group-hover:text-deep-rose transition-colors">Bảng màu</span>
                     <ArrowRight size={20} className="text-rose-300 group-hover:text-deep-rose -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                 </button>
             </div>
             
             <div className="mt-auto space-y-4 pt-10 border-t border-rose-200/50">
                <button onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }} className="w-full py-4 bg-white border border-rose-100 rounded-2xl text-deep-rose font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors">
                    <Search size={18} /> Tìm kiếm
                </button>
             </div>
          </div>
      </div>

      {/* 1. Search Overlay */}
      <div className={`fixed inset-0 z-[160] bg-lavender-blush/95 backdrop-blur-xl transition-all duration-500 flex flex-col items-center pt-32 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-deep-rose hover:bg-white rounded-full transition-all"
         >
            <X size={32} />
         </button>
         <div className="w-full max-w-3xl px-6 animate-float">
            <h3 className="text-center font-serif text-3xl text-deep-rose mb-8 italic">Tìm kiếm cảm hứng của bạn...</h3>
            <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-rose-300 w-8 h-8 group-focus-within:text-deep-rose transition-colors" />
                <input 
                    type="text" 
                    placeholder="Lụa tơ tằm, Satin, ..." 
                    className="w-full bg-transparent border-b-2 border-rose-200 py-4 pl-12 pr-4 text-3xl font-serif text-charcoal focus:outline-none focus:border-deep-rose placeholder:text-rose-200 transition-colors"
                    autoFocus={isSearchOpen}
                />
            </div>
            <div className="mt-10 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-rose-accent mb-6">Xu hướng tìm kiếm</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {['Lụa tơ tằm', 'Vải Umi', 'Tussi Organic', 'Satin Premium', 'Áo dài'].map(tag => (
                        <button key={tag} className="px-6 py-2.5 rounded-full bg-white border border-rose-100 text-deep-rose text-sm hover:bg-deep-rose hover:text-white hover:border-deep-rose transition-all shadow-sm">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
         </div>
      </div>

      {/* 2. Cart Drawer (Right Side) - HIGH Z-INDEX to overlay Modal */}
      <div 
        className={`fixed inset-0 z-[150] bg-charcoal/40 backdrop-blur-md transition-opacity duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white sm:rounded-l-[3rem] z-[151] shadow-2xl shadow-rose-900/20 transform transition-transform duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-8 py-8 md:pt-10 flex items-center justify-between bg-white/50 backdrop-blur-xl z-10 shrink-0">
            <div>
              <h2 className="font-serif text-3xl text-charcoal">Giỏ hàng</h2>
              <p className="text-sm text-charcoal/50 mt-1 font-medium">{items.length} món • Miễn phí vận chuyển</p>
            </div>
            <button 
                onClick={closeCart} 
                className="w-10 h-10 rounded-full bg-gray-50 hover:bg-rose-50 flex items-center justify-center text-charcoal hover:text-deep-rose transition-all transform hover:rotate-90"
            >
                <X size={20} />
            </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-charcoal/40">
                <ShoppingCart size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-serif mb-2">Giỏ hàng trống</p>
                <p className="text-xs uppercase tracking-widest">Hãy chọn những thước vải đẹp nhất nhé</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product._id} className="flex gap-4 p-3 rounded-3xl hover:bg-lavender-blush/30 transition-colors group"> 
                    <div className="w-24 aspect-[3/4] overflow-hidden rounded-2xl shadow-sm shrink-0 relative bg-gray-100">
                      <img src={item.product.imageUrls?.[0] || 'placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-serif text-lg text-charcoal leading-tight line-clamp-1">{item.product.name}</h3>
                            </div>
                            <p className="text-xs font-bold uppercase tracking-wider text-charcoal/40 mb-3">Số lượng: {item.quantity}m</p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                                    <button 
                                      onClick={() => updateQuantity(item.product._id, -0.5)} 
                                      className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm text-charcoal transition-all"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="w-10 text-center text-sm font-bold text-charcoal">{item.quantity}</span>
                                    <button 
                                      onClick={() => updateQuantity(item.product._id, 0.5)} 
                                      className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm text-charcoal transition-all"
                                    >
                                      <Plus size={12} />
                                    </button>
                                </div>
                                <button 
                                  onClick={() => removeItem(item.product._id)} 
                                  className="text-xs text-rose-400 hover:text-deep-rose underline decoration-rose-200 underline-offset-2"
                                >
                                  Xóa
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                             <p className="font-serif font-bold text-lg text-deep-rose">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price * item.quantity)}
                             </p>
                        </div>
                    </div>
                </div>
              ))
            )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 bg-white border-t border-dashed border-gray-100 z-20 shrink-0">
              <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                      <span className="text-charcoal/60">Tạm tính</span>
                      <span className="font-medium text-charcoal">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                      </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                      <span className="text-charcoal/60">Vận chuyển</span>
                      <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-0.5 rounded">Miễn phí</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-lg font-serif text-charcoal font-bold">Tổng cộng</span>
                      <span className="text-2xl font-serif text-deep-rose font-bold">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                      </span>
                  </div>
              </div>
              
              <button 
                  onClick={handleZaloCheckout}
                  className="w-full py-4 rounded-2xl bg-charcoal text-white font-bold tracking-widest uppercase hover:bg-deep-rose transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                  <MessageCircle size={20} />
                  Thanh toán qua Zalo
              </button>
              <p className="text-center text-[10px] text-charcoal/40 mt-4 font-medium uppercase tracking-widest">
                  Cam kết chất lượng • Đổi trả trong vòng 3 ngày đầu tiên khi mua sản phẩm
              </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;