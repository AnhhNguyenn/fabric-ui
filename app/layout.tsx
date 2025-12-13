
import { CartProvider } from '../context/CartContext';
import '../app/globals.scss';

// Static Metadata
export const metadata = {
  title: {
    default: 'Muse Fabric - Vẻ Đẹp Tinh Tế',
    template: '%s | Muse Fabric',
  },
  description: 'Khám phá bộ sưu tập thời trang nữ tính và thanh lịch của chúng tôi, lấy cảm hứng từ sự mềm mại và sang trọng.',
  keywords: ['thời trang nữ', 'lụa', 'nữ tính', 'thanh lịch', 'soft feminine'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // Inline JSON-LD for WebSite Schema
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: metadata.title.default,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    description: metadata.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="vi">
       <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body>
        <CartProvider>
            {children}
        </CartProvider>
      </body>
    </html>
  );
}
