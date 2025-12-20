
// app/api/dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/dbConnect';
import Order from '@/src/models/Order';
import Product from '@/src/models/Product';
import ViewLog from '@/src/models/ViewLog'; // Import ViewLog
import { startOfToday, subDays } from 'date-fns';

// Lấy dữ liệu tổng hợp cho Dashboard
export async function GET(_req: NextRequest) {
  await dbConnect();
  try {
    // --- Chạy các truy vấn song song để tăng hiệu suất ---
    const [
      totalRevenueResult,
      totalOrders,
      newOrdersToday,
      totalProducts,
      revenueLast30Days,
      recentOrders,
      topViewedProducts
    ] = await Promise.all([
      // Tổng doanh thu
      Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      // Tổng đơn hàng
      Order.countDocuments(),
      // Đơn hàng mới hôm nay
      Order.countDocuments({ createdAt: { $gte: startOfToday() } }),
      // Tổng số sản phẩm
      Product.countDocuments(),
      // Dữ liệu biểu đồ doanh thu (30 ngày qua)
      Order.aggregate([
          { $match: { status: 'delivered', createdAt: { $gte: subDays(new Date(), 30) } } },
          { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, dailyRevenue: { $sum: '$totalAmount' } } },
          { $sort: { _id: 1 } }
      ]),
      // Các đơn hàng gần đây
      Order.find({}).sort({ createdAt: -1 }).limit(5).lean(), // .lean() để đọc nhanh hơn
      // Top sản phẩm được xem nhiều nhất
      ViewLog.aggregate([
        { $match: { type: 'product' } },
        { $group: { _id: '$identifier', viewCount: { $sum: 1 } } },
        { $sort: { viewCount: -1 } },
        { $limit: 5 },
        // Chuyển đổi _id (string) thành ObjectId để lookup
        { $addFields: { "productIdObj": { "$toObjectId": "$_id" } } },
        {
          $lookup: {
            from: 'products', // Tên của collection `products`
            localField: 'productIdObj',
            foreignField: '_id',
            as: 'productDetails'
          }
        },
        {
            // Loại bỏ những sản phẩm có thể đã bị xóa nhưng vẫn còn log
            $match: { "productDetails": { $ne: [] } }
        },
        { $unwind: '$productDetails' },
        {
          $project: {
            _id: '$productDetails._id',
            name: '$productDetails.name',
            image: { $arrayElemAt: ['$productDetails.images', 0] }, // Lấy ảnh đầu tiên
            viewCount: 1,
          }
        }
      ])
    ]);

    // --- Tổng hợp dữ liệu ---
    const dashboardData = {
      stats: {
        totalRevenue: totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0,
        totalOrders,
        newOrdersToday,
        totalProducts,
      },
      chartData: revenueLast30Days,
      recentOrders,
      topViewedProducts, // Thêm dữ liệu mới vào phản hồi
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error("API GET Dashboard Error:", error);
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ khi lấy dữ liệu dashboard' }, { status: 500 });
  }
}
