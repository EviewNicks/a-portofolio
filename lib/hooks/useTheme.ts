'use client'

import { useState, useCallback } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Initialize theme from localStorage or default to system
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'
    const savedTheme = localStorage.getItem('theme') as Theme
    return savedTheme && ['light', 'dark', 'system'].includes(savedTheme) ? savedTheme : 'system'
  })

  // Get resolved theme (actual theme being used)
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  // Update theme and apply changes
  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme)
    
    const actualTheme = newTheme === 'system' ? getSystemTheme() : newTheme
    
    // Update document class and localStorage
    if (typeof document !== 'undefined') {
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
    isLight: resolvedTheme === 'light'
  }
}