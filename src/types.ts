import { ReactNode } from 'react';

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
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
  image?: string;
  productCount?: number;
}

export interface Product {
  _id: string | number;
  slug: string; // Thêm slug bắt buộc để làm URL đẹp
  name: string;
  price: string | number; 
  description?: string;
  image?: string;
  images?: string[];
  category?: string;
  tag?: string;
  features?: string[];
}
