
import { Product, SiteConfig } from '../types';

// ========================================================================
// MOCK DATA - Dữ liệu giả cho mục đích phát triển giao diện
// Thay thế phần này bằng kết nối backend thực tế của bạn (ví dụ: Sanity, Strapi, v.v.)
// ========================================================================

const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Váy Lụa Hồng Pastel',
    slug: 'vay-lua-hong-pastel',
    price: 1250000,
    description: 'Chiếc váy lụa mềm mại với tông màu hồng pastel ngọt ngào, tôn lên vẻ đẹp dịu dàng và nữ tính. Thiết kế cổ điển, phù hợp cho những buổi dạo phố hoặc tiệc trà chiều.',
    imageUrls: [
      '/images/products/dress-pink-1.jpg',
      '/images/products/dress-pink-2.jpg',
      '/images/products/dress-pink-3.jpg'
    ],
    colors: [
      { name: 'Hồng Pastel', hex: '#FFD1DC' },
      { name: 'Trắng Ngà', hex: '#F5F5DC' }
    ],
    tags: ['váy', 'lụa', 'hồng', 'pastel']
  },
  {
    _id: '2',
    name: 'Áo Sơ Mi Lụa Tay Bồng',
    slug: 'ao-so-mi-lua-tay-bong',
    price: 890000,
    description: 'Áo sơ mi lụa cao cấp với thiết kế tay bồng tiểu thư. Chất liệu lụa thoáng mát, mang lại cảm giác thoải mái và sang trọng. Dễ dàng phối với chân váy hoặc quần âu.',
    imageUrls: [
      '/images/products/blouse-puff-1.jpg',
      '/images/products/blouse-puff-2.jpg'
    ],
    colors: [
      { name: 'Tím Lavender', hex: '#E6E6FA' },
      { name: 'Be Sữa', hex: '#FFF8DC' }
    ],
    tags: ['áo', 'sơ mi', 'lụa', 'tím']
  },
  {
    _id: '3',
    name: 'Chân Váy Xếp Ly Dáng Dài',
    slug: 'chan-vay-xep-ly-dang-dai',
    price: 950000,
    description: 'Chân váy xếp ly dáng dài thướt tha, tạo nên sự uyển chuyển trong mỗi bước đi. Gam màu trung tính dễ phối đồ, là một item không thể thiếu trong tủ đồ của các quý cô thanh lịch.',
    imageUrls: [
      '/images/products/skirt-pleated-1.jpg',
      '/images/products/skirt-pleated-2.jpg'
    ],
    colors: [
      { name: 'Xanh Bạc Hà', hex: '#BDFCC9' },
      { name: 'Kem', hex: '#FFFDD0' }
    ],
    tags: ['chân váy', 'xếp ly', 'dáng dài']
  },
  {
    _id: '4',
    name: 'Đầm Maxi Hoa Nhí',
    slug: 'dam-maxi-hoa-nhi',
    price: 1450000,
    description: 'Đầm maxi với họa tiết hoa nhí vintage, mang lại vẻ đẹp lãng mạn và bay bổng. Chất vải voan nhẹ, lý tưởng cho những chuyến du lịch hoặc dạo biển.',
    imageUrls: [
      '/images/products/dress-maxi-1.jpg',
      '/images/products/dress-maxi-2.jpg'
    ],
    colors: [
        { name: 'Nền Xanh Hoa Nhí', hex: '#A0E7E5' },
        { name: 'Nền Trắng Hoa Nhí', hex: '#FFFFFF' }
    ],
    tags: ['đầm', 'maxi', 'hoa nhí']
  }
];

const mockSiteConfig: SiteConfig = {
  title: 'Muse Fabric',
  description: 'Vẻ đẹp tinh tế từ lụa.',
  url: 'https://musefabric.com'
};

// ========================================================================
// API FUNCTIONS - Các hàm để lấy dữ liệu
// ========================================================================

/**
 * Lấy tất cả sản phẩm (từ dữ liệu giả)
 */
export async function getAllProducts(): Promise<Product[]> {
  console.log("Fetching all mock products...");
  // Giả lập độ trễ mạng
  await new Promise(resolve => setTimeout(resolve, 50)); 
  return mockProducts;
}

/**
 * Lấy một sản phẩm theo slug (từ dữ liệu giả)
 * @param slug - Slug của sản phẩm
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  console.log(`Fetching mock product with slug: ${slug}...`);
  await new Promise(resolve => setTimeout(resolve, 50));
  const product = mockProducts.find(p => p.slug === slug) || null;
  return product;
}

/**
 * Lấy cấu hình trang web (từ dữ liệu giả)
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  console.log("Fetching mock site config...");
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockSiteConfig;
}
