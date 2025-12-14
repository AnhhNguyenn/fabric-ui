// src/components/Admin/AdminLayout.tsx
'use client';
import React, { ReactNode, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, List, LogOut, Menu, X, User } from 'lucide-react'; 

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Sản phẩm', href: '/admin/products', icon: Package }, 
    { name: 'Danh mục', href: '/admin/categories', icon: List },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  if (isLoading) {
    return <div className="text-center p-20 text-lg">Đang kiểm tra xác thực...</div>;
  }

  // Logic chuyển hướng giữ nguyên
  if (!isAuthenticated && pathname !== '/admin/login') {
    router.push('/admin/login');
    return null;
  }

  if (!isAuthenticated && pathname === '/admin/login') {
    return <main className="bg-gray-50 min-h-screen flex items-center justify-center">{children}</main>;
  }
  
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      
      {/* Mobile Toggle Button */}
      <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white text-rose-500 rounded-xl shadow-lg border border-rose-100/50"
      >
          <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar - FIXED/ABSOLUTE/TRANSFORM for full responsiveness */}
      <aside className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl shadow-gray-200 p-6 flex flex-col justify-between border-r border-rose-50 z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:sticky lg:translate-x-0`}>
        
        {/* Close Button Mobile */}
        <button onClick={handleCloseSidebar} className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-rose-500 p-2">
            <X className="w-6 h-6" />
        </button>

        <div>
          <div className="text-center mb-8 border-b pb-4">
             <h1 className="font-serif text-4xl font-bold text-deep-rose tracking-tighter">MUSE</h1>
             <p className="text-[10px] uppercase tracking-[0.4em] text-rose-accent mt-1 font-semibold">CMS QUẢN TRỊ</p>
          </div>
          <nav>
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                return (
                    <Link 
                        key={item.name}
                        href={item.href}
                        onClick={handleCloseSidebar}
                        className={`flex items-center p-3 rounded-xl transition-colors mb-2 ${
                            isActive 
                                ? 'bg-rose-50 text-rose-600 font-semibold shadow-inner' 
                                : 'text-gray-600 hover:bg-rose-50/50 hover:text-rose-500'
                        }`}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                    </Link>
                );
            })}
          </nav>
        </div>
        
        {/* User Info & Logout */}
        <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-3">
                <User className="w-5 h-5 text-gray-400" />
                <div className="text-sm font-semibold text-gray-700 truncate">{user?.name || 'Admin'}</div>
            </div>
            <button
                onClick={logout}
                className="w-full flex items-center p-3 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
            >
                <LogOut className="w-5 h-5 mr-3" />
                Đăng xuất
            </button>
        </div>
      </aside>
      
      {/* Overlay cho Mobile */}
      {isSidebarOpen && <div onClick={handleCloseSidebar} className="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="lg:pt-0 pt-12 max-w-7xl mx-auto"> 
            {children}
        </div>
      </main>
    </div>
  );
}