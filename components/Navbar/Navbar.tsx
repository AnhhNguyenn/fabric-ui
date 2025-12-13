'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.scss'; // Import SCSS module

const Navbar = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Femme.
      </Link>
      <Link href="/cart" className={styles.cartLink}>
        <ShoppingBag />
        <span>Giỏ hàng</span>
        {itemCount > 0 && (
          <span className={styles.cartCount}>{itemCount}</span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;