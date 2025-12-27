'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Project } from '@/lib/types/portfolio';
import { GlassCard } from '@/components/common';

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

/**
 * ProjectCard Component
 * 
 * Individual project card with expandable details
 * 
 * Features:
 * - Project information display with technologies
 * - Expandable long description and highlights
 * - Functional GitHub and demo links
 * - Status indicators and category badges
 * - Hover effects and animations
 * - Responsive image handling
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'planned':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai-ml':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'web-development':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'data-science':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const formatCategoryName = (category: string) => {
    switch (category) {
      case 'ai-ml':
        return 'AI & ML';
      case 'web-development':
        return 'Web Development';
      case 'data-science':
        return 'Data Science';
      default:
        return category;
    }
  };

  const formatStatusName = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return status;
    }
  };

  const primaryImage = project.images.find(img => img.isPrimary) || project.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={cn('h-full', className)}
    >
      <GlassCard
        variant="medium"
        hover
        className="p-6 h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Project Image */}
        {primaryImage && (
          <div className="mb-4 rounded-lg overflow-hidden bg-muted/20">
            <div className="w-full h-48 bg-linear-to-br from-primary/10 to-ai-amber/10 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">📁</span>
                </div>
                <p className="text-sm">{primaryImage.alt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Project Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-foreground line-clamp-2">
              {project.title}
            </h3>
            {project.featured && (
              <span className="ml-2 px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Status and Category Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(project.status))}>
              {formatStatusName(project.status)}
            </span>
            <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getCategoryColor(project.category))}>
              {formatCategoryName(project.category)}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-muted/30 text-foreground text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-md">
                +{project.technologies.length - 4} more
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
              {/* Long Description */}
              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">About This Project</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Highlights */}
              {project.highlights.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="text-muted-foreground text-sm flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* All Technologies */}
              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
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

        {/* Project Links */}
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  link.type === 'github'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

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
    </motion.div>
  );
};

export default ProjectCard;