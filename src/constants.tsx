import React from 'react';
import { Feature, ColorSwatch, Product, Category } from './types';
import { Feather, Wind, Sun, Droplets } from 'lucide-react';

export const CATEGORIES: Category[] = [
  { _id: 'cat_1', name: 'Áo Dài Truyền Thống', productCount: 12 },
  { _id: 'cat_2', name: 'Áo Dài Cách Tân', productCount: 8 },
  { _id: 'cat_3', name: 'Váy Thiết Kế', productCount: 15 },
  { _id: 'cat_4', name: 'Thời Trang Công Sở', productCount: 10 }
];

export const PRODUCTS: Product[] = [
  {
    _id: 1,
    slug: "ao-dai-to-tam-cung-dinh",
    name: "Áo Dài Tơ Tằm Cung Đình",
    category: "Áo Dài Truyền Thống",
    price: "2.450.000đ",
    image: "https://images.unsplash.com/photo-1548625361-98782012fd15?q=80&w=600&auto=format&fit=crop",
    tag: "Signature",
    description: "Thiết kế truyền thống thêu tay thủ công.",
    features: ["Lụa tơ tằm 100%", "Thêu tay tinh xảo"]
  },
  {
    _id: 2,
    slug: "vay-lua-oai-huong",
    name: "Váy Lụa Oải Hương",
    category: "Váy Thiết Kế",
    price: "1.280.000đ",
    image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop",
    tag: "New",
    description: "Sắc tím nhẹ nhàng, form dáng trẻ trung.",
    features: ["Vải lụa cao cấp", "Chống nhăn"]
  },
  {
    _id: 3,
    slug: "ao-dai-tu-than-thanh-lieu",
    name: "Áo Dài Tứ Thân Thanh Liễu",
    category: "Áo Dài Cách Tân",
    price: "1.850.000đ",
    image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=600&auto=format&fit=crop",
    tag: "Premium",
    description: "Cách điệu từ dáng áo xưa.",
    features: ["Vân chìm tinh tế", "Kháng khuẩn"]
  },
  {
    _id: 4,
    slug: "dam-satin-xanh-mint",
    name: "Đầm Satin Xanh Mint",
    category: "Váy Dự Tiệc",
    price: "1.550.000đ",
    image: "https://images.unsplash.com/photo-1621256277947-2c1363695286?q=80&w=600&auto=format&fit=crop",
    tag: "Cool",
    description: "Bóng mượt như ngọc trai.",
    features: ["Mát lạnh", "Tôn dáng"]
  }
];

export const FEATURES: Feature[] = [
  { id: 1, title: "Tôn Dáng", description: "Thiết kế chuẩn form.", icon: <Feather className="w-8 h-8 text-rose-400" /> },
  { id: 2, title: "Thoải Mái", description: "Chất liệu cao cấp.", icon: <Wind className="w-8 h-8 text-purple-400" /> },
  { id: 3, title: "Thủ Công", description: "Tỉ mỉ từng đường kim.", icon: <Droplets className="w-8 h-8 text-teal-400" /> },
  { id: 4, title: "Độc Bản", description: "Thiết kế riêng biệt.", icon: <Sun className="w-8 h-8 text-amber-400" /> }
];

export const COLORS: ColorSwatch[] = [
  { id: 1, name: "Hồng Phấn", hex: "#fce7f3" },
  { id: 2, name: "Tím Mơ", hex: "#f3e8ff" },
  { id: 3, name: "Xanh Mint", hex: "#ccfbf1" }
];
