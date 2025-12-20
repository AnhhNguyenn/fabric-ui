
// app/admin/layout.tsx

// === SỬA LỖI: IMPORT AUTH PROVIDER ===
import { AuthProvider } from '../../src/context/AuthContext';
import AdminLayout from '../../src/components/Admin/AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    // === SỬA LỖI: BỌC LAYOUT ADMIN BẰNG AUTH PROVIDER ===
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
}
