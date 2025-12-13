
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{product.price.toLocaleString('vi-VN')}₫</p>
      </div>
    </Link>
  );
};

export default ProductCard;
