
// src/data/categories.ts
import { Category } from '../types';

// === CƠ SỞ DỮ LIỆU DANH MỤC HARDCODE ===
// HƯỚNG DẪN: Để thêm, sửa, hoặc xóa danh mục, hãy chỉnh sửa trực tiếp mảng `allCategories` dưới đây.

export const allCategories: Category[] = [
  {
    _id: 'cat_001',
    name: 'Vải lụa',
    description: 'Các loại vải có nguồn gốc từ sợi tơ tằm mềm mại, bóng đẹp.'
  },
  {
    _id: 'cat_002',
    name: 'Vải cotton',
    description: 'Các loại vải làm từ sợi bông tự nhiên, thoáng mát, thấm hút tốt.'
  },
  {
    _id: 'cat_003',
    name: 'Vải tafta',
    description: 'Vải có độ cứng, đứng form, bề mặt bóng mờ, tạo cảm giác sang trọng.'
  },
  {
    _id: 'cat_004',
    name: 'Vải linen',
    description: 'Vải làm từ sợi cây lanh, có độ nhăn tự nhiên, mát mẻ và bền.'
  },
  {
    _id: 'cat_005',
    name: 'Vải voan',
    description: 'Vải mỏng, nhẹ, có độ trong suốt, thường dùng làm lớp ngoài cho váy hoặc áo.'
  }
];

// === CÁC HÀM TIỆN ÍCH ĐỂ MÔ PHỎNG API ===

export const getCategories = (): Promise<Category[]> => {
    console.log("[Hardcode Service] Fetching all categories.");
    return Promise.resolve(allCategories);
}
