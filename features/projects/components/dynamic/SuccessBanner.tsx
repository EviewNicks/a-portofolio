'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, X } from 'lucide-react'

interface SuccessBannerProps {
  projectTitle: string
  show: boolean
}

export function SuccessBanner({ projectTitle, show }: SuccessBannerProps) {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    setVisible(show)
  }, [show])

  if (!visible) return null

  return (
    <div
      data-testid="success-banner"
      className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400"
    >
      <CheckCircle2 size={16} className="shrink-0" />
      <span className="flex-1">
        Project <strong>{projectTitle}</strong> berhasil dibuat.
      </span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="transition-opacity hover:opacity-70"
      >
        <X size={14} />
      </button>
    </div>
  )
}
