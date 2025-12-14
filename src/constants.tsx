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
    image: "https://images.unsplash.com/photo-1548625361-98782012fd15?q=80&w=600&auto=format&fit=crop",
    tag: "Best Seller",
    description: "Dòng lụa tơ tằm thượng hạng với sắc hồng phấn ngọt ngào. Bề mặt vải óng ả tự nhiên, độ rủ hoàn hảo cho các thiết kế áo dài, đầm dạ hội.",
    features: ["100% Tơ tằm tự nhiên", "Khổ vải 1.5m", "Không tích điện", "Giữ ấm mùa đông, mát mùa hè"]
  },
  {
    id: 2,
    name: "Umi Oải Hương Mơ Mộng",
    type: "Umi",
    price: "280.000đ/m",
    image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop",
    tag: "New",
    description: "Chất liệu Umi co giãn 4 chiều mang lại sự thoải mái tối đa. Màu tím oải hương nhẹ nhàng, phù hợp cho các thiết kế công sở hiện đại.",
    features: ["Co giãn 4 chiều", "Không nhăn nhàu", "Độ bền màu cao", "Thấm hút mồ hôi tốt"]
  },
  {
    id: 3,
    name: "Tussi Be Sáng Thanh Lịch",
    type: "Tussi",
    price: "320.000đ/m",
    image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=600&auto=format&fit=crop",
    tag: "Premium",
    description: "Tussi dệt vân chìm tinh tế, tạo độ xốp nhẹ và sang trọng. Màu be sáng tôn da, dễ dàng phối hợp với nhiều kiểu dáng trang phục.",
    features: ["Vân dệt độc đáo", "Form vải đứng", "Kháng khuẩn tự nhiên", "Thân thiện môi trường"]
  },
  {
    id: 4,
    name: "Lụa Satin Xanh Mint",
    type: "Lụa",
    price: "380.000đ/m",
    image: "https://images.unsplash.com/photo-1621256277947-2c1363695286?q=80&w=600&auto=format&fit=crop",
    tag: "Cool",
    description: "Satin cao cấp với độ bóng mượt mà như ngọc trai. Màu xanh mint tươi mát mang lại cảm giác thư thái, trẻ trung.",
    features: ["Bề mặt trơn mịn", "Độ bóng sang trọng", "Mát lạnh khi chạm", "Hạn chế bám bụi"]
  },
  {
    id: 5,
    name: "Umi Cát Hồng Đào",
    type: "Umi",
    price: "290.000đ/m",
    image: "https://images.unsplash.com/photo-1616486029423-aaa478965c96?q=80&w=600&auto=format&fit=crop",
    tag: "Soft",
    description: "Umi mặt cát độc đáo, tạo hiệu ứng thị giác thú vị. Màu hồng đào nữ tính, là lựa chọn tuyệt vời cho những chiếc váy xòe bồng bềnh.",
    features: ["Mặt vải cát mịn", "Độ dày vừa phải", "Che khuyết điểm tốt", "Dễ giặt ủi"]
  },
  {
    id: 6,
    name: "Tussi Vân Gỗ Kem",
    type: "Tussi",
    price: "350.000đ/m",
    image: "https://images.unsplash.com/photo-1589463943621-030911765c92?q=80&w=600&auto=format&fit=crop",
    tag: "Elegant",
    description: "Họa tiết vân gỗ chìm tạo chiều sâu cho trang phục. Màu kem nền nã, mang đậm phong cách Minimalist.",
    features: ["Họa tiết chìm 3D", "Sợi vải dai bền", "Thoáng khí tối đa", "Phù hợp may Vest/Blazer"]
  }
];

export const COLORS: ColorSwatch[] = [
  { id: 1, name: "Hồng Phấn", hex: "#fce7f3" },
  { id: 2, name: "Tím Mơ", hex: "#f3e8ff" },
  { id: 3, name: "Xanh Mint", hex: "#ccfbf1" },
  { id: 4, name: "Be Sáng", hex: "#fef3c7" },
  { id: 5, name: "Trắng Sữa", hex: "#fafafa" },
  { id: 6, name: "Cam Đào", hex: "#ffedd5" },
];