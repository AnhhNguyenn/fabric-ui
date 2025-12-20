
// app/api/products/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/src/lib/dbConnect';
import Product from '@/src/models/Product';

/**
 * Xử lý yêu cầu GET để lấy danh sách sản phẩm.
 */
export async function GET(_req: Request) {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("[API_PRODUCTS_GET_ERROR]", error);
    return NextResponse.json(
      { message: "Lỗi máy chủ nội bộ. Không thể lấy danh sách sản phẩm." },
      { status: 500 }
    );
  }
}

/**
 * Xử lý yêu cầu POST để tạo sản phẩm mới.
 */
export async function POST(req: Request) {
  try {
    // Kết nối CSDL
    await dbConnect();

    // Lấy dữ liệu từ body của request
    const body = await req.json();

    // Tạo một bản ghi sản phẩm mới
    // Model sẽ tự động xác thực dữ liệu dựa trên Schema đã định nghĩa
    const newProduct = new Product(body);

    // Lưu sản phẩm vào database
    const savedProduct = await newProduct.save();

    // Trả về sản phẩm vừa tạo với status 201 (Created)
    return NextResponse.json(savedProduct, { status: 201 });

  } catch (error: any) {
    console.error("[API_PRODUCTS_POST_ERROR]", error);

    // Nếu có lỗi xác thực từ Mongoose, trả về lỗi chi tiết
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { message: "Lỗi xác thực dữ liệu", errors },
        { status: 400 } // Bad Request
      );
    }

    // Lỗi chung của máy chủ
    return NextResponse.json(
      { message: "Lỗi máy chủ nội bộ. Không thể tạo sản phẩm." },
      { status: 500 }
    );
  }
}

