'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, ArrowLeft } from 'lucide-react'

interface ProjectsNavbarProps {
  projectTitle?: string
  showBackToProjects?: boolean
}

export function ProjectsNavbar({
  projectTitle,
  showBackToProjects = false,
}: ProjectsNavbarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  return (
    <nav className="border-line/40 bg-paper/95 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
        <div className="border-line flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Link
            key={showBackToProjects ? 'back-to-projects' : 'back-to-portfolio'}
            href={showBackToProjects ? '/projects' : '/'}
            className="font-editorial-tight text-ink-soft hover:text-coral focus-visible:ring-coral/40 inline-flex w-fit items-center gap-2 rounded-full px-1 py-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {showBackToProjects ? 'Back to Projects' : 'Back to Portfolio'}
          </Link>

          <nav aria-label="Breadcrumb" className="editorial-meta">
            <Link key="breadcrumb-home" href="/" className="hover:text-coral">
              Home
            </Link>
            <span className="text-coral px-2">·</span>
            <Link
              key="breadcrumb-projects"
              href="/projects"
              className="hover:text-coral"
            >
              Projects
            </Link>
            {projectTitle && (
              <>
                <span className="text-coral px-2">·</span>
                <span className="text-ink">{projectTitle}</span>
              </>
            )}
          </nav>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="text-ink-soft hover:text-ink hover:bg-ink/5 rounded-lg p-2 transition-colors"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )
            ) : (
              <Moon size={16} />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
