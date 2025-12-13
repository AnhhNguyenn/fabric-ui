import React from 'react';
import { Product, Feature, ColorSwatch } from './types';
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

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Lụa Tơ Tằm Hồng Phấn",
    type: "Lụa",
    price: "450.000đ/m",
    image: "https://picsum.photos/id/325/400/500",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Umi Oải Hương Mơ Mộng",
    type: "Umi",
    price: "280.000đ/m",
    image: "https://picsum.photos/id/360/400/500",
    tag: "New"
  },
  {
    id: 3,
    name: "Tussi Be Sáng Thanh Lịch",
    type: "Tussi",
    price: "320.000đ/m",
    image: "https://picsum.photos/id/433/400/500",
    tag: "Premium"
  },
  {
    id: 4,
    name: "Lụa Satin Xanh Mint",
    type: "Lụa",
    price: "380.000đ/m",
    image: "https://picsum.photos/id/514/400/500",
    tag: "Cool"
  },
  {
    id: 5,
    name: "Umi Cát Hồng Đào",
    type: "Umi",
    price: "290.000đ/m",
    image: "https://picsum.photos/id/656/400/500",
    tag: "Soft"
  },
  {
    id: 6,
    name: "Tussi Vân Gỗ Kem",
    type: "Tussi",
    price: "350.000đ/m",
    image: "https://picsum.photos/id/824/400/500",
    tag: "Elegant"
  }
];

export const COLORS: ColorSwatch[] = [
  { id: 1, name: "Hồng Phấn", hex: "#fce7f3" }, // pink-100
  { id: 2, name: "Tím Mơ", hex: "#f3e8ff" }, // purple-100
  { id: 3, name: "Xanh Mint", hex: "#ccfbf1" }, // teal-100
  { id: 4, name: "Be Sáng", hex: "#fef3c7" }, // amber-100
  { id: 5, name: "Trắng Sữa", hex: "#fafafa" }, // neutral-50
  { id: 6, name: "Cam Đào", hex: "#ffedd5" }, // orange-100
];
