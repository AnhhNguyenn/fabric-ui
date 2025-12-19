// src/types.ts

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: any;
}

export interface ColorSwatch {
  id: number;
  name: string;
  hex: string;
}

export interface Category {
  _id: string | number;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  productCount?: number;
}

export interface Product {
  _id: string | number;
  name: string;
  // Quan trọng: Chấp nhận cả số (cũ) và chuỗi (mới) để không vỡ giao diện
  price: number | string; 
  description?: string;
  images?: string[];
  image?: string;
  category?: string | Category; 
  type?: string;
  tag?: string;
  features?: string[];
  createdAt?: string;
}
