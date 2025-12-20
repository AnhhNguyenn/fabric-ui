
// app/admin/customers/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Loader2, Users, ShoppingCart, DollarSign, Calendar, Search } from 'lucide-react';

// Define the structure of our aggregated customer data
interface CustomerData {
  email: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  firstOrderDate: string;
  lastOrderDate: string;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) throw new Error('Không thể tải dữ liệu khách hàng.');
        const data = await response.json();
        setCustomers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  if (loading) return <div className="flex items-center justify-center p-20 text-lg"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải danh sách khách hàng...</div>;
  if (error) return <p className="text-red-500 p-4 bg-red-50 rounded-lg">Lỗi: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-gray-800 font-serif flex items-center gap-3">
              <Users size={30}/>
              Quản lý Khách hàng
          </h1>
          <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                  type="text"
                  placeholder="Tìm kiếm tên, email, SĐT..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="border-gray-300 rounded-lg shadow-sm pl-10 pr-4 py-2 focus:border-rose-500 focus:ring-rose-500"
              />
          </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-rose-50/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tl-xl">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Tổng Đơn</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Tổng Chi tiêu</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Lần cuối mua</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider rounded-tr-xl">Ngày tham gia</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredCustomers.length > 0 ? filteredCustomers.map(customer => (
                  <tr key={customer.email} className="hover:bg-rose-50/50 transition-colors">
                    <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                        <p className="text-sm text-gray-500">{customer.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 font-semibold text-blue-600">
                           <ShoppingCart size={16}/> {customer.totalOrders}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2 font-bold text-green-700">
                            <DollarSign size={16}/> {customer.totalSpent.toLocaleString('vi-VN')}đ
                        </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-2">
                           <Calendar size={16}/> {new Date(customer.lastOrderDate).toLocaleDateString('vi-VN')}
                        </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                       <div className="flex items-center gap-2">
                           <Calendar size={16}/> {new Date(customer.firstOrderDate).toLocaleDateString('vi-VN')}
                        </div>
                    </td>
                  </tr>
                )) : (
                    <tr>
                        <td colSpan={5} className="text-center py-12 text-gray-500 italic">
                            {customers.length === 0 ? 'Chưa có dữ liệu khách hàng nào.' : 'Không tìm thấy khách hàng phù hợp.'}
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

export default CustomersPage;
