import { CartProvider } from '../src/context/CartContext';
import Footer from '../src/components/Footer';
import '../src/index.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
