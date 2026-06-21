'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/features/projects/types'

const STATUS_OPTIONS: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'archived', label: 'Archived' },
]

export function DynamicProjectFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentStatus = searchParams.get('status') ?? 'all'
  const currentQuery = searchParams.get('query') ?? ''

  // Local state for search input to avoid router calls on every keystroke
  const [searchValue, setSearchValue] = useState(currentQuery)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounced search function
  const debouncedSearch = useCallback(
    (query: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }

      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (query && query.trim()) {
          params.set('query', query.trim())
        } else {
          params.delete('query')
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      }, 300) // 300ms debounce
    },
    [router, pathname, searchParams]
  )

  // Update search when user types
  useEffect(() => {
    if (searchValue !== currentQuery) {
      debouncedSearch(searchValue)
    }
  }, [searchValue, currentQuery, debouncedSearch])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
    }
  }, [])

  // Immediate update for status filter (no debouncing needed)
  function updateStatus(status: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (status && status !== 'all') {
      params.set('status', status)
    } else {
      params.delete('status')
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row">
      {/* Search */}
      <input
        type="text"
        placeholder="Search projects..."
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        data-testid="filter-search"
        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 flex-1 rounded-lg border px-4 py-2 text-sm focus:ring-1 focus:outline-none"
      />

      {/* Status filter */}
      <div className="flex gap-2">
        {STATUS_OPTIONS.map(opt => (
          <button
            key={`status-${opt.value}`}
            onClick={() => updateStatus(opt.value)}
            data-testid={`filter-status-${opt.value}`}
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              currentStatus === opt.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-background border-border text-muted-foreground hover:border-primary/30 hover:text-foreground border'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
