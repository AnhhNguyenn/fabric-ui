
// app/admin/login/LoginForm.tsx
'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { useAuth } from '../../../src/context/AuthContext'; 
import { Lock, Mail, LogIn, Loader2 } from 'lucide-react'; 

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { isAuthenticated, login } = useAuth(); 
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextUrl = searchParams.get('next') || '/admin';

  useEffect(() => {
    if (isAuthenticated) {
      router.push(nextUrl); 
    }
  }, [isAuthenticated, router, nextUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      console.log("Đăng nhập thành công, đang chuyển hướng...");
      router.push(nextUrl);
    } catch (err: any) {
      console.error("Lỗi đăng nhập:", err);
      setError(err.message || "Có lỗi xảy ra");
      setLoading(false);
    }
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

// Bọc LoginForm trong Suspense để đảm bảo useSearchParams chỉ chạy ở client
export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}
