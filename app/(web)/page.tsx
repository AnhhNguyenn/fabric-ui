
import { getProducts } from '../../lib/api';
import { Hero } from '../../components/Hero/Hero';
import { Features } from '../../components/Features/Features';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { ColorPalette } from '../../components/ColorPalette'; // Giữ lại ColorPalette

// Trang chủ mới, giữ nguyên UI cũ
export default async function HomePage() {
  // Tìm nạp dữ liệu sản phẩm với cấu trúc SEO mới
  const products = await getProducts();

  return (
    <>
      <Hero />
      <Features />
      {/* Truyền dữ liệu sản phẩm đã được map vào ProductGrid */}
      <ProductGrid products={products.slice(0, 8)} /> 
      <ColorPalette />
    </>
  );
}
