'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface EditorialNavbarProps {
  pageTitle?: string
  showSideText?: boolean
  contactEmail?: string
}

const CONTACT_EMAIL = 'contact@ardiansyah.dev'

export function EditorialNavbar({
  pageTitle,
  showSideText = true,
  contactEmail = CONTACT_EMAIL,
}: EditorialNavbarProps) {
  return (
    <>
      {/* Editorial Side Text */}
      {showSideText && (
        <>
          <div
            className="border-line-faint fixed inset-y-0 left-0 z-30 hidden w-9 items-center justify-center border-r xl:flex"
            aria-hidden="true"
          >
            <span className="font-editorial-tight text-ink-faint text-[0.625rem] font-semibold tracking-[0.42em] uppercase [writing-mode:vertical-rl]">
              AI Research · Web Engineering · Precision · Cloud · Systems
            </span>
          </div>
          <div
            className="border-line-faint fixed inset-y-0 right-0 z-30 hidden w-9 items-center justify-center border-l xl:flex"
            aria-hidden="true"
          >
            <span className="font-editorial-tight text-ink-faint transform-[rotate(180deg)] text-[0.625rem] font-semibold tracking-[0.42em] uppercase [writing-mode:vertical-rl]">
              Ardiansyah — {pageTitle || 'Portfolio'} — Engineering the
              Essential
            </span>
          </div>
        </>
      )}

      {/* Header with Volume/Issue */}
      <header className="border-line bg-paper relative z-40 border-b">
        <div className="mx-auto max-w-340 px-16">
          <div className="font-editorial-tight text-ink-faint flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2 text-[0.65625rem] font-medium tracking-[0.18em] uppercase">
            <span>
              <strong className="text-ink font-semibold">Vol. 01</strong> /
              Issue Nº 01
            </span>
            <div className="hidden items-center gap-6 md:flex">
              <span>
                Filed under{' '}
                <span className="text-coral">AI · Web · Precision</span>
              </span>
              <span>
                <span className="editorial-pulse mr-1.5 inline-block" />
                Available for engagement
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>ID</span>
              <span>EN</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="bg-paper/95 sticky top-0 z-50 border-b border-transparent backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-340 items-center justify-between gap-6 px-16 py-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-editorial-tight text-ink flex shrink-0 items-center gap-3.5 text-lg font-bold tracking-[-0.01em]"
          >
            <span className="border-ink font-editorial-serif flex h-9 w-9 items-center justify-center rounded-full border text-base italic">
              A
            </span>
            Ardiansyah
            <span className="border-line font-editorial-tight text-ink-faint hidden border-l pl-4 text-[0.625rem] font-medium tracking-[0.18em] uppercase lg:block">
              <strong className="text-ink block">Precision Architect</strong>
              AI + Web
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="font-editorial-tight text-ink hidden items-center gap-9 text-sm font-medium md:flex">
            <li>
              <Link href="/" className="hover:text-coral transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/certificate"
                className="hover:text-coral transition-colors"
              >
                Certificates
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-coral transition-colors"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="hover:text-coral transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <span
              className="border-line flex h-10 w-10 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <span className="bg-coral h-2 w-2 rounded-full" />
            </span>
            <Link
              href={`mailto:${contactEmail}`}
              className="bg-ink font-editorial-tight text-paper hover:bg-ink-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              Let&apos;s talk <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
