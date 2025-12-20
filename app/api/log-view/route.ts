
// app/api/log-view/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/dbConnect';
import ViewLog from '@/src/models/ViewLog';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const { type, identifier } = body;

    if (!type || !identifier || !['product', 'page'].includes(type)) {
      return NextResponse.json({ message: 'Dữ liệu không hợp lệ.' }, { status: 400 });
    }

    // Không cần đợi việc lưu hoàn tất, chỉ cần kích hoạt nó.
    // Giúp phản hồi nhanh hơn cho người dùng.
    ViewLog.create({ type, identifier });

    // Phản hồi ngay lập tức
    return NextResponse.json({ success: true }, { status: 202 }); // 202 Accepted

  } catch (error) {
    // Lỗi này không nên ảnh hưởng đến người dùng cuối, chỉ ghi log ở server
    console.error("Log View Error:", error);
    // Trả về một phản hồi thành công giả để không làm gián đoạn trải nghiệm người dùng
    return NextResponse.json({ success: true }, { status: 202 });
  }
}
