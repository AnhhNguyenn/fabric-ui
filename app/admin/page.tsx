
// app/admin/page.tsx
import { getProducts } from '../../src/data/products';
import { getCategories } from '../../src/data/categories';
import { Product, Category } from '../../src/types';
import { 
    LayoutDashboard, 
    Package, 
    Shapes, 
    Wallet, 
    AlertTriangle, 
    ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

// --- Thống kê --- //
interface DashboardStats {
    totalProducts: number;
    totalCategories: number;
    totalInventoryValue: number;
    lowStockProductsCount: number;
    lowStockThreshold: number;
}

// --- Component Card Thống kê (ĐÃ SỬA LỖI) --- //
// Thay vì dùng prop `colorClass`, ta truyền thẳng các class của Tailwind vào
const StatCard = ({ title, value, icon: Icon, note, borderColor, bgColor, textColor }: any) => (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border ${borderColor}`}>
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
            <div className={`${bgColor} p-2 rounded-lg`}>
                <Icon className={textColor} size={24} />
            </div>
        </div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </div>
);

// --- Component Cảnh báo Hàng tồn kho thấp --- //
const LowStockWarning = ({ count, threshold, products }: { count: number, threshold: number, products: Product[] }) => {
    if (count === 0) return null;
    
    return (
        <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-2xl shadow-sm">
            <div className="flex items-start">
                <AlertTriangle className="text-yellow-500 mr-4 flex-shrink-0" size={28} />
                <div>
                    <h3 className="text-lg font-bold text-yellow-800">Cảnh báo tồn kho thấp</h3>
                    <p className="text-yellow-700 mt-1">Có <span className="font-extrabold">{count}</span> sản phẩm có số lượng tồn kho dưới <span className="font-extrabold">{threshold}</span> mét.</p>
                    <ul className="mt-3 list-disc list-inside text-sm text-yellow-700 font-semibold">
                        {products.map(p => <li key={p._id}>{p.name} (còn {p.stock}m)</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- Component Lối tắt --- //
const QuickLink = ({ title, href, icon: Icon }: any) => (
    <Link href={href}>
        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:border-rose-500 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-rose-100 p-3 rounded-lg mr-4">
                       <Icon className="text-rose-600" size={20} />
                    </div>
                    <h4 className="font-bold text-gray-700 group-hover:text-rose-600">{title}</h4>
                </div>
                <ArrowRight className="text-gray-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" size={20}/>
            </div>
        </div>
    </Link>
)


// --- Trang Dashboard Chính --- //
export default async function AdminDashboardPage() {

    const products = await getProducts();
    const categories = await getCategories();

    const LOW_STOCK_THRESHOLD = 100;

    const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const lowStockProducts = products.filter(p => p.stock < LOW_STOCK_THRESHOLD);

    const stats: DashboardStats = {
        totalProducts: products.length,
        totalCategories: categories.length,
        totalInventoryValue,
        lowStockProductsCount: lowStockProducts.length,
        lowStockThreshold: LOW_STOCK_THRESHOLD,
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    <LayoutDashboard className="mr-3 text-rose-500" size={32}/>
                    Dashboard
                </h1>
                <p className="text-sm text-gray-500">Chào mừng trở lại, Quản trị viên!</p>
            </div>

            {/* Lưới Thống kê (ĐÃ SỬA LỖI) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Tổng Sản phẩm" 
                    value={stats.totalProducts} 
                    icon={Package}
                    borderColor="border-blue-100"
                    bgColor="bg-blue-100"
                    textColor="text-blue-600"
                />
                <StatCard 
                    title="Tổng Danh mục" 
                    value={stats.totalCategories} 
                    icon={Shapes}
                    borderColor="border-purple-100"
                    bgColor="bg-purple-100"
                    textColor="text-purple-600"
                />
                <StatCard 
                    title="Giá trị tồn kho" 
                    value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalInventoryValue)} 
                    icon={Wallet}
                    borderColor="border-green-200"
                    bgColor="bg-green-100"
                    textColor="text-green-600"
                    note={`Dựa trên ${stats.totalProducts} sản phẩm`}
                />
            </div>

            {/* Cảnh báo và Lối tắt */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <h3 className="font-bold text-lg text-gray-600">Lối tắt</h3>
                    <QuickLink title="Quản lý Sản phẩm" href="/admin/products" icon={Package}/>
                    <QuickLink title="Quản lý Danh mục" href="/admin/categories" icon={Shapes}/>
                </div>
                <div className="space-y-6">
                    <h3 className="font-bold text-lg text-gray-600">Thông báo quan trọng</h3>
                     <LowStockWarning 
                        count={stats.lowStockProductsCount} 
                        threshold={stats.lowStockThreshold} 
                        products={lowStockProducts}
                    />
                </div>
            </div>
            {/* Khối <style> đã được xóa bỏ hoàn toàn */}
        </div>
    );
}
