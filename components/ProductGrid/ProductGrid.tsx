
'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductGrid.module.scss';
// Sửa lỗi ở đây: Import Product từ file types.ts
import { Product } from '../../types'; 
import AddToCartButton from '../AddToCartButton/AddToCartButton';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <div key={product._id} className={styles.productCard}>
          <Link href={`/products/${product.slug}`}>
              <Image
                src={product.imageUrls[0]} // Chỉ hiển thị ảnh đầu tiên
                alt={product.name}
                width={400}
                height={500}
                className={styles.productImage}
              />
          </Link>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </p>
          </div>
            <AddToCartButton product={product} />
        </div>
      ))}
    </div>
  );
}

