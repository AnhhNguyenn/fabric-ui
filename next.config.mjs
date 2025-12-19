
// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // THÊM: Cấu hình Tiêu đề Bảo mật
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Ngăn trình duyệt hiển thị trang của bạn trong <iframe>, bảo vệ khỏi clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Buộc trình duyệt sử dụng các loại MIME được chỉ định, ngăn chặn tấn công "MIME sniffing"
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Kiểm soát thông tin nào được gửi cùng với các yêu cầu
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // (Tùy chọn, nâng cao) Chính sách Bảo mật Nội dung - một lớp bảo mật mạnh mẽ
          // Cấu hình này khá nghiêm ngặt, có thể cần điều chỉnh nếu bạn thêm các script hoặc style từ bên ngoài
          // {
          //   key: 'Content-Security-Policy',
          //   value: "default-src 'self'; script-src 'self'; child-src 'none'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; form-action 'self'; frame-ancestors 'self'; base-uri 'self';",
          // },
        ],
      },
    ];
  },
};

export default nextConfig;
