'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import type { TimelineEntry, EntryType } from '@/features/projects/types';

const ENTRY_TYPES: EntryType[] = [
  'pr', 'milestone', 'blog_post', 'video', 'deployment', 'release',
];

interface TimelineManagementProps {
  projectId: string;
  secret: string;
  initialEntries: TimelineEntry[];
}

interface EntryFormState {
  entry_type: EntryType;
  date: string;
  sprint_number: string;
  title: string;
  description: string;
  external_url: string;
  is_featured: boolean;
}

const EMPTY_FORM: EntryFormState = {
  entry_type: 'milestone',
  date: new Date().toISOString().slice(0, 10),
  sprint_number: '1',
  title: '',
  description: '',
  external_url: '',
  is_featured: false,
};

export function TimelineManagement({
  projectId,
  secret,
  initialEntries,
}: TimelineManagementProps) {
  const [entries, setEntries] = useState<TimelineEntry[]>(initialEntries);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<EntryFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setError('');
    setShowForm(true);
  };

  const openEdit = (entry: TimelineEntry) => {
    setForm({
      entry_type: entry.entry_type,
      date: entry.date.slice(0, 10),
      sprint_number: String(entry.sprint_number),
      title: entry.title,
      description: entry.description ?? '',
      external_url: entry.external_url ?? '',
      is_featured: entry.is_featured,
    });
    setEditId(entry.id);
    setError('');
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const sprintNum = parseInt(form.sprint_number, 10);
    if (!form.title.trim()) { setError('Title is required.'); return; }
    if (isNaN(sprintNum) || sprintNum < 1) { setError('Sprint number must be ≥ 1.'); return; }

    setSaving(true);
    try {
      const body = {
        entry_type: form.entry_type,
        date: new Date(form.date).toISOString(),
        sprint_number: sprintNum,
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        external_url: form.external_url.trim() || undefined,
        is_featured: form.is_featured,
      };

      let res: Response;
      if (editId) {
        res = await fetch(
          `/api/projects/${projectId}/timeline/${editId}?secret=${secret}`,
          { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
        );
      } else {
        res = await fetch(
          `/api/projects/${projectId}/timeline?secret=${secret}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, project_id: projectId }) }
        );
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Failed to save entry.');
        return;
      }

      const saved: TimelineEntry = await res.json();
      if (editId) {
        setEntries((prev) => prev.map((e) => (e.id === editId ? saved : e)));
      } else {
        setEntries((prev) => [...prev, saved]);
      }
      setShowForm(false);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/projects/${projectId}/timeline/${id}?secret=${secret}`, { method: 'DELETE' });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const field = (key: keyof EntryFormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 data-testid="timeline-entries-heading" className="text-base font-semibold text-white">
          Timeline Entries ({entries.length})
        </h3>
        <button
          onClick={openAdd}
          data-testid="btn-add-entry"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
        >
          <Plus size={14} /> Add Entry
        </button>
      </div>

      {/* Entry list */}
      {entries.length === 0 ? (
        <p data-testid="timeline-entries-empty" className="text-sm text-gray-500 py-4">No timeline entries yet.</p>
      ) : (
        <div className="space-y-2">
          {[...entries]
            .sort((a, b) => a.sprint_number - b.sprint_number || new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((entry) => (
              <div key={entry.id} data-testid="entry-row" data-entry-id={entry.id} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 gap-3">
                <div className="min-w-0">
                  <p data-testid="entry-row-title" className="text-sm font-medium text-white truncate">{entry.title}</p>
                  <p className="text-xs text-gray-500">
                    Sprint {entry.sprint_number} · {entry.entry_type} · {new Date(entry.date).toLocaleDateString('id-ID')}
                    {entry.is_featured && <span className="ml-2 text-yellow-400">★ Featured</span>}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(entry)} data-testid="btn-edit-entry" className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => setConfirmDeleteId(entry.id)} data-testid="btn-delete-entry" className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Add/Edit form modal */}
      {showForm && (
        <div data-testid="entry-form-modal" className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <h4 className="font-semibold text-white">{editId ? 'Edit Entry' : 'Add Entry'}</h4>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && <p data-testid="entry-form-error" className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg">{error}</p>}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Type</label>
                  <select value={form.entry_type} onChange={(e) => field('entry_type', e.target.value as EntryType)}
                    data-testid="select-entry-type"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                    {ENTRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Sprint #</label>
                  <input type="number" min={1} value={form.sprint_number} onChange={(e) => field('sprint_number', e.target.value)}
                    data-testid="input-sprint-number"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">Date</label>
                <input type="date" value={form.date} onChange={(e) => field('date', e.target.value)}
                  data-testid="input-entry-date"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">Title *</label>
                <input type="text" value={form.title} onChange={(e) => field('title', e.target.value)} required
                  data-testid="input-entry-title"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">Description</label>
                <textarea value={form.description} onChange={(e) => field('description', e.target.value)} rows={3}
                  data-testid="input-entry-description"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-y" />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">External URL</label>
                <input type="url" value={form.external_url} onChange={(e) => field('external_url', e.target.value)}
                  placeholder="https://..."
                  data-testid="input-entry-url"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => field('is_featured', e.target.checked)}
                  data-testid="checkbox-featured"
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500" />
                <span className="text-sm text-gray-300">Featured entry</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  data-testid="btn-save-entry"
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  <Check size={14} /> {saving ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  data-testid="btn-cancel-entry"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDeleteId && (
        <div data-testid="delete-entry-modal" className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm w-full mx-4 space-y-4">
            <h3 className="font-semibold text-white">Delete Entry?</h3>
            <p className="text-sm text-gray-400">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDeleteId(null)} data-testid="btn-cancel-delete-entry" className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={() => handleDelete(confirmDeleteId)} data-testid="btn-confirm-delete-entry" className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
