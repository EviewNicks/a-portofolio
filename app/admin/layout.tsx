import { validateAdminSecret } from '@/features/projects/utils/timeline';
import { AdminLayout } from '@/features/admin/components/AdminLayout';
import { UnauthorizedPage } from '@/features/admin/components/UnauthorizedPage';

interface AdminRootLayoutProps {
  children: React.ReactNode;
  // Next.js v16 passes searchParams to layouts via props
  searchParams: Promise<{ secret?: string }>;
}

export default async function AdminRootLayout({
  children,
  searchParams,
}: AdminRootLayoutProps) {
  const params = await searchParams;
  const secret = params?.secret ?? '';

  if (!validateAdminSecret(secret)) {
    return <UnauthorizedPage />;
  }

  return <AdminLayout secret={secret}>{children}</AdminLayout>;
}
