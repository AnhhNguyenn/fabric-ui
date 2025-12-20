
// app/admin/login/page.tsx
import React, { Suspense } from 'react';
import LoginForm from './LoginForm';

// Trang này bây giờ là một Server Component
export default function AdminLoginPageContainer() {
  return (
    // Suspense boundary cần thiết để các component con sử dụng useSearchParams
    <Suspense fallback={<div className='text-white'>Đang tải trang đăng nhập...</div>}> 
      <LoginForm />
    </Suspense>
  );
}
