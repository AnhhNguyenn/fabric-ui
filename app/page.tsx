import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import Features from '../src/components/Features';
import ProductGrid from '../src/components/ProductGrid';
import ColorPalette from '../src/components/ColorPalette';

export default function Home() {
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
