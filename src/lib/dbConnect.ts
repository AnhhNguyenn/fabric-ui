
// src/lib/dbConnect.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Vui lòng định nghĩa biến môi trường MONGODB_URI bên trong tệp .env.local'
  );
}

/**
 * `cached` được sử dụng để lưu trữ kết nối qua các lần gọi hàm.
 * Điều này ngăn việc tạo kết nối mới mỗi khi một API route được gọi trong môi trường serverless,
 * giúp tối ưu hiệu suất.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("[DB] Sử dụng kết nối đã cache.");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("[DB] Đã tạo kết nối mới.");
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
