
'use client';

import { CartProvider } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import '../../app/globals.scss';

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {/* Cấu trúc div này giữ nguyên bố cục flex của bạn */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
