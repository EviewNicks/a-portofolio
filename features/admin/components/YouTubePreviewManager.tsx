'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Youtube, Check, X, Search } from 'lucide-react';
import type { YouTubePreview } from '@/features/projects/types';

interface YouTubePreviewManagerProps {
  projectId: string;
  secret: string;
}

export function YouTubePreviewManager({
  projectId,
  secret,
}: YouTubePreviewManagerProps) {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState<YouTubePreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePreview = async () => {
    setError('');
    setPreview(null);
    setSuccess('');
    if (!url.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/youtube/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Failed to fetch video preview.');
        return;
      }
      setPreview(data);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!preview) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(
        `/api/projects/${projectId}/timeline?secret=${secret}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            project_id: projectId,
            entry_type: 'video',
            title: preview.title,
            date: new Date().toISOString(),
            sprint_number: 1,
            external_url: preview.url,
            media_preview: preview.thumbnail_url,
            is_featured: false,
          }),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Failed to save video entry.');
        return;
      }
      setSuccess(`"${preview.title}" added to timeline.`);
      setPreview(null);
      setUrl('');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReject = () => {
    setPreview(null);
    setUrl('');
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Youtube size={18} className="text-red-400" />
        <h3 className="text-base font-semibold text-white">YouTube Preview</h3>
      </div>

      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePreview()}
          placeholder="https://www.youtube.com/watch?v=..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handlePreview}
          disabled={loading || !url.trim()}
          className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          <Search size={14} />
          {loading ? 'Loading...' : 'Preview'}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-2 rounded-lg">
          {success}
        </p>
      )}

      {preview && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex gap-4 p-4">
            <div className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-800">
              <Image
                src={preview.thumbnail_url}
                alt={preview.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <p className="text-sm font-medium text-white line-clamp-2">
                {preview.title}
              </p>
              <p className="text-xs text-gray-500">
                {parseInt(preview.view_count).toLocaleString()} views
              </p>
              <p className="text-xs text-gray-600 truncate">{preview.url}</p>
            </div>
          </div>
          <div className="flex gap-2 px-4 pb-4">
            <button
              onClick={handleApprove}
              disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              <Check size={14} /> {saving ? 'Adding...' : 'Approve & Add'}
            </button>
            <button
              onClick={handleReject}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
            >
              <X size={14} /> Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
