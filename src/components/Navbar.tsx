'use client';
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-bold text-rose-600">
          FABRIC <span className="text-gray-900">SHOP</span>
        </Link>

        {/* Menu chính */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-medium hover:text-rose-600 transition-colors">Trang Chủ</Link>
          <Link href="/products" className="font-medium hover:text-rose-600 transition-colors">Sản Phẩm</Link>
          <Link href="/about" className="font-medium hover:text-rose-600 transition-colors">Về Chúng Tôi</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative p-2 hover:bg-rose-50 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
