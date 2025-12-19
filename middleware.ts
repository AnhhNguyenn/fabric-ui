
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Tên của cookie dùng để xác thực
const AUTH_COOKIE_NAME = 'auth_token';

export function middleware(request: NextRequest) {
  // Lấy cookie xác thực từ request
  const authToken = request.cookies.get(AUTH_COOKIE_NAME);
  const { pathname } = request.nextUrl;

  // Nếu người dùng cố gắng truy cập vào bất kỳ trang nào trong khu vực /admin
  // ngoại trừ trang đăng nhập, mà không có token -> CHẶN
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!authToken) {
      console.log(`[Middleware] No auth token. Redirecting from ${pathname} to /admin/login.`);
      // Tạo URL tuyệt đối cho việc chuyển hướng
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('next', pathname); // Thêm tham số để có thể quay lại trang cũ sau khi đăng nhập
      return NextResponse.redirect(loginUrl);
    }
  }

  // Nếu người dùng đã đăng nhập và cố vào trang login, đưa họ vào trang admin chính
  if (pathname === '/admin/login' && authToken) {
      console.log(`[Middleware] User already logged in. Redirecting from /admin/login to /admin.`);
      return NextResponse.redirect(new URL('/admin', request.url));
  }


  // Nếu mọi thứ hợp lệ, cho phép request tiếp tục
  return NextResponse.next();
}

// Cấu hình để middleware chỉ chạy trên các đường dẫn của trang admin
export const config = {
  matcher: [
    '/admin/:path*', 
    '/admin/login'
],
};
