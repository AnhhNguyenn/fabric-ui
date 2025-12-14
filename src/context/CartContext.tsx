// src/context/CartContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../types'; 

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void; 
  updateQuantity: (productId: string, delta: number) => void; 
  total: number;
  checkoutZalo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product: Product, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.product._id === product._id); 
      if (existing) {
        return prev.map(item =>
          item.product._id === product._id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.product._id === productId) {
        // Minimum 0.5m
        const newQuantity = Math.max(0.5, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Tính tổng dựa trên Product.price (number)
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Logic Zalo Checkout
  const ZALO_PHONE_NUMBER = '0877003169'; 
  const checkoutZalo = () => {
    if (items.length === 0) {
      alert("Giỏ hàng rỗng! Vui lòng thêm sản phẩm.");
      return;
    }
    
    let message = "Đơn hàng mới từ website (Muse Fabric):\n\n";
    items.forEach((item, index) => {
      const imageUrl = item.product.imageUrls?.[0] || 'Không có ảnh'; 
      const priceFormatted = item.product.price.toLocaleString('vi-VN');
      
      message += `[${index + 1}] ${item.product.name}\n`;
      message += `   - Số lượng: ${item.quantity} m\n`;
      message += `   - Giá/m: ${priceFormatted} đ\n`;
      message += `   - Link ảnh: ${imageUrl}\n\n`;
    });
    
    const formattedTotal = total.toLocaleString('vi-VN');
    message += `**TỔNG CỘNG: ${formattedTotal} đ**\n\n`;
    message += "Vui lòng xác nhận và tư vấn chi tiết cho tôi.";
    
    const encodedMessage = encodeURIComponent(message);
    const zaloLink = `https://zalo.me/${ZALO_PHONE_NUMBER}?message=${encodedMessage}`;
    
    window.open(zaloLink, '_blank');
  };

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, total, checkoutZalo }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};