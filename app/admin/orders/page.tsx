
// app/admin/orders/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IOrder } from '@/src/models/Order';
import { Loader2, Eye, Truck, CheckCircle, XCircle, ShoppingBag, ListFilter } from 'lucide-react';

const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusMap: { [key: string]: { text: string; icon: React.ReactNode; className: string; } } = {
    pending: { text: 'Chờ xử lý', icon: <Loader2 size={14} className="animate-spin"/>, className: 'bg-yellow-100 text-yellow-800' },
    processing: { text: 'Đang xử lý', icon: <Loader2 size={14} className="animate-spin"/>, className: 'bg-blue-100 text-blue-800' },
    shipped: { text: 'Đã giao hàng', icon: <Truck size={14}/>, className: 'bg-indigo-100 text-indigo-800' },
    delivered: { text: 'Hoàn thành', icon: <CheckCircle size={14}/>, className: 'bg-green-100 text-green-800' },
    cancelled: { text: 'Đã hủy', icon: <XCircle size={14}/>, className: 'bg-red-100 text-red-800' },
  };
  const currentStatus = statusMap[status] || statusMap.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${currentStatus.className}`}>
      {currentStatus.icon}
      {currentStatus.text}
    </span>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Không thể tải danh sách đơn hàng.');
        const data = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => filter === 'all' || order.status === filter);

  if (loading) return <div className="flex items-center justify-center p-20 text-lg"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải đơn hàng...</div>;
  if (error) return <p className="text-red-500 p-4 bg-red-50 rounded-lg">Lỗi: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-gray-800 font-serif flex items-center gap-3">
              <ShoppingBag size={30}/>
              Quản lý Đơn hàng
          </h1>
          {/* Filter Dropdown */}
          <div className="flex items-center gap-2">
              <ListFilter size={18} className="text-gray-500"/>
              <select 
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="border-gray-300 rounded-lg shadow-sm focus:border-rose-500 focus:ring-rose-500 font-semibold"
              >
                  <option value="all">Tất cả</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipped">Đã giao hàng</option>
                  <option value="delivered">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
              </select>
          </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-rose-50/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tl-xl">Mã ĐH</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Ngày đặt</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Tổng tiền</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tr-xl">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredOrders.length > 0 ? filteredOrders.map(order => (
                  <tr key={order._id.toString()} className="hover:bg-rose-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-600">...{order._id.toString().slice(-6)}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{order.customerInfo.name}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4 font-semibold text-green-700">{order.totalAmount.toLocaleString('vi-VN')}đ</td>
                    <td className="px-6 py-4"><OrderStatusBadge status={order.status} /></td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order._id}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold">
                        <Eye size={16} /> Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                )) : (
                    <tr>
                        <td colSpan={6} className="text-center py-12 text-gray-500 italic">
                            Không có đơn hàng nào phù hợp với bộ lọc.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default OrdersPage;
