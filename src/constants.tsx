// src/constants.tsx
import React from 'react';
import { Feature, ColorSwatch } from './types'; // FIX: Đã loại bỏ 'Product'
import { Feather, Wind, Sun, Droplets } from 'lucide-react';

export const FEATURES: Feature[] = [
  {
    id: 1,
    title: "Mềm Mại",
    description: "Cảm giác êm ái, nâng niu làn da nhạy cảm nhất.",
    icon: <Feather className="w-8 h-8 text-rose-400" />
  },
  {
    id: 2,
    title: "Nhẹ Nhàng",
    description: "Trọng lượng siêu nhẹ, bay bổng trong từng chuyển động.",
    icon: <Wind className="w-8 h-8 text-purple-400" />
  },
  {
    id: 3,
    title: "Thoáng Khí",
    description: "Thấm hút tốt, giữ cho cơ thể luôn khô thoáng.",
    icon: <Droplets className="w-8 h-8 text-teal-400" />
  },
  {
    id: 4,
    title: "Mát Lạnh",
    description: "Chạm vào là mát, lý tưởng cho khí hậu nhiệt đới.",
    icon: <Sun className="w-8 h-8 text-amber-400" />
  }
];

// SỬA: Loại bỏ mảng PRODUCTS mẫu để lấy data từ API
export const PRODUCTS: any[] = []; 

export const COLORS: ColorSwatch[] = [
  { id: 1, name: "Hồng Phấn", hex: "#fce7f3" },
  { id: 2, name: "Tím Mơ", hex: "#f3e8ff" },
  { id: 3, name: "Xanh Mint", hex: "#ccfbf1" },
  { id: 4, name: "Be Sáng", hex: "#fef3c7" },
  { id: 5, name: "Trắng Sữa", hex: "#fafafa" },
  { id: 6, name: "Cam Đào", hex: "#ffedd5" },
];