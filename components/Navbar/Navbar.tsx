'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import styles from './Navbar.module.scss';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, checkoutZalo } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navWrapper} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>M</div>
          <span className={styles.logoText}>Muse</span>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.menu}>
          <Link href="#home" className={styles.link}>Trang chủ</Link>
          <Link href="#features" className={styles.link}>Chất liệu</Link>
          <Link href="#collection" className={styles.link}>Bộ sưu tập</Link>
          <Link href="#palette" className={styles.link}>Bảng màu</Link>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button 
            className={styles.cartBtn} 
            onClick={checkoutZalo}
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className={styles.icon} />
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </button>
          <button className={styles.mobileMenuBtn}>
            <Menu className={styles.icon} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
