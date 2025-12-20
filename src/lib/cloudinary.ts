
// src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Cấu hình Cloudinary bằng các biến môi trường
// Việc này chỉ được thực hiện ở phía server
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Luôn sử dụng HTTPS cho các tài nguyên
});

export default cloudinary;
