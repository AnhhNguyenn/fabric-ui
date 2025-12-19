
// src/data/products.ts
import { Product } from '../types';

// === CƠ SỞ DỮ LIỆU SẢN PHẨM HARDCODE ===
// HƯỚNG DẪN: Để thêm, sửa, hoặc xóa sản phẩm, hãy chỉnh sửa trực tiếp mảng `allProducts` dưới đây.
// - ID: Phải là duy nhất cho mỗi sản phẩm.
// - Image URLs: Đường dẫn phải bắt đầu bằng '/images/products/' và trỏ đến tệp trong thư mục `public/images/products`.

export const allProducts: Product[] = [
  {
    _id: 'prod_001',
    name: 'Vải Lụa Satin Cao Cấp',
    description: 'Chất liệu lụa satin mềm mại, óng ả, thích hợp may áo dài, váy dạ hội. Bề mặt vải mịn, không nhăn và có độ rũ tự nhiên.',
    price: 250000,
    category: 'Vải lụa',
    tags: ['satin', 'cao cấp', 'áo dài'],
    imageUrls: [
        '/images/products/lua-satin-01.jpg',
        '/images/products/lua-satin-02.jpg'
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
        '/images/products/cotton-hoanhi-01.jpg'
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
        '/images/products/tafta-anhkim-01.jpg'
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
        '/images/products/linen-bot-01.jpg',
    ],
    stock: 150,
  }
];

// === CÁC HÀM TIỆN ÍCH ĐỂ MÔ PHỎNG API ===

export const getProducts = (): Promise<Product[]> => {
    console.log("[Hardcode Service] Fetching all products.");
    return Promise.resolve(allProducts);
}

export const getProductById = (id: string): Promise<Product | undefined> => {
    console.log(`[Hardcode Service] Fetching product with id: ${id}`);
    const product = allProducts.find(p => p._id === id);
    return Promise.resolve(product);
}

export const createProduct = (data: Omit<Product, '_id'>): Promise<Product> => {
  console.log("[Hardcode Service] Simulating product creation. No changes will be saved to the file.");
  const newProduct: Product = {
    _id: `prod_${Date.now()}`,
    ...data,
  };
  return Promise.resolve(newProduct);
};

export const updateProduct = (id: string, data: Partial<Product>): Promise<Product> => {
    console.log(`[Hardcode Service] Simulating product update for id: ${id}. No changes will be saved to the file.`);
    const existingProduct = allProducts.find(p => p._id === id);
    if (!existingProduct) {
        return Promise.reject(new Error("Product not found"));
    }
    const updatedProduct = { ...existingProduct, ...data };
    return Promise.resolve(updatedProduct);
};

export const deleteProduct = (id: string): Promise<{ message: string }> => {
    console.log(`[Hardcode Service] Simulating product deletion for id: ${id}. No changes will be saved to the file.`);
    const exists = allProducts.some(p => p._id === id);
    if (!exists) {
        return Promise.reject(new Error("Product not found"));
    }
    return Promise.resolve({ message: "Product deletion simulated successfully" });
};
