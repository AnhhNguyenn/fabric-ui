// // src/types.ts

// import React from 'react';

// // --- API-Derived Types ---

// // THÊM: Định nghĩa cho Open Graph (Dữ liệu chia sẻ social)
// export interface OpenGraph {
//   title: string;
//   description: string;
//   image: string; // URL ảnh
// }

// // CẬP NHẬT: Định nghĩa cho SEO
// export interface Seo {
//   // Các trường cũ (cần đổi tên/bổ sung để khớp với code page.tsx)
//   metaTitle?: string; // Tên đã được sử dụng trong page.tsx
//   metaDescription?: string; // Tên đã được sử dụng trong page.tsx
//   title?: string; // Có thể giữ lại nếu API trả về (backup cho metaTitle)
//   description?: string; // Có thể giữ lại nếu API trả về (backup cho metaDescription)
//   keywords?: string; // Đã có
  
//   // Các trường mới được sử dụng trong page.tsx
//   slug?: string;
//   canonicalUrl?: string;
  
//   // Trường Open Graph
//   openGraph?: OpenGraph;
// }

// // CẬP NHẬT: Định nghĩa cho Category
// // Lỗi chính là thiếu trường 'seo' trong Category
// export interface Category {
//   _id: string; 
//   name: string;
//   description: string;
//   // Bổ sung trường SEO
//   seo?: Seo; 
//   createdAt?: string; // Nên thêm nếu có
//   updatedAt?: string; // Nên thêm nếu có
// }

// export interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number; 
//   category: string | Category; 
//   imageUrls: string[]; 
//   seo?: Seo; // Trường này đã có
//   tag?: string; 
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface User {
//   _id: string;
//   name: string;
//   email: string;
// }

// // --- Cart Types (Cập nhật ProductId sang string) ---

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

// // --- Frontend/Utility Types (Giữ nguyên) ---

// export interface Feature {
//   id: number;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
// }

// export interface ColorSwatch {
//   id: number;
//   name: string;
//   hex: string;
// } 

// src/types.ts
export interface Category {
  _id: string | number; // Chấp nhận cả ID số và chuỗi
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  productCount?: number;
}

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

export interface Product {
  _id: string | number;
  name: string;
  price: number | string; // Chấp nhận giá dạng chuỗi hiển thị
  description?: string;
  images?: string[];
  image?: string; // Dùng cho hardcode
  category?: Category | string; // Chấp nhận tên category
  type?: string; // Dùng cho hardcode
  tag?: string;
  features?: string[];
  createdAt?: string;
}
