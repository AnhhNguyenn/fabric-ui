
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// === SỬA LỖI: IMPORT ĐÚNG TỆP TAILWIND CSS ===
import '../src/index.css'; 

import { CartProvider } from '../src/context/CartContext'; 
import Footer from '../src/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RiCa - Fabric & Silk',
  description: 'Vẻ đẹp đến từ những gì mềm mại và tự nhiên nhất.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
