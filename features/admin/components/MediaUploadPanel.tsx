'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ImageIcon, Trash2, Upload } from 'lucide-react';
import type { ProjectMedia } from '@/features/projects/types';

interface MediaUploadPanelProps {
  projectId: string;
  secret: string;
  initialMedia: ProjectMedia[];
}

const ACCEPTED = 'image/jpeg,image/png,image/webp';
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function MediaUploadPanel({
  projectId,
  secret,
  initialMedia,
}: MediaUploadPanelProps) {
  const [media, setMedia] = useState<ProjectMedia[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Client-side validation
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Only JPEG, PNG, and WebP images are allowed.');
      return;
    }
    if (file.size > MAX_SIZE) {
      setError('File size must be 5MB or less.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('project_id', projectId);
      formData.append('secret', secret);

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Upload failed.');
        return;
      }
      setMedia((prev) => [...prev, data.data as ProjectMedia]);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/media/${id}?secret=${secret}`, { method: 'DELETE' });
      setMedia((prev) => prev.filter((m) => m.id !== id));
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ImageIcon size={18} className="text-gray-400" />
        <h3 className="text-base font-semibold text-white">Screenshots</h3>
      </div>

      {/* Upload button */}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          onChange={handleFileChange}
          className="hidden"
          id="media-upload-input"
        />
        <label
          htmlFor="media-upload-input"
          data-testid="btn-upload-screenshot"
          className={`inline-flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm cursor-pointer transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <Upload size={14} />
          {uploading ? 'Uploading...' : 'Upload Screenshot'}
        </label>
        <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP · max 5MB</p>
      </div>

      {error && (
        <p data-testid="upload-error" className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Gallery grid */}
      {media.length === 0 ? (
        <p className="text-sm text-gray-500">No screenshots uploaded yet.</p>
      ) : (
        <div data-testid="media-gallery" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {media.map((item) => (
            <div key={item.id} data-testid="media-item" className="relative group rounded-lg overflow-hidden bg-gray-800 aspect-video">
              <Image
                src={item.public_url}
                alt={item.file_name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => setConfirmDeleteId(item.id)}
                  data-testid="btn-delete-media"
                  className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/60 text-xs text-gray-300 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                {item.file_name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDeleteId && (
        <div data-testid="delete-media-modal" className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm w-full mx-4 space-y-4">
            <h3 className="font-semibold text-white">Delete Screenshot?</h3>
            <p className="text-sm text-gray-400">This will permanently remove the image. This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={() => handleDelete(confirmDeleteId)} data-testid="btn-confirm-delete-media" className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
