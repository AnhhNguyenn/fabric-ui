
// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { Readable } from 'stream';

// Hàm trợ giúp để chuyển ReadableStream thành Buffer
async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: "Không tìm thấy tệp tải lên." }, { status: 400 });
    }

    // Chuyển file thành buffer
    const fileBuffer = await streamToBuffer(file.stream());

    // Tạo một promise để xử lý việc upload
    const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "fabric_cms", // Tên thư mục trên Cloudinary
                // Các tùy chọn khác có thể thêm ở đây (transformations, tags...)
            },
            (error, result) => {
                if (error) {
                    console.error("[CLOUDINARY_UPLOAD_ERROR]", error);
                    return reject(new Error("Lỗi khi tải ảnh lên Cloudinary."));
                }
                if (result) {
                    resolve(result);
                }
            }
        );

        // Ghi buffer vào stream để upload
        const readableStream = new Readable();
        readableStream.push(fileBuffer);
        readableStream.push(null); // Kết thúc stream
        readableStream.pipe(uploadStream);
    });

    // Chờ promise hoàn thành
    const result: any = await uploadPromise;

    // Trả về URL an toàn và public_id để có thể quản lý (ví dụ: xóa)
    return NextResponse.json({
      message: "Tải lên thành công",
      url: result.secure_url,
      public_id: result.public_id,
    }, { status: 201 });

  } catch (error) {
    console.error("[API_UPLOAD_POST_ERROR]", error);
    return NextResponse.json({ message: "Lỗi máy chủ nội bộ." }, { status: 500 });
  }
}
