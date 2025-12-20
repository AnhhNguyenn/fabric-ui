
// app/api/customers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/dbConnect';
import Order from '@/src/models/Order';

// Aggregate customer data from orders
export async function GET(_req: NextRequest) {
  await dbConnect();
  try {
    const customers = await Order.aggregate([
      {
        $group: {
          _id: "$customerInfo.email", // Group by customer email
          name: { $first: '$customerInfo.name' },
          phone: { $first: '$customerInfo.phone' },
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          firstOrderDate: { $min: '$createdAt' },
          lastOrderDate: { $max: '$createdAt' },
        }
      },
      {
        $project: {
          _id: 0,
          email: "$_id",
          name: 1,
          phone: 1,
          totalOrders: 1,
          totalSpent: 1,
          firstOrderDate: 1,
          lastOrderDate: 1,
        }
      },
      {
        $sort: { lastOrderDate: -1 } // Show most recent customers first
      }
    ]);

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("API GET Customers Error:", error);
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ khi tổng hợp dữ liệu khách hàng' }, { status: 500 });
  }
}
