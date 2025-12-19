'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/common';

const shortcuts = [
  { key: '↑ / K', description: 'Navigate to previous section' },
  { key: '↓ / J', description: 'Navigate to next section' },
  { key: 'Home', description: 'Go to top of page' },
  { key: 'End', description: 'Go to bottom of page' },
  { key: 'Esc', description: 'Close menus / blur focus' },
  { key: '?', description: 'Show/hide this help' },
];

export function KeyboardShortcuts() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle help with '?' key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '?' && !event.ctrlKey && !event.metaKey) {
        const target = event.target as HTMLElement;
        // Don't trigger if user is typing in an input
        if (
          target.tagName !== 'INPUT' &&
          target.tagName !== 'TEXTAREA' &&
          target.contentEditable !== 'true'
        ) {
          event.preventDefault();
          setIsVisible(prev => !prev);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Help Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-8 z-40 hidden lg:block"
      >
        <Button
          onClick={() => setIsVisible(true)}
          size="icon"
          variant="outline"
          className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-border hover:bg-accent"
          title="Keyboard shortcuts (?)"
        >
          <Keyboard size={20} />
        </Button>
      </motion.div>

      {/* Shortcuts Modal */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsVisible(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-md"
            >
              <GlassCard variant="medium" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    Keyboard Shortcuts
                  </h3>
                  <Button
                    onClick={() => setIsVisible(false)}
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                  >
                    <X size={16} />
                  </Button>
                </div>

                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={shortcut.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-sm text-muted-foreground">
                        {shortcut.description}
                      </span>
                      <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border">
                        {shortcut.key}
                      </kbd>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Press <kbd className="px-1 py-0.5 text-xs font-mono bg-muted rounded">?</kbd> to toggle this help
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}