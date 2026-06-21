import { NextRequest, NextResponse } from 'next/server'
import {
  getFeatureById,
  updateFeature,
  deleteFeature,
} from '@/lib/supabase/queries/features'
import { validateFeatureInput } from '@/features/utils/validation'
import { validateAdminSecret } from '@/features/projects/utils/timeline'
import { Prisma } from '@/generated/prisma'

type Params = { params: Promise<{ id: string; featureId: string }> }

// GET /api/projects/[id]/features/[featureId]
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id, featureId } = await params
    const feature = await getFeatureById(featureId)
    if (!feature) {
      return NextResponse.json({ error: 'Feature not found' }, { status: 404 })
    }

    // Verify feature belongs to this project
    if (feature.project_id !== id) {
      return NextResponse.json({ error: 'Feature not found' }, { status: 404 })
    }

    return NextResponse.json({ data: feature })
  } catch (error) {
    console.error('[GET /api/projects/[id]/features/[featureId]]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id]/features/[featureId]
export async function PUT(request: NextRequest, { params }: Params) {
  const secret =
    request.headers.get('x-admin-secret') ??
    request.nextUrl.searchParams.get('secret') ??
    ''
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, featureId } = await params
    const body = await request.json()

    // Verify feature exists and belongs to this project
    const existingFeature = await getFeatureById(featureId)
    if (!existingFeature || existingFeature.project_id !== id) {
      return NextResponse.json({ error: 'Feature not found' }, { status: 404 })
    }

    // Partial validation — only validate fields that are present
    const toValidate = {
      title: body.title ?? 'placeholder',
      ...body,
    }
    const validation = validateFeatureInput(toValidate)
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    const updateData: Partial<{
      title: string
      short_description: string | null
      description: string | null
      youtube_url: string | null
      display_order: number
      is_featured: boolean
    }> = {}
    if (body.title !== undefined) updateData.title = body.title.trim()
    if (body.short_description !== undefined)
      updateData.short_description = body.short_description?.trim() ?? null
    if (body.description !== undefined)
      updateData.description = body.description?.trim() ?? null
    if (body.youtube_url !== undefined)
      updateData.youtube_url = body.youtube_url?.trim() ?? null
    if (body.display_order !== undefined)
      updateData.display_order = body.display_order
    if (body.is_featured !== undefined)
      updateData.is_featured = body.is_featured

    const feature = await updateFeature(featureId, updateData)
    return NextResponse.json({ data: feature })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Feature not found' }, { status: 404 })
    }
    console.error('[PUT /api/projects/[id]/features/[featureId]]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id]/features/[featureId]
export async function DELETE(request: NextRequest, { params }: Params) {
  const secret =
    request.headers.get('x-admin-secret') ??
    request.nextUrl.searchParams.get('secret') ??
    ''
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, featureId } = await params

    // Verify feature exists and belongs to this project
    const existingFeature = await getFeatureById(featureId)
    if (!existingFeature || existingFeature.project_id !== id) {
      return NextResponse.json({ error: 'Feature not found' }, { status: 404 })
    }

    await deleteFeature(featureId)
    return NextResponse.json({ success: true })
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Feature not found' }, { status: 404 })
    }
    console.error('[DELETE /api/projects/[id]/features/[featureId]]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
