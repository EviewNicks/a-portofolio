import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSecret } from '@/features/projects/utils/timeline'
import { deleteFeatureMediaFromStorage } from '@/features/features/services/media/api'
import { deleteFeatureMedia } from '@/lib/supabase/queries/features'
import prisma from '@/prisma/lib/client'

type Params = { params: Promise<{ id: string }> }

/**
 * DELETE /api/features/media/[id]
 *
 * Delete a feature media record and its associated file from storage.
 * Requirements: 3.6, 3.7, 10.1, 10.2, 10.3, 10.4, 10.7
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  // Admin authentication
  const secret =
    request.headers.get('x-admin-secret') ??
    request.nextUrl.searchParams.get('secret') ??
    ''

  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params

    // Get media record to retrieve storage_path before deletion
    const media = await prisma.projectFeatureMedia.findUnique({
      where: { id },
    })

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    // Delete from storage first (Requirement 3.7: remove file before deleting database record)
    // Use graceful degradation - log errors but don't fail the operation
    try {
      await deleteFeatureMediaFromStorage(media.storage_path)
    } catch (error) {
      console.error(
        `[DELETE /api/features/media/${id}] Storage cleanup failed:`,
        error
      )
      // Continue with database deletion even if storage cleanup fails
    }

    // Delete database record
    await deleteFeatureMedia(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }
    console.error('[DELETE /api/features/media/[id]]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
