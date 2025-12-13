
import { getProductBySlug, getProducts } from '../../../lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ProductGrid } from '../../../components/ProductGrid/ProductGrid';
import { AddToCartButton } from '../../../components/AddToCartButton/AddToCartButton'; // Component này sẽ được tạo sau

// Generate Metadata: Tạo các thẻ meta SEO động
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Sản phẩm không tồn tại' };

  const { seo } = product;
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical: seo.canonicalUrl },
    openGraph: seo.og,
    twitter: seo.twitter,
  };
}

// Generate Static Paths: Tạo sẵn các trang tĩnh khi build
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(product => ({ slug: product.seo.slug }));
}

// Trang chi tiết sản phẩm
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  // Lấy một vài sản phẩm khác để làm "related products"
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => p._id !== product?._id).slice(0, 4);

  if (!product) {
    notFound();
  }

  const { name, description, price, imageUrls, seo } = product;

  // Tạo Breadcrumb Schema từ dữ liệu SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: seo.breadcrumbs?.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.slug}`,
    })),
  };

  return (
    <div className="product-page-container" style={{ padding: '2rem' }}>
      {/* Nhúng JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema?.data) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="product-main-content" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div className="product-image-gallery">
          {/* Sử dụng Next/Image để tối ưu ảnh */}
          <Image src={imageUrls[0]} alt={name} width={500} height={500} style={{ objectFit: 'cover' }} />
        </div>
        <div className="product-details" style={{ flex: 1 }}>
          <h1>{name}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e53e3e' }}>
            {price.toLocaleString('vi-VN')}₫
          </p>
          <p style={{ marginTop: '1rem' }}>{description}</p>
          
          {/* Component nút thêm vào giỏ hàng */}
          <AddToCartButton product={product} />
        </div>
      </div>

      <div className="related-products">
        <h2>Sản phẩm liên quan</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  );
}

const BASE_URL = 'https://your-production-domain.com'; // Nhớ thay thế domain thật
