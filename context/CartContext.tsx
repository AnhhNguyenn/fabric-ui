'use client';
import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/lib/api';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  totalItems: number;
  checkoutZalo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const checkoutZalo = () => {
    if (cart.length === 0) return;

    let message = "👋 Chào Muse Fabric, mình muốn đặt các mẫu vải này:\n\n";
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      totalPrice += lineTotal;
      message += `${index + 1}. ${item.name} (${item.category})\n`;
      message += `   - Số lượng: ${item.quantity}m\n`;
      message += `   - Đơn giá: ${item.price.toLocaleString('vi-VN')}đ\n\n`;
    });

    message += `💰 TỔNG TẠM TÍNH: ${totalPrice.toLocaleString('vi-VN')}đ\n`;
    message += "Shop tư vấn giúp mình nhé!";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://zalo.me/0877003169?message=${encodedMessage}`, '_blank');
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, checkoutZalo }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
