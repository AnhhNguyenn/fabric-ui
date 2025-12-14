// app/layout.tsx
import '../styles/globals.css';
import '../src/index.css';
import { CartProvider } from '../src/context/CartContext';
import { AuthProvider } from '../src/context/AuthContext'; 
// Giả định component Footer đã tồn tại trong dự án
import Footer from '../src/components/Footer'; 

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