
// src/context/AuthContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- SỬA LỖI: ĐỊNH NGHĨA CÁC HÀM QUẢN LÝ COOKIE ---
// Các hàm này cần thiết để giao tiếp với middleware qua cookie.
const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  // Đảm bảo cookie có thể được truy cập từ mọi trang
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const deleteCookie = (name: string) => {
  // Xóa cookie bằng cách đặt ngày hết hạn trong quá khứ
  document.cookie = name +'=; Max-Age=-99999999; path=/';  
}

// Giao diện cho Context
interface AuthContextType {
  user: { name: string } | null; // User giả lập chỉ cần tên
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>; // Hàm login giả lập
  logout: () => void; // Hàm logout
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Khi component được tải, kiểm tra xem cookie xác thực có tồn tại không
  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    if (token) {
      // Nếu có token, coi như đã đăng nhập và đặt một user giả
      setUser({ name: "Admin" });
    }
    setIsLoading(false);
  }, []);

  // --- SỬA LỖI: VIẾT LẠI HÀM LOGIN GIẢ LẬP ---
  // Hàm này không gọi API, chỉ tạo cookie và cập nhật trạng thái.
  const login = async (_email: string, _password: string) => {
    return new Promise<void>((resolve) => {
      console.log("[AUTH LOG] Thực hiện đăng nhập giả lập.");
      // 1. Tạo cookie mà middleware cần
      setCookie('auth_token', 'fake-token-for-local-dev', 1);
      // 2. Cập nhật trạng thái người dùng trong ứng dụng
      setUser({ name: "Admin" });
      resolve();
    });
  };

  // --- SỬA LỖI: VIẾT LẠI HÀM LOGOUT ---
  // Hàm này xóa cookie và cập nhật trạng thái.
  const logout = () => {
    console.log("[AUTH LOG] Đăng xuất: Xóa auth_token cookie.");
    // 1. Xóa cookie
    deleteCookie('auth_token');
    // 2. Cập nhật trạng thái người dùng
    setUser(null);
  };

  const authContextValue: AuthContextType = {
    user,
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

// Hook custom để sử dụng context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
