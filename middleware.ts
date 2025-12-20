
// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Lấy token từ request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Nếu đang cố gắng truy cập vào khu vực admin VÀ chưa có token (chưa đăng nhập)
  if (pathname.startsWith('/admin') && !token) {
    // Tạo URL tuyệt đối cho trang login
    const loginUrl = new URL('/login', req.url);
    // Thêm một tham số `callbackUrl` để chuyển hướng lại sau khi đăng nhập thành công
    loginUrl.searchParams.set('callbackUrl', req.url);
    
    // Chuyển hướng đến trang login
    return NextResponse.redirect(loginUrl);
  }

  // Nếu đã đăng nhập và đang truy cập trang login, chuyển hướng đến trang admin
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/admin/products', req.url));
  }

  // Nếu hợp lệ, cho phép request đi tiếp
  return NextResponse.next();
}

// Chỉ định các route mà middleware này sẽ được áp dụng
export const config = {
  matcher: [
    '/admin/:path*', // Tất cả các route con trong /admin
    '/login',         // Route login
  ],
};
