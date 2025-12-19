'use client';
import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.tag && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-rose-600 shadow-sm">
            {product.tag}
          </div>
        )}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white p-3 rounded-full hover:bg-rose-500 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          {/* SỬA LINK: Dùng slug để URL đẹp */}
          <Link href={`/products/${product.slug}`} className="bg-white p-3 rounded-full hover:bg-rose-500 hover:text-white transition-colors">
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="p-5">
        <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{product.category}</div>
        <h3 className="font-serif font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
        <span className="text-rose-600 font-bold text-lg">{product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
