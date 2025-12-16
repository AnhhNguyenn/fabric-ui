// app/admin/page.tsx
'use client';
import { useAuth } from '../../src/context/AuthContext'; 
import { Package, MessageCircle, User, Activity, DollarSign } from 'lucide-react';

// Dùng màu sắc mềm mại
const colorMap = {
    rose: { text: "text-rose-600", bg: "bg-rose-50", shadow: "shadow-rose-100" },
    teal: { text: "text-teal-600", bg: "bg-teal-50", shadow: "shadow-teal-100" },
    purple: { text: "text-purple-600", bg: "bg-purple-50", shadow: "shadow-purple-100" },
};

export default function AdminDashboardPage() {
    const { user } = useAuth(); 

    // Hàm giả lập (có thể thay bằng API thật sau này)
    const stats = [
        { title: "Tổng Sản Phẩm", value: "24", icon: Package, ...colorMap.rose },
        { title: "Khách hàng", value: "50+", icon: User, ...colorMap.purple },
        { title: "Doanh thu ước tính", value: "95 Triệu", icon: DollarSign, ...colorMap.teal },
    ];

    return (
        <div className="space-y-10">
            <header className="pb-6">
                <h1 className="text-4xl font-extrabold text-gray-800 font-serif">
                    👋 Chào mừng, {user?.name || 'Quản trị viên'}!
                </h1>
                <p className="text-gray-500 mt-2 text-lg">Hệ thống quản lý RiCa đã sẵn sàng.</p>
            </header>
            
            {/* Stats Cards - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.title} className={`bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl hover:scale-[1.01] ${stat.shadow}`}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">{stat.title}</h2>
                            <div className={`p-3 rounded-full ${stat.bg} ${stat.text}`}>
                                <stat.icon className={`w-6 h-6`} />
                            </div>
                        </div>
                        <p className="text-4xl mt-4 font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-xs mt-2 font-medium ${stat.text} uppercase`}>Tổng quan vận hành</p>
                    </div>
                ))}
            </div>

            {/* Quick Notifications / Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 font-serif">
                        <Activity className="w-5 h-5 text-rose-500" /> Hoạt động gần đây
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="p-2 bg-gray-50 rounded-lg"><span className="font-semibold text-rose-500">2025-12-14:</span> Đăng nhập CMS.</li>
                        <li className="p-2"><span className="font-semibold">05/12:</span> Tạo mới 'Lụa Tơ Tằm Hồng Phấn'</li>
                        <li className="p-2"><span className="font-semibold">04/12:</span> Cập nhật danh mục 'Lụa'</li>
                    </ul>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-300 bg-red-50">
                    <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2 font-serif">
                        <MessageCircle className="w-5 h-5" /> Cảnh báo Đơn hàng Zalo
                    </h3>
                    <p className="text-red-800 text-base">
                        Hệ thống không lưu trữ đơn hàng Zalo. Vui lòng **kiểm tra Zalo (0877003169)** thường xuyên để không bỏ lỡ đơn hàng tư vấn nào.
                    </p>
                    <p className="text-xs text-red-600 mt-2">Đơn hàng Zalo là nguồn doanh thu chính, cần theo dõi thủ công.</p>
                </div>
            </div>
        </div>
    );
}