'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ExperienceEntry } from '@/lib/types/portfolio';
import { GlassCard } from '@/components/common';

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number;
  isLast?: boolean;
  className?: string;
}

/**
 * TimelineEntry Component
 * 
 * Individual timeline entry with expandable details
 * 
 * Features:
 * - Experience information display with technologies
 * - Visual indicators for different experience types
 * - Expandable details and achievements
 * - Status indicators (current/completed)
 * - Responsive timeline design
 * - Smooth animations and hover effects
 */
export const TimelineEntry: React.FC<TimelineEntryProps> = ({
  entry,
  index,
  isLast = false,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'work':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'project':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'education':
        return '🎓';
      case 'work':
        return '💼';
      case 'project':
        return '🚀';
      default:
        return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const formatTypeName = (type: string) => {
    switch (type) {
      case 'education':
        return 'Education';
      case 'work':
        return 'Work';
      case 'project':
        return 'Project';
      default:
        return type;
    }
  };

  const formatStatusName = (status: string) => {
    switch (status) {
      case 'current':
        return 'Current';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={cn('relative flex items-start space-x-4', className)}
    >
      {/* Timeline Line and Icon */}
      <div className="flex flex-col items-center">
        {/* Timeline Icon */}
        <div className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center text-xl',
          'bg-primary text-primary-foreground shadow-lg',
          'border-4 border-background'
        )}>
          {getTypeIcon(entry.type)}
        </div>
        
        {/* Timeline Line */}
        {!isLast && (
          <div className="w-0.5 h-16 bg-border mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <GlassCard
          variant="light"
          hover
          className="p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {entry.title}
                </h3>
                <p className="text-lg text-primary font-semibold">
                  {entry.organization}
                </p>
                <p className="text-sm text-muted-foreground">
                  {entry.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground mb-2">
                  {entry.date}
                </p>
                <div className="flex flex-col space-y-1">
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getTypeColor(entry.type))}>
                    {formatTypeName(entry.type)}
                  </span>
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(entry.status))}>
                    {formatStatusName(entry.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {entry.description}
            </p>
          </div>

          {/* Technologies Preview */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {entry.technologies.slice(0, 4).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-muted/30 text-foreground text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
              {entry.technologies.length > 4 && (
                <span className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-md">
                  +{entry.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-border/50 pt-4 mt-4"
              >
                {/* Details */}
                {entry.details.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Key Responsibilities</h4>
                    <ul className="space-y-1">
                      {entry.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-muted-foreground text-sm flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {entry.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {entry.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="text-muted-foreground text-sm flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* All Technologies */}
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-1">
                    {entry.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-muted/30 text-foreground text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand/Collapse Indicator */}
          <div className="flex justify-center mt-4 pt-4 border-t border-border/50">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default TimelineEntry;