
// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/dbConnect';
import Order from '@/src/models/Order';

interface Params {
  id: string;
}

// Get a single order by ID
export async function GET(_req: NextRequest, { params }: { params: Params }) {
  await dbConnect();
  try {
    const order = await Order.findById(params.id);
    if (!order) {
      return NextResponse.json({ message: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}

// Update an order (e.g., change status)
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  await dbConnect();
  try {
    const body = await req.json();
    // Only allow updating specific fields, e.g., status
    const { status } = body;
    if (!status) {
        return NextResponse.json({ message: 'Trường status là bắt buộc' }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      params.id, 
      { status }, 
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// Delete an order
export async function DELETE(_req: NextRequest, { params }: { params: Params }) {
  await dbConnect();
  try {
    const deletedOrder = await Order.findByIdAndDelete(params.id);
    if (!deletedOrder) {
      return NextResponse.json({ message: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Đơn hàng đã được xóa' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}
