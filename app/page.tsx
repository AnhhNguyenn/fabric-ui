
'use client';

import { useEffect } from 'react';
import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import Features from '../src/components/Features';
import ProductGrid from '../src/components/ProductGrid';
import ColorPalette from '../src/components/ColorPalette';

// Hàm để ghi lại lượt xem trang
const logPageView = (pageIdentifier: string) => {
  // Chúng ta không cần quan tâm đến phản hồi, nên chỉ cần gửi đi
  fetch('/api/log-view', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'page', identifier: pageIdentifier }),
    keepalive: true,
  }).catch(err => {
    // Bỏ qua lỗi, vì việc ghi log không được ảnh hưởng đến trải nghiệm người dùng
    console.error('Failed to log page view:', err);
  });
};

export default function Home() {
  useEffect(() => {
    // Ghi lại lượt xem cho trang chủ ('/')
    logPageView('/');
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần khi component được mount

  return (
    <main>
      <Navbar />
      <Hero />
      <ProductGrid />
      <Features />
      <ColorPalette />
    </main>
  );
}
