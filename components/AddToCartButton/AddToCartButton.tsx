
'use client';

import { useCart } from '../../context/CartContext';
import { Product } from '../../types';

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: '#3182ce', // Blue-600
        color: 'white',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '1rem'
      }}
    >
      Thêm vào giỏ
    </button>
  );
};
