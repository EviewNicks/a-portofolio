'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionIndicatorProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export function SectionIndicator({ sections, activeSection, onSectionClick }: SectionIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => onSectionClick(`#${section.id}`)}
            className="group relative flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Dot indicator */}
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-primary border-primary scale-125'
                  : 'bg-transparent border-muted-foreground hover:border-primary'
              }`}
            />
            
            {/* Label tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-6 px-3 py-1 bg-background border border-border rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
            >
              {section.label}
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}