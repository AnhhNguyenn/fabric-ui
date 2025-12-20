
// app/admin/layout.tsx
'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, ShoppingCart, Tag, Users, Package, Menu, X, LogOut, Store
} from 'lucide-react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Tổng quan' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Đơn hàng' },
  { href: '/admin/products', icon: Package, label: 'Sản phẩm' },
  { href: '/admin/categories', icon: Tag, label: 'Danh mục' },
  { href: '/admin/customers', icon: Users, label: 'Khách hàng' },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50/50 font-sans">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-md"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:relative z-30 w-64 h-full bg-white border-r border-gray-200/80 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 h-20 px-6 border-b border-gray-200/80">
                  <div className="bg-deep-rose p-2 rounded-lg">
                      <Store className="text-white" size={28}/>
                  </div>
                  <h1 className="text-xl font-bold text-gray-800 font-serif">Kim Oanh</h1>
              </div>
              <nav className="flex-1 px-4 py-4 space-y-2">
                  {navItems.map(item => {
                      const isActive = (item.href === '/admin' && pathname === '/admin') || (item.href !== '/admin' && pathname.startsWith(item.href));
                      return (
                          <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                              <span className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-semibold ${isActive ? 'bg-rose-100/60 text-deep-rose' : 'text-gray-600 hover:bg-gray-100'}`}>
                                  <item.icon size={20} />
                                  {item.label}
                              </span>
                          </Link>
                      );
                  })}
              </nav>
              <div className="px-4 py-4 border-t border-gray-200/80">
                  <Link href="/api/auth/signout">
                      <span className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-semibold">
                          <LogOut size={20} />
                          Đăng xuất
                      </span>
                  </Link>
              </div>
          </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
            {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

