import React from 'react';
import Hero from '@/components/Hero/Hero';
import Features from '@/components/Features/Features';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import ColorPalette from '@/components/ColorPalette/ColorPalette';
import { getProducts, getCategories } from '@/lib/api';
import Script from 'next/script';

// SEO: Generate Metadata Dynamic
export async function generateMetadata() {
  return {
    title: 'Muse Fabric - Thiên Đường Vải Lụa & Umi Pastel',
    description: 'Khám phá bộ sưu tập vải lụa tơ tằm, Umi, Tussi cao cấp với bảng màu Pastel ngọt ngào. Mua hàng dễ dàng qua Zalo.',
    alternates: {
      canonical: 'https://musefabric.vn',
    },
  };
}

export default async function Home() {
  // Data Fetching ngay trên Server (Performance tối đa)
  const products = await getProducts();
  const categories = await getCategories();

  // SEO: Structured Data (JSON-LD) cho Organization và Store
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Muse Fabric',
    image: 'https://images.unsplash.com/photo-1550614000-4b9519e0031c',
    description: 'Chuyên cung cấp vải lụa, umi, tussi cao cấp phong cách Soft Feminine.',
    telephone: '+84877003169',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Online Store',
      addressCountry: 'VN'
    },
    priceRange: '$$'
  };

  return (
    <>
      <Script
        id="json-ld-store"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Hero />
      <Features />
      {/* Truyền data đã fetch từ server xuống client component */}
      <ProductGrid products={products} categories={categories} />
      <ColorPalette />
    </>
  );
}
