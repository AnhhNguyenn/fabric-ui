// src/context/AuthContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../utils/api';
import { User } from '../types';
import axios from 'axios'; 

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Thay đổi: User sẽ chỉ lưu thông tin cơ bản sau khi login nếu không có Profile API
  const [user, setUser] = useState<{ name: string } | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  // Loại bỏ fetchProfile - Chỉ kiểm tra token
  const checkToken = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      // Nếu có token, coi như đã đăng nhập
      // Chúng ta đặt một user giả định vì không có API Profile để lấy tên thật
      setUser({ name: "Admin" }); 
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // 1. Gọi API login
      const { access_token } = await authApi.login({ email, password });
      
      // 2. Lưu token
      localStorage.setItem('accessToken', access_token);
      
      // 3. Cập nhật trạng thái người dùng (không cần API Profile)
      setUser({ name: "Admin" }); 
      console.log("[AUTH LOG] Đăng nhập thành công, bỏ qua bước Profile API 404.");

    } catch (error: any) { 
        console.error("[AUTH LOG] Đăng nhập thất bại:", error);
        
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.data && error.response.data.message) {
                 throw new Error(error.response.data.message);
            } else if (error.response.status === 401) {
                 throw new Error("Email hoặc mật khẩu không chính xác.");
            } else {
                 throw new Error(`Lỗi server (${error.response.status}).`);
            }
        } else {
             throw new Error("Không thể kết nối đến máy chủ API.");
        }
    }
  };

  const logout = () => {
    console.log("[AUTH LOG] Đăng xuất: Xóa token.");
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  // User type đã được thay đổi thành { name: string }
  const authContextValue: AuthContextType = {
    user: user as any, 
    isAuthenticated: !!user, 
    isLoading, 
    login, 
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};