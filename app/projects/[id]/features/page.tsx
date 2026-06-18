import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/supabase/queries/projects'
import { getFeaturesByProjectId } from '@/lib/supabase/queries/features'
import { validateAdminSecret } from '@/features/projects/utils/timeline'
import { UnauthorizedPage } from '@/features/admin/components/UnauthorizedPage'
import { AdminFeaturesManagement } from '@/features/feature/components/AdminFeaturesManagement'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ secret?: string }>
}

export default async function ProjectFeaturesAdminPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params
  const { secret } = await searchParams

  // Validate admin secret
  if (!validateAdminSecret(secret)) {
    return <UnauthorizedPage />
  }

  // Verify project exists
  const project = await getProjectById(id)
  if (!project) {
    notFound()
  }

  // Fetch existing features
  const features = await getFeaturesByProjectId(id)

  return (
    <main className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <Link
          href={`/projects/${id}?secret=${secret}`}
          className="text-muted-foreground hover:text-foreground mb-8 inline-block text-sm transition-colors"
        >
          ← Back to Project detail
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Features Showcase Management
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage, upload media, and order showcase features for{' '}
            <span className="font-semibold text-foreground">{project.title}</span>
          </p>
        </div>

        <AdminFeaturesManagement
          projectId={id}
          secret={secret || ''}
          initialFeatures={features.map((f) => ({
            ...f,
            created_at: f.created_at.toISOString(),
            updated_at: f.updated_at.toISOString(),
            media: f.media.map((m) => ({
              ...m,
              created_at: m.created_at.toISOString(),
            })),
          }))}
        />
      </div>
    </main>
  )
}
