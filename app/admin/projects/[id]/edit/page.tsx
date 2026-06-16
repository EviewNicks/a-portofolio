'use client'

import { useState, useEffect } from 'react'
import { AdminProjectForm } from '@/features/admin/components/AdminProjectForm'
import type { DynamicProject } from '@/features/projects/types'

interface PageParams {
  params: Promise<{ id: string }>
}

function getSecret() {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get('secret') ?? ''
}

export default function EditProjectPage({ params }: PageParams) {
  const [project, setProject] = useState<DynamicProject | null>(null)
  const [loading, setLoading] = useState(true)
  const secret = getSecret()

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/projects/${id}`)
        .then(r => (r.ok ? r.json() : null))
        .then(response => {
          setProject(response?.data ?? null)
        })
        .finally(() => setLoading(false))
    })
  }, [params])

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-gray-500">Loading...</div>
    )
  }

  if (!project) {
    return (
      <div className="py-16 text-center text-sm text-gray-500">
        Project not found.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Project</h1>
        <p className="mt-1 text-sm text-gray-400">{project.title}</p>
      </div>
      <AdminProjectForm secret={secret} project={project} />
    </div>
  )
}
