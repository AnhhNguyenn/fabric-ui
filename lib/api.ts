
import { Product, SiteConfig } from '../types';

// ========================================================================
// MOCK DATA - Dữ liệu giả cho mục đích phát triển giao diện
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
// API FUNCTIONS - Các hàm để thao tác với dữ liệu
// ========================================================================

/**
 * Lấy tất cả sản phẩm (từ dữ liệu giả)
 */
export async function getAllProducts(): Promise<Product[]> {
  console.log("Fetching all mock products...");
  await new Promise(resolve => setTimeout(resolve, 50)); 
  return mockProducts;
}

/**
 * Lấy một sản phẩm theo slug (từ dữ liệu giả)
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

/**
 * **MỚI: Tạo một sản phẩm mới (trong dữ liệu giả)**
 * @param productData - Dữ liệu cho sản phẩm mới, không bao gồm _id và slug
 */
export async function createProduct(productData: Omit<Product, '_id' | 'slug'>): Promise<Product> {
    console.log("Creating a new mock product...");
    await new Promise(resolve => setTimeout(resolve, 100));

    // Helper để tạo slug từ tên sản phẩm
    const generateSlug = (name: string) => 
      name.toLowerCase()
          .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
          .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
          .replace(/ì|í|ị|ỉ|ĩ/g, "i")
          .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
          .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
          .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
          .replace(/đ/g, "d")
          .replace(/\s+/g, '-') // thay thế khoảng trắng bằng gạch nối
          .replace(/[^a-z0-9-]/g, ''); // loại bỏ các ký tự không hợp lệ

    const newProduct: Product = {
        _id: (mockProducts.length + 1).toString(), // Tạo ID mới đơn giản
        slug: generateSlug(productData.name), // Tạo slug từ tên
        ...productData
    };

    mockProducts.push(newProduct);
    console.log("New product created:", newProduct);
    return newProduct;
}
