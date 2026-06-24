'use client'

import { useState, useRef } from 'react'
import type { ProjectFeatureMedia } from '@/features/projects/types'
import { validateMediaFile } from '@/features/utils/validation'

interface UseFeatureMediaUploadOptions {
  projectId: string
  featureId: string
  secret: string
  initialMedia: ProjectFeatureMedia[]
}

export function useFeatureMediaUpload({
  projectId,
  featureId,
  secret,
  initialMedia,
}: UseFeatureMediaUploadOptions) {
  const [media, setMedia] = useState<ProjectFeatureMedia[]>(initialMedia)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadFile = async (file: File) => {
    setError('')

    // Client-side validation: Max 20 images
    if (media.length >= 20) {
      setError('Maximum limit of 20 images reached.')
      return
    }

    // Validate type and size (10MB limit)
    const validationError = validateMediaFile(file.type, file.size)
    if (validationError) {
      setError(validationError)
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('feature_id', featureId)
      formData.append('secret', secret)

      const res = await fetch(
        `/api/projects/${projectId}/features/media/upload?secret=${secret}`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Upload failed.')
        return
      }

      const newMedia = data.data as ProjectFeatureMedia
      setMedia(prev => [...prev, newMedia])
    } catch {
      setError('Network error. Failed to upload image.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUploadFile(file)
    }
  }

  const handleDelete = async (id: string) => {
    setError('')
    try {
      const res = await fetch(
        `/api/projects/${projectId}/features/media/${id}?secret=${secret}`,
        { method: 'DELETE' }
      )
      if (res.ok) {
        setMedia(prev => prev.filter(m => m.id !== id))
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Failed to delete image.')
      }
    } catch {
      setError('Network error. Failed to delete image.')
    } finally {
      setConfirmDeleteId(null)
    }
  }

  // HTML5 Drag and drop files upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDropFiles = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0])
    }
  }

  // HTML5 Drag and drop thumbnails to reorder (client-side)
  const handleThumbDragStart = (e: React.DragEvent, index: number) => {
    setDraggingIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleThumbDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleThumbDrop = (e: React.DragEvent, targetIndex: number) => {
    if (draggingIndex === null || draggingIndex === targetIndex) return

    const updated = [...media]
    const [removed] = updated.splice(draggingIndex, 1)
    updated.splice(targetIndex, 0, removed)

    // Reassign local display_order for ordering
    const reordered = updated.map((m, idx) => ({
      ...m,
      display_order: idx + 1,
    }))

    setMedia(reordered)
    setDraggingIndex(null)
  }

  return {
    media,
    uploading,
    dragActive,
    draggingIndex,
    error,
    confirmDeleteId,
    fileInputRef,
    setConfirmDeleteId,
    setError,
    handleFileChange,
    handleDelete,
    handleDrag,
    handleDropFiles,
    handleThumbDragStart,
    handleThumbDragOver,
    handleThumbDrop,
  }
}
