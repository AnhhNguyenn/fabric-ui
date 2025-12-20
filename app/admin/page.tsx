
// app/admin/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, DollarSign, ShoppingCart, Package, Eye } from 'lucide-react';
import { Types } from 'mongoose'; // Import Types for ObjectId
import { subDays, format } from 'date-fns';

// --- TypeScript Interfaces ---
// We need to define IOrder here to include the _id type
interface IOrder {
  _id: Types.ObjectId | string;
  customerInfo: { name: string };
  totalAmount: number;
  status: string;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  newOrdersToday: number;
  totalProducts: number;
}

interface ChartDataPoint {
  _id: string; // date string "YYYY-MM-DD"
  dailyRevenue: number;
}

interface TopViewedProduct {
  _id: string | Types.ObjectId;
  name: string;
  image: string;
  viewCount: number;
}

interface DashboardData {
  stats: DashboardStats;
  chartData: ChartDataPoint[];
  recentOrders: IOrder[];
  topViewedProducts: TopViewedProduct[];
}

// --- Helper Functions ---
const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

// --- Components ---
const StatCard = ({ title, value, icon, subtext }: { title: string, value: string, icon: React.ReactNode, subtext?: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex justify-between items-center">
    <div>
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
    <div className="bg-rose-100/70 text-deep-rose p-4 rounded-full">{icon}</div>
  </div>
);

const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusStyles: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100'}`}>{status}</span>;
};

// --- Main Page Component ---
const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) throw new Error('Không thể tải dữ liệu tổng quan.');
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const processChartData = (chartData: ChartDataPoint[]) => {
      const last30Days = Array.from({ length: 30 }, (_, i) => format(subDays(new Date(), i), 'yyyy-MM-dd')).reverse();
      return last30Days.map(day => {
          const found = chartData.find(d => d._id === day);
          return {
              date: format(new Date(day), 'dd/MM'),
              DoanhThu: found ? found.dailyRevenue : 0,
          };
      });
  };

  if (loading) return <div className="flex items-center justify-center p-20 text-lg"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải trang tổng quan...</div>;
  if (error) return <p className="text-red-500 p-4 bg-red-50 rounded-lg">Lỗi: {error}</p>;
  if (!data) return <p>Không có dữ liệu.</p>;

  const formattedChartData = processChartData(data.chartData);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 font-serif">Tổng quan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng Doanh thu" value={formatCurrency(data.stats.totalRevenue)} icon={<DollarSign />} subtext="(từ đơn hàng đã giao)"/>
        <StatCard title="Tổng Đơn hàng" value={data.stats.totalOrders.toLocaleString()} icon={<ShoppingCart />} />
        <StatCard title="Đơn hàng Mới" value={data.stats.newOrdersToday.toLocaleString()} icon={<ShoppingCart />} subtext="Hôm nay" />
        <StatCard title="Sản phẩm" value={data.stats.totalProducts.toLocaleString()} icon={<Package />} />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Doanh thu 30 ngày gần nhất</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={formattedChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb"/>
            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: any) => typeof value === 'number' ? `${value / 1000000}Tr` : ''} />
            <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '0.5rem'}} 
                labelStyle={{ fontWeight: 'bold' }} 
                formatter={(value: any) => typeof value === 'number' ? [formatCurrency(value), 'Doanh thu'] : [null, null]}
            />
            <Bar dataKey="DoanhThu" fill="#D12E5E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Đơn hàng Gần đây</h2>
          <div className="space-y-4">
            {data.recentOrders.map(order => (
              <div key={order._id.toString()} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-gray-800">{order.customerInfo.name}</p>
                  <p className="text-sm text-gray-500">{formatCurrency(order.totalAmount)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <OrderStatusBadge status={order.status} />
                  <Link href={`/admin/orders/${order._id.toString()}`} className="text-gray-400 hover:text-deep-rose"><Eye size={18}/></Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Sản phẩm được xem nhiều nhất</h2>
            <div className="space-y-4">
                {data.topViewedProducts && data.topViewedProducts.length > 0 ? data.topViewedProducts.map((product) => (
                    <div key={product._id.toString()} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100"/>
                            <div>
                                <Link href={`/admin/products/${product._id.toString()}`} className="font-semibold text-gray-800 hover:text-deep-rose transition-colors line-clamp-1">
                                    {product.name}
                                </Link>
                                <p className="text-sm text-gray-500">Lượt xem: {product.viewCount}</p>
                            </div>
                        </div>
                        <Link href={`/products/${product._id.toString()}`} target="_blank" className="text-gray-400 hover:text-deep-rose" title="Xem trang sản phẩm">
                            <Eye size={18}/>
                        </Link>
                    </div>
                )) : (
                    <p className="text-center py-8 text-gray-500 italic">Chưa có dữ liệu lượt xem sản phẩm.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
