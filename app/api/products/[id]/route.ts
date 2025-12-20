
// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

interface Params {
  params: { id: string };
}

/**
 * Lấy thông tin chi tiết một sản phẩm theo ID
 */
export async function GET(req: Request, { params }: Params) {
  const { id } = params;
  try {
    await dbConnect();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Sản phẩm không tồn tại." }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("[API_PRODUCT_GET_ERROR]", error);
    return NextResponse.json({ message: "Lỗi máy chủ nội bộ." }, { status: 500 });
  }
}

/**
 * Cập nhật một sản phẩm theo ID
 */
export async function PUT(req: Request, { params }: Params) {
  const { id } = params;
  try {
    await dbConnect();
    const body = await req.json();

    // Tìm và cập nhật sản phẩm
    // { new: true } trả về bản ghi đã được cập nhật
    // { runValidators: true } đảm bảo dữ liệu cập nhật tuân thủ schema
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { 
        new: true, 
        runValidators: true 
    });

    if (!updatedProduct) {
      return NextResponse.json({ message: "Sản phẩm không tồn tại." }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    console.error("[API_PRODUCT_PUT_ERROR]", error);
     if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ message: "Lỗi xác thực dữ liệu", errors }, { status: 400 });
    }
    return NextResponse.json({ message: "Lỗi máy chủ nội bộ." }, { status: 500 });
  }
}

/**
 * Xóa một sản phẩm theo ID
 */
export async function DELETE(req: Request, { params }: Params) {
  const { id } = params;
  try {
    await dbConnect();
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Sản phẩm không tồn tại." }, { status: 404 });
    }

    return NextResponse.json({ message: "Sản phẩm đã được xóa thành công." }, { status: 200 });
  } catch (error) {
    console.error("[API_PRODUCT_DELETE_ERROR]", error);
    return NextResponse.json({ message: "Lỗi máy chủ nội bộ." }, { status: 500 });
  }
}
