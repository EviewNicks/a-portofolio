'use client'

import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Initialize theme statically as 'system' first to match SSR
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  // Retrieve saved theme on mount
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setTheme(savedTheme)
      }
    }
    setMounted(true)
  }, [])

  // Get resolved theme (actual theme being used)
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  // Update theme and apply changes
  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme)
    
    const actualTheme = newTheme === 'system' ? getSystemTheme() : newTheme
    
    // Update document class and localStorage
    if (typeof document !== 'undefined' && typeof localStorage !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(actualTheme)
      localStorage.setItem('theme', newTheme)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    updateTheme(newTheme)
  }, [theme, updateTheme])

  return {
    theme,
    resolvedTheme,
    setTheme: updateTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    mounted
  }
}