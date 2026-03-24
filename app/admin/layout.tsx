import { headers } from 'next/headers';
import { AdminLayout } from '@/features/admin/components/AdminLayout';
import { UnauthorizedPage } from '@/features/admin/components/UnauthorizedPage';
import { validateAdminSecret } from '@/features/projects/utils/timeline';

interface AdminRootLayoutProps {
  children: React.ReactNode;
}

export default async function AdminRootLayout({ children }: AdminRootLayoutProps) {
  // proxy.ts forwards ?secret= as x-admin-secret header for RSC access.
  // This is the secure validation boundary — proxy only handles fast-path
  // redirect when secret param is absent entirely.
  const headersList = await headers();
  const secret = headersList.get('x-admin-secret') ?? '';

  if (!validateAdminSecret(secret)) {
    return <UnauthorizedPage />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
