'use client'

import Image from 'next/image'
import { Trash2, Upload, AlertTriangle } from 'lucide-react'
import type { ProjectFeatureMedia } from '@/features/projects/types'
import { useFeatureMediaUpload } from '../hooks/useFeatureMediaUpload'

interface FeatureMediaUploadProps {
  projectId: string
  featureId: string
  secret: string
  initialMedia: ProjectFeatureMedia[]
  onClose: (updatedMedia: ProjectFeatureMedia[]) => void
}

export function FeatureMediaUpload({
  projectId,
  featureId,
  secret,
  initialMedia,
  onClose,
}: FeatureMediaUploadProps) {
  const {
    media,
    uploading,
    dragActive,
    draggingIndex,
    error,
    confirmDeleteId,
    fileInputRef,
    setConfirmDeleteId,
    handleFileChange,
    handleDelete,
    handleDrag,
    handleDropFiles,
    handleThumbDragStart,
    handleThumbDragOver,
    handleThumbDrop,
  } = useFeatureMediaUpload({
    projectId,
    featureId,
    secret,
    initialMedia,
  })

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Drag & Drop File Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDropFiles}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-line bg-paper hover:border-coral/50 hover:bg-paper-warm'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          disabled={uploading}
        />
        <div className="pointer-events-none flex flex-col items-center justify-center space-y-2">
          <div className="bg-bone text-ink-mute rounded-full p-3">
            <Upload size={24} />
          </div>
          <p className="text-ink text-sm font-semibold">
            {uploading
              ? 'Uploading your file...'
              : 'Drag & drop image here or click to browse'}
          </p>
          <p className="text-ink-mute text-xs">
            Supports JPEG, PNG, GIF, WebP up to 10MB (Max 20 images)
          </p>
        </div>
      </div>

      {/* Upload progress indicator */}
      {uploading && (
        <div className="text-ink-mute flex animate-pulse items-center gap-2 text-xs">
          <div className="bg-coral h-2 w-2 animate-ping rounded-full" />
          <span>Processing upload...</span>
        </div>
      )}

      {/* Gallery list */}
      <div>
        <h4 className="text-ink mb-3 text-sm font-bold">
          Gallery Thumbnails ({media.length}/20)
        </h4>

        {media.length === 0 ? (
          <p className="text-ink-mute text-sm italic">
            No images uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {media.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={e => handleThumbDragStart(e, index)}
                onDragOver={handleThumbDragOver}
                onDrop={e => handleThumbDrop(e, index)}
                className={`bg-bone border-line group relative aspect-square cursor-move overflow-hidden rounded-lg border transition-all select-none ${
                  draggingIndex === index ? 'border-primary opacity-30' : ''
                }`}
              >
                <Image
                  src={item.public_url}
                  alt={item.file_name}
                  fill
                  sizes="150px"
                  className="object-cover"
                  unoptimized
                />

                {/* Overlay actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="rounded-lg bg-coral p-1.5 text-white transition-colors hover:bg-[#e25e4a]"
                    title="Delete Image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="absolute right-0 bottom-0 left-0 truncate bg-black/60 px-1.5 py-0.5 text-[9px] text-gray-300">
                  {item.file_name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-border mt-6 flex justify-end border-t pt-4">
        <button
          type="button"
          onClick={() => onClose(media)}
          className="bg-coral text-white hover:bg-[#e25e4a] rounded-lg px-4 py-2 text-sm font-semibold transition-all"
        >
          Close & Save Gallery
        </button>
      </div>

      {/* Delete Image Confirmation */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="border-line bg-bone text-ink w-full max-w-sm space-y-4 rounded-xl border p-6 shadow-2xl">
            <h3 className="text-ink text-lg font-bold">Delete Image?</h3>
            <p className="text-ink-mute text-sm">
              Are you sure you want to permanently delete this image from
              Supabase storage? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-paper text-ink-soft hover:bg-paper-warm rounded-lg px-4 py-2 text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#e25e4a]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

