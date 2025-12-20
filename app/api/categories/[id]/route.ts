
// app/api/categories/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/dbConnect';
import Category from '@/src/models/Category';

interface Params {
  id: string;
}

// GET a single category
export async function GET(_req: NextRequest, { params }: { params: Params }) {
  await dbConnect();
  try {
    const category = await Category.findById(params.id);
    if (!category) {
      return NextResponse.json({ message: 'Không tìm thấy danh mục' }, { status: 404 });
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}

// UPDATE a category
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  await dbConnect();
  try {
    const body = await req.json();
    const updatedCategory = await Category.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedCategory) {
      return NextResponse.json({ message: 'Không tìm thấy danh mục' }, { status: 404 });
    }
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// DELETE a category
export async function DELETE(_req: NextRequest, { params }: { params: Params }) {
  await dbConnect();
  try {
    const deletedCategory = await Category.findByIdAndDelete(params.id);
    if (!deletedCategory) {
      return NextResponse.json({ message: 'Không tìm thấy danh mục' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Danh mục đã được xóa' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}
