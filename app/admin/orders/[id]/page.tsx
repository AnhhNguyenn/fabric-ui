
// app/admin/orders/[id]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { IOrder } from '@/src/models/Order';
import { Loader2, ArrowLeft, Trash2, User, Phone, Mail, Home, ShoppingCart } from 'lucide-react';

const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusMap: { [key: string]: { text: string; className: string; } } = {
    pending: { text: 'Chờ xử lý', className: 'bg-yellow-100 text-yellow-800' },
    processing: { text: 'Đang xử lý', className: 'bg-blue-100 text-blue-800' },
    shipped: { text: 'Đã giao hàng', className: 'bg-indigo-100 text-indigo-800' },
    delivered: { text: 'Hoàn thành', className: 'bg-green-100 text-green-800' },
    cancelled: { text: 'Đã hủy', className: 'bg-red-100 text-red-800' },
  };
  const currentStatus = statusMap[status] || statusMap.pending;
  return <span className={`font-semibold px-3 py-1 rounded-full text-sm ${currentStatus.className}`}>{currentStatus.text}</span>;
};

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) throw new Error('Không thể tải chi tiết đơn hàng.');
        const data = await response.json();
        setOrder(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async (newStatus: IOrder['status']) => {
      if (!order) return;
      setIsSaving(true);
      try {
          const response = await fetch(`/api/orders/${orderId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: newStatus })
          });
          if (!response.ok) throw new Error('Cập nhật trạng thái thất bại');
          const updatedOrder = await response.json();
          setOrder(updatedOrder);
      } catch (err: any) {
          setError(err.message)
      } finally {
          setIsSaving(false);
      }
  };

  const handleDelete = async () => {
      if (!order || !window.confirm("Bạn có chắc muốn xóa vĩnh viễn đơn hàng này? \nLưu ý: Hành động này không thể hoàn tác.")) return;
      setIsDeleting(true);
      try {
          const response = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Xóa đơn hàng thất bại');
          router.push('/admin/orders');
      } catch (err: any) {
          setError(err.message);
          setIsDeleting(false);
      }
  };

  if (loading) return <div className="flex items-center justify-center p-20 text-lg"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải chi tiết đơn hàng...</div>;
  if (error) return <p className="text-red-500 p-4 bg-red-50 rounded-lg">Lỗi: {error}</p>;
  if (!order) return <p className="text-center p-10">Không tìm thấy đơn hàng.</p>;

  const statusOptions: IOrder['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
                <Link href="/admin/orders" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-2">
                    <ArrowLeft size={18} />
                    Quay lại danh sách đơn hàng
                </Link>
                <h1 className="text-3xl font-bold text-gray-800 font-serif">Chi tiết Đơn hàng</h1>
                <p className="text-sm text-gray-500 mt-1 font-mono">ID: {order._id.toString()}</p>
                <p className="text-sm text-gray-500 mt-1">Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={handleDelete} disabled={isDeleting || isSaving} className="flex items-center gap-2 bg-gray-200 text-red-600 font-bold py-2.5 px-5 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50">
                    {isDeleting ? <Loader2 className="animate-spin"/> : <Trash2/>}
                </button>
                <select value={order.status} onChange={e => handleStatusChange(e.target.value as IOrder['status'])} disabled={isSaving} className="border-gray-300 rounded-lg shadow-sm font-bold text-lg py-2 pl-3 pr-8 focus:ring-rose-500 focus:border-rose-500">
                    {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
                {isSaving && <Loader2 className="animate-spin text-blue-600"/>}
            </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><ShoppingCart/> Các sản phẩm trong đơn</h2>
                    <div className="space-y-4">
                        {order.items.map(item => (
                            <div key={item.product.toString()} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover"/>
                                <div className="flex-grow">
                                    <p className="font-bold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">Giá: {item.price.toLocaleString('vi-VN')}đ</p>
                                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-gray-900 text-right">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                            </div>
                        ))}
                        <div className="flex justify-end items-center gap-4 pt-4 border-t-2 border-dashed">
                           <span className="text-lg font-bold text-gray-800">TỔNG CỘNG:</span>
                           <span className="text-2xl font-bold text-deep-rose">{order.totalAmount.toLocaleString('vi-VN')}đ</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><User/>Thông tin Khách hàng</h2>
                    <div className="space-y-2 text-gray-700">
                        <p className="flex items-center gap-2"><User size={16}/> <strong>{order.customerInfo.name}</strong></p>
                        <p className="flex items-center gap-2"><Mail size={16}/> <a href={`mailto:${order.customerInfo.email}`} className="text-blue-600 hover:underline">{order.customerInfo.email}</a></p>
                        <p className="flex items-center gap-2"><Phone size={16}/> <a href={`tel:${order.customerInfo.phone}`} className="text-blue-600 hover:underline">{order.customerInfo.phone}</a></p>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Home/>Địa chỉ Giao hàng</h2>
                    <div className="space-y-1 text-gray-700">
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}</p>
                        <p>{order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Trạng thái Đơn hàng</h2>
                    <OrderStatusBadge status={order.status}/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default OrderDetailPage;
