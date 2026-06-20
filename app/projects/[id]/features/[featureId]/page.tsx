import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/supabase/queries/projects'
import { getFeatureById, getFeaturesByProjectId } from '@/lib/supabase/queries/features'
import { FeatureDetail } from '@/features/feature/components/FeatureDetail'

interface PageProps {
  params: Promise<{ id: string; featureId: string }>
  searchParams: Promise<{ secret?: string }>
}

export default async function FeatureDetailPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const { id, featureId } = resolvedParams
  const { secret } = resolvedSearchParams

  // UUID Format validation to avoid DB crashes and correctly handle invalid IDs as 404
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id) || !uuidRegex.test(featureId)) {
    notFound()
  }

  // 1. Fetch project from database
  let project
  try {
    project = await getProjectById(id)
  } catch {
    throw new Error('Database error retrieving project data.')
  }

  if (!project) {
    notFound()
  }

  // 2. Fetch feature from database
  let feature
  try {
    feature = await getFeatureById(featureId)
  } catch {
    throw new Error('Database error retrieving feature data.')
  }

  if (!feature) {
    notFound()
  }

  // 3. Validate feature belongs to the project
  if (feature.project_id !== id) {
    notFound()
  }

  const features = await getFeaturesByProjectId(id)
  const featureIndex = features.findIndex(item => item.id === feature.id) + 1

  // Convert Date objects to strings for Client Component serialization boundary safety
  const serializedFeature = {
    ...feature,
    created_at: feature.created_at.toISOString(),
    updated_at: feature.updated_at.toISOString(),
    media: feature.media.map(m => ({
      ...m,
      created_at: m.created_at.toISOString(),
    })),
  }

  return (
    <main className="editorial-bg relative min-h-screen overflow-hidden">
      <FeatureDetail
        projectId={id}
        projectTitle={project.title}
        projectStatus={project.status}
        feature={serializedFeature}
        featureIndex={featureIndex}
        featureCount={features.length}
        secret={secret}
      />
    </main>
  )
}
