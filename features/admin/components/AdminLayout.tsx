'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  LayoutDashboard,
  FolderOpen,
  ArrowLeft,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface AdminLayoutProps {
  children: React.ReactNode
}

const NAV_LINKS = [
  { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Runs after mount to avoid hydration mismatch — setState inside a timer
    // is the lint-safe way to update state from an effect
    const id = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg p-2 transition-colors"
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
  )
}

function SidebarContent({
  collapsed,
  secret,
  pathname,
}: {
  collapsed: boolean
  secret: string
  pathname: string
}) {
  const adminUrl = (path: string) => `${path}?secret=${secret}`

  return (
    <div className="flex h-full flex-col">
      {/* Logo / Brand */}
      <div
        className={`border-border flex items-center border-b p-4 ${collapsed ? 'justify-center' : 'gap-2'}`}
      >
        {!collapsed && (
          <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            Admin Panel
          </span>
        )}
        {collapsed && <span className="text-primary text-xs font-bold">A</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-2">
        {NAV_LINKS.map(({ path, label, icon: Icon, exact }) => {
          const active = exact ? pathname === path : pathname.startsWith(path)
          return (
            <Link
              key={path}
              href={adminUrl(path)}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${collapsed ? 'justify-center' : ''} ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Back to portfolio */}
      <div className="border-border border-t p-2">
        <Link
          href="/"
          title={collapsed ? 'Back to Portfolio' : undefined}
          className={`text-muted-foreground hover:text-foreground hover:bg-foreground/5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <ArrowLeft size={16} className="shrink-0" />
          {!collapsed && <span>Back to Portfolio</span>}
        </Link>
      </div>
    </div>
  )
}

function AdminLayoutInner({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const secret = searchParams.get('secret') ?? ''

  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydration-safe: load collapsed state after mount
  useEffect(() => {
    const stored = localStorage.getItem('admin-sidebar-collapsed') === 'true'
    setCollapsed(stored)
    setMounted(true)
  }, [])

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      const next = !prev
      localStorage.setItem('admin-sidebar-collapsed', String(next))
      return next
    })
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={`bg-sidebar border-border sticky top-0 hidden h-screen shrink-0 flex-col border-r transition-all duration-200 lg:flex ${collapsed ? 'w-16' : 'w-64'}`}
      >
        <SidebarContent
          collapsed={collapsed}
          secret={secret}
          pathname={pathname}
        />
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="bg-background/80 border-border sticky top-0 z-20 flex h-14 items-center gap-3 border-b px-4 backdrop-blur-md">
          {/* Bubble toggle — desktop collapse, mobile sheet trigger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open sidebar"
                  className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full p-2 shadow-sm transition-colors"
                >
                  <LayoutDashboard size={16} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-sidebar border-border w-64 p-0"
              >
                <SidebarContent
                  collapsed={false}
                  secret={secret}
                  pathname={pathname}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop collapse bubble */}
          <button
            onClick={toggleCollapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="bg-primary/10 text-primary hover:bg-primary/20 hidden rounded-full p-2 shadow-sm transition-colors lg:flex"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          <span className="text-foreground flex-1 text-sm font-medium">
            Admin Panel
          </span>

          <ThemeToggle />
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  )
}
