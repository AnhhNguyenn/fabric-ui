
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, ProductColor } from '../types'; // Assuming types are in ../types

// Định nghĩa kiểu dữ liệu cho một sản phẩm trong giỏ hàng
export interface CartItem {
    id: string;          // ID duy nhất cho mỗi item trong giỏ (có thể là `product._id` + `color.hex`)
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    color?: ProductColor; // Màu sắc đã chọn
}

// Định nghĩa kiểu dữ liệu cho Context của giỏ hàng
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number, color?: ProductColor) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, newQuantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number; // Thêm hàm này
}

// Tạo Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook để sử dụng CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        // Lazy initialization from localStorage
        if (typeof window === 'undefined') return [];
        try {
            const item = window.localStorage.getItem('cart');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            return [];
        }
    });

    // Persist to localStorage whenever cartItems changes
    useEffect(() => {
        try {
            window.localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartItems]);

    const addToCart = (product: Product, quantity: number, color?: ProductColor) => {
        setCartItems(prevItems => {
            const itemId = color ? `${product._id}_${color.hex}` : product._id;
            const existingItem = prevItems.find(item => item.id === itemId);

            if (existingItem) {
                // Cập nhật số lượng nếu sản phẩm đã tồn tại
                return prevItems.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Thêm sản phẩm mới vào giỏ
                const newItem: CartItem = {
                    id: itemId,
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    imageUrl: product.imageUrls[0], // Lấy ảnh đầu tiên làm đại diện
                    color,
                };
                return [...prevItems, newItem];
            }
        });
    };

    const removeFromCart = (itemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
