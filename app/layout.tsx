import React from 'react';
import { Quicksand } from 'next/font/google';
import './globals.scss';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { CartProvider } from '@/context/CartContext';

// Tối ưu font chữ Quicksand
const quicksand = Quicksand({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://musefabric.vn'), // Thay domain thật của bạn
  title: {
    template: '%s | Muse Fabric',
    default: 'Muse Fabric - Vải Lụa, Umi, Tussi Cao Cấp',
  },
  description: 'Chuyên cung cấp vải lụa tơ tằm, Umi, Tussi phong cách Soft Feminine. Mềm mại, thoáng mát, sang trọng.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Muse Fabric',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={quicksand.variable}>
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
