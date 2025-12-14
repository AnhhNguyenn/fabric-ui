// src/types.ts

import React from 'react';

// --- API-Derived Types ---

export interface Seo {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface Category {
  _id: string; 
  name: string;
  description: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number; 
  category: string | Category; 
  imageUrls: string[]; 
  seo?: Seo; // <<<< FIX: Đã thêm trường SEO bị thiếu
  tag?: string; 
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