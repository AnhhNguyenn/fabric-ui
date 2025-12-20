
// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/dbConnect';
import Order from '@/src/models/Order';

// Get all orders (for admin)
export async function GET(_req: NextRequest) {
  await dbConnect();
  try {
    // Populate product details for each item in the order
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("API GET Orders Error:", error);
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}

// Create a new order (for checkout)
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    // TODO: Validate product prices and stock before creating order
    const newOrder = new Order(body);
    await newOrder.save();
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error("API POST Order Error:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
