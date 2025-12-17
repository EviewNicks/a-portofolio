'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'button' | 'switch' | 'dropdown'
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { scale: 1, rotate: 0 },
  exit: { scale: 0, rotate: 180 }
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className, 
  size = 'md', 
  variant = 'button' 
}) => {
  const { theme, toggleTheme, setTheme } = useTheme()

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={iconSizes[size]} />
      case 'dark':
        return <Moon size={iconSizes[size]} />
      case 'system':
        return <Monitor size={iconSizes[size]} />
      default:
        return <Moon size={iconSizes[size]} />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode'
      case 'dark':
        return 'Switch to system mode'
      case 'system':
        return 'Switch to light mode'
      default:
        return 'Toggle theme'
    }
  }

  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={cn(
          sizeClasses[size],
          'relative overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300',
          className
        )}
        title={getLabel()}
      >
        <motion.div
          key={theme}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {getIcon()}
        </motion.div>
      </Button>
    )
  }

  if (variant === 'switch') {
    return (
      <div className={cn('flex items-center space-x-3', className)}>
        <span className="text-sm text-slate-300">Theme:</span>
        <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1">
          {(['light', 'dark', 'system'] as const).map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={cn(
                'p-2 rounded-md transition-all duration-200',
                theme === themeOption
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              )}
              title={`Switch to ${themeOption} mode`}
            >
              {themeOption === 'light' && <Sun size={16} />}
              {themeOption === 'dark' && <Moon size={16} />}
              {themeOption === 'system' && <Monitor size={16} />}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return null
}

// Floating theme toggle for corner placement
export const FloatingThemeToggle: React.FC<{ position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' }> = ({ 
  position = 'top-right' 
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  }

  return (
    <motion.div
      className={cn('fixed z-50', positionClasses[position])}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ThemeToggle size="lg" />
    </motion.div>
  )
}