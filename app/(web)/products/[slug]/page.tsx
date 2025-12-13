'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '../../../../lib/api';
import { Product } from '../../../../types';
import { useCart } from '../../../../context/CartContext';
import styles from './page.module.scss';

interface PageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = params;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0); 
  const [selectedColorHex, setSelectedColorHex] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductBySlug(slug);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          if (fetchedProduct.colors.length > 0) {
            setSelectedColorHex(fetchedProduct.colors[0].hex);
          }
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
        const selectedColor = product.colors.find(c => c.hex === selectedColorHex);
        addToCart(product, quantity, selectedColor);
        setJustAdded(true);
        setTimeout(() => {
            setJustAdded(false);
        }, 2000); // Hide message after 2 seconds
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Đang tải sản phẩm...</p></div>;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Image Gallery */}
        <div className={styles.imageGallery}>
            <div className={styles.mainImage}>
                <Image 
                    src={product.imageUrls[selectedImage]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <div className={styles.thumbnailList}>
                {product.imageUrls.map((url, index) => (
                    <div 
                        key={index} 
                        className={`${styles.thumbnail} ${index === selectedImage ? styles.active : ''}`}
                        onClick={() => setSelectedImage(index)}
                    >
                        <Image src={url} alt={`Thumbnail ${index + 1}`} fill sizes="10vw"/>
                    </div>
                ))}
            </div>
        </div>

        {/* Product Details */}
        <div className={styles.details}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{product.price.toLocaleString('vi-VN')}₫</p>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }} />
          
          {/* Color Selector */}
          <div className={styles.colorSelector}>
              <label className={styles.label}>Màu sắc: {product.colors.find(c => c.hex === selectedColorHex)?.name}</label>
              <div className={styles.colorOptions}>
                  {product.colors.map(color => (
                      <div 
                          key={color.hex}
                          className={`${styles.colorSwatch} ${selectedColorHex === color.hex ? styles.selected : ''}`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => setSelectedColorHex(color.hex)}
                          title={color.name}
                      />
                  ))}
              </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className={styles.quantitySelector}>
              <label htmlFor="quantity" className={styles.label}>Số lượng</label>
              <input 
                  id="quantity"
                  type="number" 
                  min="1" 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
              />
          </div>

          <button onClick={handleAddToCart} className={styles.addToCartButton} disabled={justAdded}>
              {justAdded ? 'Đã thêm!' : 'Thêm vào giỏ'}
          </button>
          {justAdded && <p className={styles.addedMessage}>Sản phẩm đã được thêm vào giỏ hàng!</p>}
        </div>
      </div>
    </div>
  );
}
