
// src/types.ts

import React from 'react';

// --- API-Derived Types ---

// THÊM: Định nghĩa cho Open Graph (Dữ liệu chia sẻ social)
export interface OpenGraph {
  title: string;
  description: string;
  image: string; // URL ảnh
}

// CẬP NHẬT: Định nghĩa cho SEO
export interface Seo {
  metaTitle?: string; 
  metaDescription?: string; 
  title?: string; 
  description?: string; 
  keywords?: string; 
  slug?: string;
  canonicalUrl?: string;
  openGraph?: OpenGraph;
}

// CẬP NHẬT: Định nghĩa cho Category
export interface Category {
  _id: string; 
  name: string;
  description: string;
  seo?: Seo; 
  createdAt?: string; 
  updatedAt?: string; 
}

// CẬP NHẬT: Định nghĩa cho Product để khớp với dữ liệu hardcode
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number; 
  category: string | Category; 
  imageUrls: string[]; 
  seo?: Seo;
  // Sửa lỗi: Đổi 'tag' thành 'tags' và kiểu dữ liệu thành mảng chuỗi
  tags?: string[]; 
  // Sửa lỗi: Thêm thuộc tính 'stock'
  stock: number; 
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

// --- Cart Types (Cập nhật ProductId sang string) ---

export interface CartItem {
  product: Product;
  quantity: number;
}

// --- Frontend/Utility Types (Giữ nguyên) ---

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ColorSwatch {
  id: number;
  name: string;
  hex: string;
}
