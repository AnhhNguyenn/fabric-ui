
'use client';

import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import styles from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Sửa lỗi ở đây: Thêm số lượng là 1
    addToCart(product, 1);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <button onClick={handleAddToCart} className={styles.addToCartButton}>
      Thêm vào giỏ
    </button>
  );
}
