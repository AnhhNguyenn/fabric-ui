
'use client';

import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, generateZaloPayLink } = useCart();

  const handleCheckout = () => {
    const zaloLink = generateZaloPayLink();
    // Chuyển hướng người dùng đến link ZaloPay
    window.location.href = zaloLink;
  };

  return (
    <div className="cart-page-container" style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
      <h1>Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống. <Link href="/" style={{ color: '#3182ce' }}>Tiếp tục mua sắm</Link></p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
                <Image src={item.imageUrls[0]} alt={item.name} width={80} height={80} style={{ objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <Link href={`/products/${item.seo.slug}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
                    {item.name}
                  </Link>
                  <p>{item.price.toLocaleString('vi-VN')}₫</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input 
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    style={{ width: '60px', textAlign: 'center', padding: '0.5rem' }}
                  />
                  <button onClick={() => removeFromCart(item._id)} style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer' }}>Xóa</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary" style={{ marginTop: '2rem', textAlign: 'right' }}>
            <h2>Tổng cộng: {getCartTotal().toLocaleString('vi-VN')}₫</h2>
            <button 
              onClick={handleCheckout}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2f855a', // Green-600
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '1rem'
              }}
            >
              Thanh toán qua ZaloPay
            </button>
          </div>
        </>
      )}
    </div>
  );
}
