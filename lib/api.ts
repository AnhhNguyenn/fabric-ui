const API_URL = 'https://api-server-plum.vercel.app';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

export interface Category {
  _id: string;
  name: string;
  description: string;
}

// Hàm fetch tối ưu cho Next.js với caching (Revalidation)
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      next: { revalidate: 3600 }, // Cache trong 1 giờ, tốt cho SEO speed
    } as any);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 86400 }, // Cache 24h vì danh mục ít thay đổi
    } as any);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}