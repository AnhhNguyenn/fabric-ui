
import { Product, Category } from '../types';

// Định nghĩa kiểu dữ liệu thô trả về từ API của bạn
interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: string; // ID của category
}

interface ApiCategory {
  _id: string;
  name: string;
  description: string;
}

const API_URL = 'https://api-server-plum.vercel.app';
const BASE_URL = 'https://your-production-domain.com'; // Sẽ cần thay thế bằng domain thật của bạn

// HÀM MAPPER: Chuyển đổi dữ liệu từ API sang cấu trúc SEO-rich của ứng dụng
const mapApiProductToAppProduct = (apiProduct: ApiProduct, allCategories: ApiCategory[]): Product => {
  const category = allCategories.find(c => c._id === apiProduct.category);
  const slug = apiProduct.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  return {
    ...apiProduct,
    category: { 
      _id: category?._id || '',
      name: category?.name || 'Uncategorized'
    },
    seo: {
      metaTitle: `${apiProduct.name} - Mua ngay kẻo lỡ`,
      metaDescription: apiProduct.description.substring(0, 160),
      slug: slug,
      canonicalUrl: `${BASE_URL}/products/${slug}`,
      og: {
        title: `${apiProduct.name}`,
        description: apiProduct.description.substring(0, 160),
        image: apiProduct.imageUrls[0] || `${BASE_URL}/default-og-image.jpg`,
        type: 'product',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${apiProduct.name}`,
        description: apiProduct.description.substring(0, 160),
        image: apiProduct.imageUrls[0] || `${BASE_URL}/default-twitter-image.jpg`,
      },
      robots: { index: true, follow: true },
      schema: {
        type: 'Product',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: apiProduct.name,
          description: apiProduct.description,
          image: apiProduct.imageUrls,
          sku: apiProduct._id,
          offers: {
            '@type': 'Offer',
            url: `${BASE_URL}/products/${slug}`,
            priceCurrency: 'VND', 
            price: apiProduct.price,
            availability: 'https://schema.org/InStock',
          },
        },
      },
      breadcrumbs: [
        { name: 'Trang chủ', slug: '/' },
        { name: category?.name || 'Products', slug: `/categories/${category?._id}` },
        { name: apiProduct.name, slug: `/products/${slug}` },
      ],
    },
  };
};

// Fetcher Functions
export async function getCategories(): Promise<ApiCategory[]> {
  const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${API_URL}/products`, { next: { revalidate: 3600 } }),
    fetch(`${API_URL}/categories`, { next: { revalidate: 3600 } })
  ]);

  if (!productsRes.ok || !categoriesRes.ok) {
    throw new Error('Failed to fetch data');
  }

  const apiProducts: ApiProduct[] = await productsRes.json();
  const apiCategories: ApiCategory[] = await categoriesRes.json();

  return apiProducts.map(p => mapApiProductToAppProduct(p, apiCategories));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // LƯU Ý: API hiện tại không hỗ trợ query bằng slug.
  // Tạm thời chúng ta sẽ fetch tất cả và tìm sản phẩm, đây là giải pháp không hiệu quả.
  // Backend nên được nâng cấp để có endpoint: GET /products/slug/:slug
  const allProducts = await getProducts();
  return allProducts.find(p => p.seo.slug === slug) || null;
}
