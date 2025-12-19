'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '@/constants'; // Nhớ check lại đường dẫn import cho đúng
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;
  
  // Tìm sản phẩm trong constants dựa trên slug
  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm này rồi mày ơi!</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col md:row gap-12">
          {/* Ảnh sản phẩm */}
          <div className="md:w-1/2">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full rounded-3xl shadow-2xl object-cover aspect-[3/4]" 
            />
          </div>
          
          {/* Thông tin */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">{product.name}</h1>
            <p className="text-3xl text-rose-600 font-bold mb-8">{product.price}</p>
            <div className="prose prose-lg text-gray-600 mb-10">
              <p>{product.description}</p>
            </div>
            
            <button className="w-full md:w-max bg-gray-900 text-white px-12 py-5 rounded-2xl font-bold hover:bg-rose-600 transition-all">
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
