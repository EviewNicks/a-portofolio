import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getFeatureById } from '@/lib/supabase/queries/features'
import { validateAdminSecret } from '@/features/projects/utils/timeline'
import { UnauthorizedPage } from '@/features/admin/components/UnauthorizedPage'
import { AdminFeatureFormPage } from '@/features/feature/components/AdminFeatureFormPage'
import type { ProjectFeature } from '@/features/projects/types'

interface PageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    projectId?: string
    secret?: string
  }>
}

function toProjectFeature(raw: Awaited<ReturnType<typeof getFeatureById>>): ProjectFeature | null {
  if (!raw) return null

  return {
    id: raw.id,
    project_id: raw.project_id,
    title: raw.title,
    description: raw.description ?? undefined,
    youtube_url: raw.youtube_url ?? undefined,
    tech_stack: raw.tech_stack,
    display_order: raw.display_order,
    is_featured: raw.is_featured,
    demo_url: raw.demo_url ?? undefined,
    created_at: raw.created_at.toISOString(),
    updated_at: raw.updated_at.toISOString(),
    media: raw.media.map(media => ({
      id: media.id,
      feature_id: media.feature_id,
      storage_path: media.storage_path,
      public_url: media.public_url,
      file_name: media.file_name,
      display_order: media.display_order,
      created_at: media.created_at.toISOString(),
    })),
  }
}

export default async function EditFeatureAdminPage({
  params,
  searchParams,
}: PageProps) {
  const headersList = await headers()
  const { id: featureId } = await params
  const { projectId, secret: querySecret } = await searchParams
  const secret = headersList.get('x-admin-secret') ?? querySecret ?? ''

  if (!validateAdminSecret(secret) || !projectId) {
    return <UnauthorizedPage />
  }

  const feature = await getFeatureById(featureId)
  if (!feature || feature.project_id !== projectId) {
    notFound()
  }

  const projectFeature = toProjectFeature(feature)
  if (!projectFeature) {
    notFound()
  }

  return (
    <AdminFeatureFormPage
      projectId={projectId}
      featureId={featureId}
      secret={secret}
      initialFeature={projectFeature}
    />
  )
}
