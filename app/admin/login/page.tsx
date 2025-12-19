
// app/admin/login/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/context/AuthContext'; 
import { Lock, Mail, LogIn, Loader2 } from 'lucide-react'; 

// Hàm để set cookie, sử dụng ở client-side
const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin'); 
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    console.log("Đăng nhập giả lập. Đang tạo auth_token và chuyển hướng...");
    
    // Giả lập một chút độ trễ
    setTimeout(() => {
        // --- SỬA LỖI --- 
        // Tạo một cookie giả tên là 'auth_token' để middleware có thể xác thực.
        // Điều này kết nối logic đăng nhập giả lập với middleware bảo vệ.
        setCookie('auth_token', 'fake-token-for-local-dev', 1);

        // Chuyển hướng đến trang quản trị
        router.push('/admin'); 
        router.refresh(); // Tải lại trang để đảm bảo middleware đọc được cookie mới
    }, 500);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-rose-200/70 p-8 md:p-12 space-y-10 border border-rose-50">
      
      <div className="text-center">
         <h1 className="font-serif text-5xl font-extrabold text-deep-rose tracking-tighter">RiCa</h1>
         <p className="text-xs uppercase tracking-[0.4em] text-rose-accent mt-2 font-semibold">CMS Đăng nhập</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full pl-12 pr-4 py-3 border border-rose-200 rounded-xl placeholder-gray-400 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-gray-800"
              placeholder="Email quản trị"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        
        <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full pl-12 pr-4 py-3 border border-rose-200 rounded-xl placeholder-gray-400 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-gray-800"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        {error && <p className="text-red-600 text-sm text-center font-medium bg-red-100 p-3 rounded-xl border border-red-300">{error}</p>}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3.5 px-4 text-lg font-extrabold uppercase tracking-widest rounded-xl text-white bg-deep-rose hover:bg-rose-700 transition-all shadow-lg shadow-rose-300/70 disabled:opacity-50 gap-3"
          >
            {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <LogIn size={20} />}
            {loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
          </button>
        </div>
      </form>
      
      <p className="text-center text-xs text-gray-400">© 2025 RiCa CMS</p>
    </div>
  );
}
