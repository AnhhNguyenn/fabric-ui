
import { getAllProducts } from '../../lib/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './page.module.scss';

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <section>
      <div className={styles.hero}>
        <h1 className={styles.title}>Vẻ Đẹp Tinh Tế</h1>
        <p className={styles.subtitle}>Khám phá bộ sưu tập thời trang nữ tính và thanh lịch của chúng tôi</p>
      </div>
      
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
