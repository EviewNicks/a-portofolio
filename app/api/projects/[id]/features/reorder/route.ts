import { NextRequest, NextResponse } from 'next/server'
import { updateFeatureDisplayOrder } from '@/lib/supabase/queries/features'
import { validateAdminSecret } from '@/features/projects/utils/timeline'

// PUT /api/projects/[id]/features/reorder
export async function PUT(request: NextRequest) {
  const secret =
    request.headers.get('x-admin-secret') ??
    request.nextUrl.searchParams.get('secret') ??
    ''
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Expected an array of updates' },
        { status: 400 }
      )
    }

    // Validate that each item has id and display_order
    for (const item of body) {
      if (
        typeof item !== 'object' ||
        !item.id ||
        typeof item.display_order !== 'number'
      ) {
        return NextResponse.json(
          {
            error:
              'Each update item must contain id (string) and display_order (number)',
          },
          { status: 400 }
        )
      }
    }

    await updateFeatureDisplayOrder(
      body.map(item => ({
        id: item.id,
        display_order: item.display_order,
      }))
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PUT /api/projects/[id]/features/reorder]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
