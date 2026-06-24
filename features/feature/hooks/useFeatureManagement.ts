'use client'

import { useState } from 'react'
import type { ProjectFeature } from '@/features/projects/types'

interface UseFeatureManagementOptions {
  projectId: string
  secret: string
  initialFeatures: ProjectFeature[]
  initialEditFeatureId?: string
}

export function useFeatureManagement({
  projectId,
  secret,
  initialFeatures,
  initialEditFeatureId,
}: UseFeatureManagementOptions) {
  const initialEditFeature = initialEditFeatureId
    ? initialFeatures.find(item => item.id === initialEditFeatureId) ?? null
    : null

  // Feature list state
  const [features, setFeatures] = useState<ProjectFeature[]>(initialFeatures)
  const [error, setError] = useState('')
  const [isSavingOrder, setIsSavingOrder] = useState(false)

  // Modal / panel visibility state
  const [showForm, setShowForm] = useState(Boolean(initialEditFeature))
  const [editFeature, setEditFeature] = useState<ProjectFeature | null>(
    initialEditFeature
  )
  const [mediaUploadFeature, setMediaUploadFeature] =
    useState<ProjectFeature | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  // Drag-and-drop reorder state
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)

  // ─── Panel actions ────────────────────────────────────────────────────────

  const openAdd = () => {
    setEditFeature(null)
    setMediaUploadFeature(null)
    setError('')
    setShowForm(true)
  }

  const openEdit = (feature: ProjectFeature) => {
    setEditFeature(feature)
    setMediaUploadFeature(null)
    setError('')
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditFeature(null)
  }

  const openMediaUpload = (feature: ProjectFeature) => {
    setMediaUploadFeature(feature)
    setShowForm(false)
    setEditFeature(null)
  }

  const closeMediaUpload = () => {
    setMediaUploadFeature(null)
  }

  // ─── CRUD handlers ────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `/api/projects/${projectId}/features/${id}?secret=${secret}`,
        { method: 'DELETE' }
      )
      if (res.ok) {
        setFeatures(prev => prev.filter(f => f.id !== id))
      } else {
        const errData = await res.json().catch(() => ({}))
        setError(errData.error ?? 'Failed to delete feature.')
      }
    } catch {
      setError('Network error. Failed to delete feature.')
    } finally {
      setConfirmDeleteId(null)
    }
  }

  const handleFormSubmitSuccess = (savedFeature: ProjectFeature) => {
    if (editFeature) {
      // Preserve existing media when updating feature metadata
      setFeatures(prev =>
        prev.map(f =>
          f.id === savedFeature.id ? { ...savedFeature, media: f.media } : f
        )
      )
    } else {
      setFeatures(prev => [...prev, { ...savedFeature, media: [] }])
    }
    closeForm()
  }

  const handleMediaClose = (
    featureId: string,
    updatedMedia: ProjectFeature['media']
  ) => {
    setFeatures(prev =>
      prev.map(f =>
        f.id === featureId ? { ...f, media: updatedMedia } : f
      )
    )
    closeMediaUpload()
  }

  // ─── Drag-and-drop reorder ────────────────────────────────────────────────

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggingIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    if (draggingIndex === null || draggingIndex === targetIndex) return

    const updated = [...features]
    const [removed] = updated.splice(draggingIndex, 1)
    updated.splice(targetIndex, 0, removed)

    // Reassign display_order (1-based)
    const reordered = updated.map((item, idx) => ({
      ...item,
      display_order: idx + 1,
    }))

    setFeatures(reordered)
    setDraggingIndex(null)
    setIsSavingOrder(true)
    setError('')

    try {
      const res = await fetch(
        `/api/projects/${projectId}/features/reorder?secret=${secret}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            reordered.map(item => ({
              id: item.id,
              display_order: item.display_order,
            }))
          ),
        }
      )
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        setError(errData.error ?? 'Failed to save display order.')
      }
    } catch {
      setError('Network error. Failed to save display order.')
    } finally {
      setIsSavingOrder(false)
    }
  }

  return {
    // State
    features,
    error,
    isSavingOrder,
    showForm,
    editFeature,
    mediaUploadFeature,
    confirmDeleteId,
    draggingIndex,

    // Setters (for inline UI like confirmDeleteId)
    setConfirmDeleteId,
    setError,

    // Panel actions
    openAdd,
    openEdit,
    closeForm,
    openMediaUpload,
    closeMediaUpload,

    // Handlers
    handleDelete,
    handleFormSubmitSuccess,
    handleMediaClose,
    handleDragStart,
    handleDragOver,
    handleDrop,
  }
}
