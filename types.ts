
// Định nghĩa cấu trúc cho một sản phẩm
export interface Product {
  id: number;
  name: string;
  type: 'Lụa' | 'Umi' | 'Tussi';
  price: string;
  image: string;
  tag: string;
  description: string;
  features: string[];
}

// Định nghĩa cấu trúc cho một tính năng nổi bật
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Định nghĩa cấu trúc cho một màu trong bảng màu
export interface ColorSwatch {
  id: number;
  name: string;
  hex: string;
}
