// src/constants.tsx
import React from 'react';
import { Feature, ColorSwatch, Product, Category } from './types';
import { Feather, Wind, Sun, Droplets } from 'lucide-react';

export const CATEGORIES: Category[] = [
  { _id: 'cat_1', name: 'Áo Dài Truyền Thống', productCount: 12, image: 'https://images.unsplash.com/photo-1594912759560-61f4bcaeec38?q=80&w=600&auto=format&fit=crop' },
  { _id: 'cat_2', name: 'Áo Dài Cách Tân', productCount: 8, image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop' },
  { _id: 'cat_3', name: 'Váy Thiết Kế', productCount: 15, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop' },
  { _id: 'cat_4', name: 'Thời Trang Công Sở', productCount: 10, image: 'https://images.unsplash.com/photo-1589463943621-030911765c92?q=80&w=600&auto=format&fit=crop' },
  { _id: 'cat_5', name: 'Váy Dự Tiệc', productCount: 6, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop' },
];

export const PRODUCTS: Product[] = [
  {
    _id: 1,
    name: "Áo Dài Tơ Tằm Cung Đình",
    type: "Áo Dài",
    category: "Áo Dài Truyền Thống",
    price: "2.450.000đ",
    image: "https://images.unsplash.com/photo-1548625361-98782012fd15?q=80&w=600&auto=format&fit=crop",
    tag: "Signature",
    description: "Thiết kế áo dài truyền thống trên nền lụa tơ tằm thượng hạng.",
    features: ["Lụa tơ tằm 100%", "Thêu tay thủ công", "Dáng áo chuẩn truyền thống"]
  },
  {
    _id: 2,
    name: "Váy Lụa Oải Hương Cách Tân",
    type: "Váy Thiết Kế",
    category: "Váy Thiết Kế",
    price: "1.280.000đ",
    image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop",
    tag: "Hot Trend",
    description: "Sự kết hợp hoàn hảo giữa nét hiện đại và chất liệu truyền thống.",
    features: ["Chất lụa mịn mát", "Form dáng trẻ trung", "Chống nhăn tốt"]
  },
  {
    _id: 3,
    name: "Áo Dài Tứ Thân Thanh Liễu",
    type: "Áo Dài",
    category: "Áo Dài Cách Tân",
    price: "1.850.000đ",
    image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=600&auto=format&fit=crop",
    tag: "Premium",
    description: "Lấy cảm hứng từ nét đẹp phụ nữ xưa, mẫu áo dài tứ thân được cách điệu.",
    features: ["Dệt vân chìm tinh tế", "Khổ áo rộng thoải mái", "Phong cách Minimalist"]
  },
  {
    _id: 4,
    name: "Đầm Satin Xanh Mint Dự Tiệc",
    type: "Váy Dự Tiệc",
    category: "Váy Dự Tiệc",
    price: "1.550.000đ",
    image: "https://images.unsplash.com/photo-1621256277947-2c1363695286?q=80&w=600&auto=format&fit=crop",
    tag: "Cool",
    description: "Đầm Satin cao cấp với độ bóng mượt mà như ngọc trai.",
    features: ["Bề mặt trơn mịn", "Cắt xẻ tôn dáng", "Mát lạnh khi chạm"]
  },
  {
    _id: 5,
    name: "Bộ Cách Tân Cát Hồng Đào",
    type: "Áo Dài Cách Tân",
    category: "Áo Dài Cách Tân",
    price: "950.000đ",
    image: "https://images.unsplash.com/photo-1616486029423-aaa478965c96?q=80&w=600&auto=format&fit=crop",
    tag: "Soft",
    description: "Set áo dài cách tân trẻ trung phối cùng chân váy xòe.",
    features: ["Thiết kế tiện lợi", "Độ dày vừa phải", "Che khuyết điểm tốt"]
  },
  {
    _id: 6,
    name: "Áo Blazer Tussi Kem Sữa",
    type: "Thời Trang Công Sở",
    category: "Thời Trang Công Sở",
    price: "1.350.000đ",
    image: "https://images.unsplash.com/photo-1589463943621-030911765c92?q=80&w=600&auto=format&fit=crop",
    tag: "Elegant",
    description: "Chiếc Blazer quyền lực trên chất liệu Tussi vân gỗ.",
    features: ["Họa tiết chìm 3D", "Sợi vải dai bền", "Form đứng sang trọng"]
  }
];

export const FEATURES: Feature[] = [
  { id: 1, title: "Tôn Dáng", description: "Thiết kế chuẩn form.", icon: <Feather className="w-8 h-8 text-rose-400" /> },
  { id: 2, title: "Thoải Mái", description: "Chất liệu cao cấp.", icon: <Wind className="w-8 h-8 text-purple-400" /> },
  { id: 3, title: "Thủ Công", description: "Tỉ mỉ từng đường kim.", icon: <Droplets className="w-8 h-8 text-teal-400" /> },
  { id: 4, title: "Độc Bản", description: "Mẫu thiết kế riêng biệt.", icon: <Sun className="w-8 h-8 text-amber-400" /> }
];

export const COLORS: ColorSwatch[] = [
  { id: 1, name: "Hồng Phấn", hex: "#fce7f3" },
  { id: 2, name: "Tím Mơ", hex: "#f3e8ff" },
  { id: 3, name: "Xanh Mint", hex: "#ccfbf1" },
  { id: 4, name: "Be Sáng", hex: "#fef3c7" },
  { id: 5, name: "Trắng Sữa", hex: "#fafafa" },
  { id: 6, name: "Cam Đào", hex: "#ffedd5" },
];
