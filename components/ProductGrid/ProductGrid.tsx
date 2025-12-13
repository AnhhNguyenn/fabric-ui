'use client';
import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import styles from './ProductGrid.module.scss';
import { Product, Category } from '@/lib/api';
import { useCart } from '@/context/CartContext';

interface ProductGridProps {
  products: Product[];
  categories: Category[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, categories }) => {
  const { addToCart } = useCart();

  // Map category ID to name helper
  const getCategoryName = (catId: string) => {
    const cat = categories.find(c => c._id === catId);
    return cat ? cat.name : 'Vải Cao Cấp';
  };

  return (
    <section id="collection" className={styles.section}>
      <div className={styles.bgDecoration}></div>

      <div className="container">
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
             <h2 className={styles.title}>
              Bộ Sưu Tập <span className={styles.highlight}>Mới Nhất</span>
            </h2>
            <p className={styles.subtitle}>
              Tuyển chọn những mẫu vải Pastel ngọt ngào nhất từ API.
            </p>
          </div>
          <button className={styles.viewAllBtn}>
            Xem Tất Cả
          </button>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product._id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {/* Tag Example - Logic could be added based on product data */}
                <span className={styles.tag}>New</span>

                <button className={styles.likeBtn} aria-label="Yêu thích">
                  <Heart size={20} />
                </button>

                {/* Next.js Image Optimization */}
                <div className={styles.imgContainer}>
                   <Image 
                    src={product.imageUrls[0] || 'https://picsum.photos/400/500'} 
                    alt={product.seo?.title || product.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.productImg}
                    priority={false}
                  />
                </div>
                
                <div className={styles.overlay}></div>
                
                <div className={styles.addToCartWrapper}>
                  <button 
                    className={styles.addToCartBtn}
                    onClick={() => addToCart(product)}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.row}>
                   <h3 className={styles.productName}>{product.name}</h3>
                   <span className={styles.categoryBadge}>{getCategoryName(product.category)}</span>
                </div>
                <p className={styles.price}>{product.price.toLocaleString('vi-VN')}đ/m</p>
                
                {/* Structured Data for Product Item (Invisible but parsed by Google) */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      '@context': 'https://schema.org',
                      '@type': 'Product',
                      name: product.name,
                      image: product.imageUrls,
                      description: product.description,
                      offers: {
                        '@type': 'Offer',
                        priceCurrency: 'VND',
                        price: product.price,
                        availability: 'https://schema.org/InStock'
                      }
                    })
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
