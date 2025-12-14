import AdminLayout from '../../src/components/Admin/AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}