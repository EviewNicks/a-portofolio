import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/supabase/queries/projects'
import { validateAdminSecret } from '@/features/projects/utils/timeline'
import { UnauthorizedPage } from '@/features/admin/components/UnauthorizedPage'
import { AdminFeatureFormPage } from '@/features/feature/components/AdminFeatureFormPage'

interface PageProps {
  searchParams: Promise<{
    projectId?: string
    secret?: string
  }>
}

export default async function NewFeatureAdminPage({ searchParams }: PageProps) {
  const headersList = await headers()
  const { projectId, secret: querySecret } = await searchParams
  const secret = headersList.get('x-admin-secret') ?? querySecret ?? ''

  if (!validateAdminSecret(secret) || !projectId) {
    return <UnauthorizedPage />
  }

  const project = await getProjectById(projectId)
  if (!project) {
    notFound()
  }

  return (
    <AdminFeatureFormPage
      projectId={project.id}
      secret={secret}
    />
  )
}
