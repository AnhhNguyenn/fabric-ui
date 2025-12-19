// app/layout.tsx
import '../styles/globals.css';
import '../src/index.css';
import { CartProvider } from '../src/context/CartContext';
import Footer from '../src/components/Footer'; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
          <CartProvider> 
            {children}
          </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
