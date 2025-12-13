
// types.ts

// 1. SEO OBJECT THEO CHUẨN MASTER PROMPT
export interface Seo {
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  slug: string;
  canonicalUrl: string;
  og?: {
    title: string;
    description: string;
    image: string;
    type: 'website' | 'article' | 'product';
  };
  twitter?: {
    title: string;
    description: string;
    image: string;
    card: 'summary' | 'summary_large_image';
  };
  robots?: {
    index: boolean;
    follow: boolean;
    noimageindex?: boolean;
    nosnippet?: boolean;
  };
  schema?: {
    type: 'Product' | 'BreadcrumbList' | 'FAQPage' | 'WebSite';
    data: any; // Dữ liệu JSON-LD cho schema
  };
  internalLinks?: {
    anchor: string;
    targetSlug: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
  breadcrumbs?: {
    name: string;
    slug: string;
  }[];
}

// 2. ENTITY TYPES MỚI VỚI SEO TÍCH HỢP
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: Pick<Category, '_id' | 'name'>; // Nhúng thông tin category cơ bản
  seo: Seo;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  seo: Seo;
}

export interface Page {
  _id: string;
  title: string;
  content: string;
  seo: Seo;
}

// 3. SITE CONFIGURATION
export interface SiteConfig {
  siteName: string;
  baseUrl: string;
  defaultSeo: Seo;
}
