'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, ArrowLeft } from 'lucide-react';

export function ProjectsNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-6xl h-14 flex items-center justify-between">
        {/* Left: back to portfolio */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={15} />
          Portfolio
        </Link>

        {/* Center: brand */}
        <Link href="/projects" className="text-sm font-semibold text-foreground">
          Projects
        </Link>

        {/* Right: theme toggle */}
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
      </div>
    </nav>
  );
}
