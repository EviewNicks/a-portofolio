import { NextRequest, NextResponse } from 'next/server'
import {
  getFeaturesByProjectId,
  createFeature,
} from '@/lib/supabase/queries/features'
import { validateFeatureInput } from '@/features/utils/validation'
import { validateAdminSecret } from '@/features/projects/utils/timeline'

type Params = { params: Promise<{ id: string }> }

// GET /api/projects/[id]/features
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const features = await getFeaturesByProjectId(id)
    return NextResponse.json({ data: features })
  } catch (error) {
    console.error('[GET /api/projects/[id]/features]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/projects/[id]/features
export async function POST(request: NextRequest, { params }: Params) {
  const secret =
    request.headers.get('x-admin-secret') ??
    request.nextUrl.searchParams.get('secret') ??
    ''
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    const validation = validateFeatureInput(body)
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    const feature = await createFeature({
      project_id: id,
      title: body.title.trim(),
      description: body.description?.trim() ?? null,
      youtube_url: body.youtube_url?.trim() ?? null,
      tech_stack: Array.isArray(body.tech_stack) ? body.tech_stack : [],
      display_order:
        typeof body.display_order === 'number' ? body.display_order : 0,
      is_featured:
        typeof body.is_featured === 'boolean' ? body.is_featured : false,
      demo_url: body.demo_url?.trim() ?? null,
    })

    return NextResponse.json({ data: feature }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/projects/[id]/features]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
