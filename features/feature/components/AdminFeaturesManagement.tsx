'use client'

import {
  Plus,
  Pencil,
  Trash2,
  X,
  GripVertical,
  Image as ImageIcon,
} from 'lucide-react'
import type { ProjectFeature } from '@/features/projects/types'
import { FeatureForm } from './FeatureForm'
import { FeatureMediaUpload } from './FeatureMediaUpload'
import { useFeatureManagement } from '../hooks/useFeatureManagement'

interface AdminFeaturesManagementProps {
  projectId: string
  secret: string
  initialFeatures: ProjectFeature[]
}

export function AdminFeaturesManagement({
  projectId,
  secret,
  initialFeatures,
}: AdminFeaturesManagementProps) {
  const {
    features,
    error,
    isSavingOrder,
    showForm,
    editFeature,
    mediaUploadFeature,
    confirmDeleteId,
    draggingIndex,
    setConfirmDeleteId,
    openAdd,
    openEdit,
    closeForm,
    openMediaUpload,
    closeMediaUpload,
    handleDelete,
    handleFormSubmitSuccess,
    handleMediaClose,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useFeatureManagement({
    projectId,
    secret,
    initialFeatures,
  })

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="border-border flex items-center justify-between border-b pb-4">
        <h2 className="text-foreground text-xl font-bold">
          Showcase Features ({features.length})
        </h2>
        <button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all"
        >
          <Plus size={16} /> Add Feature
        </button>
      </div>

      {features.length === 0 ? (
        <div className="border-border rounded-xl border border-dashed py-12 text-center">
          <p className="text-muted-foreground text-sm">
            No features showcased yet. Click &quot;Add Feature&quot; to begin.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              draggable
              onDragStart={e => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, index)}
              className={`border-border bg-card hover:bg-muted/30 flex items-center justify-between gap-4 rounded-xl border p-4 transition-all ${
                draggingIndex === index ? 'border-primary opacity-40' : ''
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="text-muted-foreground hover:text-foreground shrink-0 cursor-grab p-1">
                  <GripVertical size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground truncate font-semibold">
                      {feature.title}
                    </p>
                    {feature.is_featured && (
                      <span className="rounded border border-yellow-500/20 bg-yellow-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-600 dark:text-yellow-400">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                    <span>Order: {feature.display_order}</span>
                    <span>•</span>
                    <span>{feature.media?.length || 0} media files</span>
                    {feature.tech_stack.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex flex-wrap gap-1">
                          {feature.tech_stack.map(t => (
                            <span
                              key={t}
                              className="bg-foreground/5 py-0.2 border-border rounded-md border px-1.5 text-[10px]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => openMediaUpload(feature)}
                  title="Manage Media Gallery"
                  className="text-muted-foreground hover:bg-foreground/5 hover:text-foreground rounded-lg p-2 transition-all"
                >
                  <ImageIcon size={16} />
                </button>
                <button
                  onClick={() => openEdit(feature)}
                  title="Edit Feature details"
                  className="text-muted-foreground hover:bg-foreground/5 hover:text-foreground rounded-lg p-2 transition-all"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => setConfirmDeleteId(feature.id)}
                  title="Delete Feature"
                  className="text-muted-foreground rounded-lg p-2 transition-all hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isSavingOrder && (
        <div className="text-muted-foreground text-right text-xs italic">
          Saving display order...
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-card border-border flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border shadow-2xl">
            <div className="border-border flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-foreground text-lg font-bold">
                {editFeature ? 'Edit Showcase Feature' : 'Add Showcase Feature'}
              </h3>
              <button
                onClick={closeForm}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <FeatureForm
                projectId={projectId}
                secret={secret}
                feature={editFeature}
                onSuccess={handleFormSubmitSuccess}
                onCancel={closeForm}
              />
            </div>
          </div>
        </div>
      )}

      {/* Media Upload Modal */}
      {mediaUploadFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-card border-border flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border shadow-2xl">
            <div className="border-border flex items-center justify-between border-b px-6 py-4">
              <div>
                <h3 className="text-foreground text-lg font-bold">
                  Media Gallery: {mediaUploadFeature.title}
                </h3>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Upload up to 20 images. Drag & drop images to reorder them.
                </p>
              </div>
              <button
                onClick={closeMediaUpload}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <FeatureMediaUpload
                projectId={projectId}
                featureId={mediaUploadFeature.id}
                secret={secret}
                initialMedia={mediaUploadFeature.media || []}
                onClose={updatedMedia =>
                  handleMediaClose(mediaUploadFeature.id, updatedMedia)
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-card border-border w-full max-w-md space-y-4 rounded-xl border p-6 shadow-2xl">
            <h3 className="text-foreground text-lg font-bold">
              Delete Feature Showcase?
            </h3>
            <p className="text-muted-foreground text-sm">
              Are you sure you want to delete this feature showcase? This will
              permanently delete the feature data and all of its associated
              image records from storage. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-muted text-foreground hover:bg-muted/80 rounded-lg px-4 py-2 text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-500"
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

