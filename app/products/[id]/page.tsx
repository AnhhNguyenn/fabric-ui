
// app/products/[id]/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Giả sử bạn có một interface IProduct
interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: { name: string };
}

// Hàm để ghi lại lượt xem
const logProductView = (productId: string) => {
  // Dùng navigator.sendBeacon nếu có thể để không làm chậm việc chuyển trang
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify({ type: 'product', identifier: productId })], { type: 'application/json' });
    navigator.sendBeacon('/api/log-view', blob);
  } else {
    // Fallback nếu trình duyệt không hỗ trợ sendBeacon
    fetch('/api/log-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', identifier: productId }),
      keepalive: true, // Giúp yêu cầu được hoàn thành ngay cả khi người dùng rời trang
    });
  }
};

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    // Ghi lại lượt xem sản phẩm
    logProductView(productId);

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error('Sản phẩm không tồn tại.');
        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin text-deep-rose" /></div>;
  if (error) return <div className="text-center py-20 text-red-500">Lỗi: {error}</div>;
  if (!product) return <div className="text-center py-20">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-deep-rose mb-8">
        <ArrowLeft size={18}/>
        Trở về trang chủ
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
            {product.images && product.images.length > 0 ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg"/>
            ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">Ảnh đang được cập nhật</div>
            )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <span className="text-sm font-semibold text-deep-rose bg-rose-100 px-3 py-1 rounded-full">
            {product.category?.name || 'Chưa phân loại'}
          </span>
          <h1 className="text-4xl font-bold font-serif text-gray-900">{product.name}</h1>
          <p className="text-3xl font-semibold text-deep-rose">{product.price.toLocaleString('vi-VN')}đ</p>
          <div className="prose prose-lg text-gray-600">
            <p>{product.description}</p>
          </div>
          <button className="w-full bg-deep-rose text-white font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all">
            <ShoppingCart/>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
