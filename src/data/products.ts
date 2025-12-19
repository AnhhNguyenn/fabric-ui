
// src/data/products.ts
import { Product } from '../types';

// === CƠ SỞ DỮ LIỆU SẢN PHẨM HARDCODE ===
// CÁC URL ẢNH ĐÃ ĐƯỢC THAY THẾ BẰNG PLACEHOLDER ĐỂ LOẠI BỎ LỖI 404.

export const allProducts: Product[] = [
  {
    _id: 'prod_001',
    name: 'Vải Lụa Satin Cao Cấp',
    description: 'Chất liệu lụa satin mềm mại, óng ả, thích hợp may áo dài, váy dạ hội. Bề mặt vải mịn, không nhăn và có độ rũ tự nhiên.',
    price: 250000,
    category: 'Vải lụa',
    tags: ['satin', 'cao cấp', 'áo dài'],
    imageUrls: [
        'https://placehold.co/800x800/EAD9E5/472E4D?text=Lụa+Satin',
        'https://placehold.co/800x800/D6C4D2/472E4D?text=Satin+2'
    ],
    stock: 100, // (mét)
  },
  {
    _id: 'prod_002',
    name: 'Vải Cotton In Hoa Nhí',
    description: 'Vải cotton 100% thoáng mát, thấm hút mồ hôi tốt. Họa tiết hoa nhí vintage, phù hợp may váy, áo sơ mi hoặc đồ cho bé.',
    price: 150000,
    category: 'Vải cotton',
    tags: ['cotton', 'hoa nhí', 'vintage'],
    imageUrls: [
        'https://placehold.co/800x800/F4E8D8/6B5B4B?text=Cotton+Hoa+Nhí'
    ],
    stock: 250,
  },
  {
    _id: 'prod_003',
    name: 'Vải Tafta Ánh Kim',
    description: 'Dòng vải tafta có độ cứng vừa phải, đứng form, bề mặt có hiệu ứng ánh kim sang trọng. Thích hợp cho các thiết kế đầm công chúa, váy cưới.',
    price: 320000,
    category: 'Vải tafta',
    tags: ['tafta', 'ánh kim', 'dạ hội'],
    imageUrls: [
        'https://placehold.co/800x800/D4C4B8/5C4B40?text=Tafta+Ánh+Kim'
    ],
    stock: 80,
  },
   {
    _id: 'prod_004',
    name: 'Vải Linen Bột',
    description: 'Chất vải linen tự nhiên, đã qua xử lý làm mềm. Vải có độ nhăn đặc trưng, càng mặc càng mềm mại. Phù hợp cho quần áo mùa hè.',
    price: 180000,
    category: 'Vải linen',
    tags: ['linen', 'tự nhiên', 'mùa hè'],
    imageUrls: [
        'https://placehold.co/800x800/E1DCD3/5E564D?text=Linen+Bột'
    ],
    stock: 150,
  }
];

// === CÁC HÀM TIỆN ÍCH ĐỂ MÔ PHỎNG API ===

export const getProducts = (): Promise<Product[]> => {
    // console.log("[Hardcode Service] Fetching all products.");
    return Promise.resolve(allProducts);
}

export const getProductById = (id: string): Promise<Product | undefined> => {
    // console.log(`[Hardcode Service] Fetching product with id: ${id}`);
    const product = allProducts.find(p => p._id === id);
    return Promise.resolve(product);
}
