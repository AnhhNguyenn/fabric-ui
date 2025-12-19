'use client';
import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../constants'; // Lấy dữ liệu cứng ở đây

const ProductGrid = () => {
  // Không dùng useState hay useEffect gọi API nữa
  // Dùng trực tiếp biến PRODUCTS từ file constants
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
              Thiết Kế Nổi Bật
            </h2>
            <div className="h-1 w-20 bg-rose-500 rounded-full"></div>
          </div>
          <p className="text-gray-500 max-w-md md:text-right">
            Khám phá những mẫu trang phục tinh tế, kết hợp giữa nghệ thuật truyền thống và xu hướng hiện đại.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
