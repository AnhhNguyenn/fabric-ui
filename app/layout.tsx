
// app/layout.tsx
import '../styles/globals.css';
import '../src/index.css';
import { CartProvider } from '../src/context/CartContext';
import { AuthProvider } from '../src/context/AuthContext'; 
import Footer from '../src/components/Footer'; 
import type { Metadata } from 'next';

// THÊM: Tối ưu SEO với Metadata
export const metadata: Metadata = {
  title: {
    template: '%s | RiCa - Vải Thời Trang Cao Cấp',
    default: 'RiCa - Vải Thời Trang Cao Cấp Tại TP.HCM',
  },
  description: 'Khám phá bộ sưu tập vải lụa, cotton, tafta, và linen cao cấp tại RiCa. Chúng tôi cung cấp những thước vải độc đáo, chất lượng cho các nhà thiết kế và người yêu thời trang.',
  keywords: ['vải', 'vải thời trang', 'vải cao cấp', 'vải lụa', 'vải cotton', 'mua vải online', 'cửa hàng vải TP.HCM', 'RiCa'],
  openGraph: {
    title: 'RiCa - Vải Thời Trang Cao Cấp',
    description: 'Nguồn cung cấp vải chất lượng cho mọi nhu cầu sáng tạo của bạn.',
    url: 'https://your-domain.com', // Thay bằng tên miền thực tế của bạn
    siteName: 'RiCa',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg', // Thay bằng URL ảnh đại diện cho mạng xã hội
        width: 1200,
        height: 630,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RiCa - Vải Thời Trang Cao Cấp',
    description: 'Khám phá bộ sưu tập vải lụa, cotton, tafta, và linen cao cấp tại RiCa.',
    // creator: '@your_twitter_handle', // Thay bằng tài khoản Twitter của bạn
    images: ['https://your-domain.com/twitter-image.jpg'], // Thay bằng URL ảnh đại diện cho Twitter
  },
  // Thêm các thông tin khác nếu cần
  // manifest: '/site.webmanifest',
  // icons: { apple: '/apple-touch-icon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider> 
          <CartProvider> 
            {children}
          </CartProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}