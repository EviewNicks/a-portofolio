'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectFilters as ProjectFiltersType } from '@/lib/types/portfolio';

interface ProjectFiltersProps {
  filters: ProjectFiltersType;
  activeCategory: string;
  activeStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  className?: string;
}

/**
 * ProjectFilters Component
 * 
 * Filtering system for projects by category and status
 * 
 * Features:
 * - Category filtering with counts
 * - Status filtering with smooth transitions
 * - Active state indicators
 * - Responsive button layouts
 * - Animated filter changes
 */
export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  activeCategory,
  activeStatus,
  onCategoryChange,
  onStatusChange,
  className,
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Category Filters */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {filters.categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                'border border-border/50 hover:border-primary/50',
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background/50 text-foreground hover:bg-primary/10'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.name}</span>
              {category.count > 0 && (
                <span className={cn(
                  'ml-2 px-2 py-0.5 rounded-full text-xs',
                  activeCategory === category.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {category.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Status</h3>
        <div className="flex flex-wrap gap-2">
          {filters.status.map((status) => (
            <motion.button
              key={status.id}
              onClick={() => onStatusChange(status.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                'border border-border/50 hover:border-primary/50',
                activeStatus === status.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background/50 text-foreground hover:bg-primary/10'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{status.name}</span>
              {status.count > 0 && (
                <span className={cn(
                  'ml-2 px-2 py-0.5 rounded-full text-xs',
                  activeStatus === status.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {status.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(activeCategory !== 'all' || activeStatus !== 'all') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-muted/30 rounded-lg border border-border/50"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Active filters:
              {activeCategory !== 'all' && (
                <span className="ml-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-md">
                  {filters.categories.find(c => c.id === activeCategory)?.name}
                </span>
              )}
              {activeStatus !== 'all' && (
                <span className="ml-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-md">
                  {filters.status.find(s => s.id === activeStatus)?.name}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                onCategoryChange('all');
                onStatusChange('all');
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectFilters;