'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  LayoutDashboard,
  FolderOpen,
  ArrowLeft,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { path: '/admin/projects', label: 'Projects', icon: FolderOpen, exact: false },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Runs after mount to avoid hydration mismatch — setState inside a timer
    // is the lint-safe way to update state from an effect
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
    >
      {mounted ? (
        theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />
      ) : (
        <Moon size={16} />
      )}
    </button>
  );
}

function SidebarContent({
  collapsed,
  secret,
  pathname,
}: {
  collapsed: boolean;
  secret: string;
  pathname: string;
}) {
  const adminUrl = (path: string) => `${path}?secret=${secret}`;

  return (
    <div className="flex flex-col h-full">
      {/* Logo / Brand */}
      <div className={`p-4 border-b border-border flex items-center ${collapsed ? 'justify-center' : 'gap-2'}`}>
        {!collapsed && (
          <span className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Admin Panel
          </span>
        )}
        {collapsed && (
          <span className="text-xs font-bold text-primary">A</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        {NAV_LINKS.map(({ path, label, icon: Icon, exact }) => {
          const active = exact ? pathname === path : pathname.startsWith(path);
          return (
            <Link
              key={path}
              href={adminUrl(path)}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                ${collapsed ? 'justify-center' : ''}
                ${active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                }`}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Back to portfolio */}
      <div className="p-2 border-t border-border">
        <Link
          href="/"
          title={collapsed ? 'Back to Portfolio' : undefined}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <ArrowLeft size={16} className="shrink-0" />
          {!collapsed && <span>Back to Portfolio</span>}
        </Link>
      </div>
    </div>
  );
}

function AdminLayoutInner({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret') ?? '';

  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('admin-sidebar-collapsed') === 'true';
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('admin-sidebar-collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 bg-sidebar border-r border-border transition-all duration-200 shrink-0
          ${collapsed ? 'w-16' : 'w-64'}`}
      >
        <SidebarContent collapsed={collapsed} secret={secret} pathname={pathname} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 px-4 h-14 bg-background/80 backdrop-blur-md border-b border-border">
          {/* Bubble toggle — desktop collapse, mobile sheet trigger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open sidebar"
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors shadow-sm"
                >
                  <LayoutDashboard size={16} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-sidebar border-border">
                <SidebarContent collapsed={false} secret={secret} pathname={pathname} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop collapse bubble */}
          <button
            onClick={toggleCollapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors shadow-sm"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          <span className="flex-1 text-sm font-medium text-foreground">
            Admin Panel
          </span>

          <ThemeToggle />
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  );
}
