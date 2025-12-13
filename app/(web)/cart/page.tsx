'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';
import styles from './page.module.scss';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/create-zalo-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            amount: getTotalPrice(), 
            orderInfo: `Thanh toan don hang ${Date.now()}` 
        }),
      });
      const data = await res.json();
      if (data.orderUrl) {
        // Chuyển hướng người dùng đến ZaloPay
        window.location.href = data.orderUrl;
      } else {
        alert('Không thể tạo đơn hàng ZaloPay. Vui lòng thử lại.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("ZaloPay payment error:", error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Giỏ Hàng Của Bạn</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Giỏ hàng của bạn đang trống.</p>
          <Link href="/" className={styles.continueShoppingLink}>
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div>
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image src={item.imageUrl} alt={item.name} fill sizes="100px" />
                </div>
                
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemColor}>{item.color?.name || ''}</p>
                  <p className={styles.itemPrice}>{item.price.toLocaleString('vi-VN')}₫</p>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                      <label htmlFor={`quantity-${item.id}`} className="sr-only">Số lượng</label>
                      <input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      />
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.total}>
              Tổng cộng: <span>{getTotalPrice().toLocaleString('vi-VN')}₫</span>
            </div>
            <button onClick={handlePayment} className={styles.checkoutButton} disabled={isProcessing}>
              {isProcessing ? 'Đang xử lý...' : 'Thanh toán qua ZaloPay'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
