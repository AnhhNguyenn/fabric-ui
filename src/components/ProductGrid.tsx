'use client';
import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../constants';

const ProductGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">Thiết Kế Nổi Bật</h2>
          <div className="h-1 w-20 bg-rose-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
