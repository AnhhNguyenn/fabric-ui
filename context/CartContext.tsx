
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

// Kiểu dữ liệu cho một item trong giỏ hàng
interface CartItem extends Product {
  quantity: number;
}

// Kiểu dữ liệu cho Context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  generateZaloPayLink: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook để sử dụng CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        // Nếu sản phẩm đã có, tăng số lượng
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Nếu chưa có, thêm vào giỏ với số lượng là 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // TẠO LINK THANH TOÁN ZALOPAY
  const generateZaloPayLink = () => {
    const ZALO_PAY_URL = "https://s.zalopay.vn/v3/order/submit";
    
    const orderInfo = cartItems
      .map(item => `${item.name} (x${item.quantity})`)
      .join(', ');
      
    const params = new URLSearchParams({
        "zptranstoken": "dummy_token_replace_with_real_one_from_backend", // Sẽ thay thế bằng token từ backend
        "amount": getCartTotal().toString(),
        "description": orderInfo,
        // Các tham số khác có thể cần thiết tùy theo tích hợp ZaloPay
    });

    return `${ZALO_PAY_URL}?${params.toString()}`;
  };


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    generateZaloPayLink,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
