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

// Định nghĩa Feature (Tính năng nổi bật)
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: any;
}

// Định nghĩa Color (Bảng màu)
export interface ColorSwatch {
  id: number;
  name: string;
  hex: string;
}

// Định nghĩa Category (Danh mục)
export interface Category {
  _id: string | number; // ID có thể là số hoặc chuỗi (vd: 'cat_1')
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  productCount?: number; // Số lượng sản phẩm (để hiển thị cho đẹp)
}

// Định nghĩa Product (Sản phẩm)
export interface Product {
  _id: string | number;
  name: string;
  price: string | number; // Quan trọng: Cho phép nhập giá dạng chuỗi "2.000.000đ"
  description?: string;
  images?: string[];      // Mảng ảnh (nếu có nhiều ảnh)
  image?: string;         // Ảnh đại diện chính (dùng cho hardcode)
  category?: string;      // Tên danh mục (lưu trực tiếp tên cho dễ hiển thị)
  type?: string;          // Loại sản phẩm (Áo dài, Váy...)
  tag?: string;           // Nhãn (Hot, New, Sale...)
  features?: string[];    // Các đặc điểm (Vải mát, Co giãn...)
  createdAt?: string;
}
