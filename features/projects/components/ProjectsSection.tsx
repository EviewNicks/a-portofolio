'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectsSectionData } from '@/lib/types/portfolio';
import { ProjectsContent } from './ProjectsContent';
import projectsData from '@/docs/data/projects-section.json';

interface ProjectsSectionProps {
  className?: string;
}

/**
 * ProjectsSection Component
 * 
 * Main projects section component that showcases technical projects
 * 
 * Features:
 * - JSON data integration from projects-section.json
 * - Project showcase with proper categorization
 * - Filtering system by category and status
 * - Project detail expansion functionality
 * - Responsive layout with glassmorphism effects
 * - Smooth animations and transitions
 * - Project statistics display
 */
export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className }) => {
  const { projects } = projectsData as ProjectsSectionData;

  return (
    <section
      id="projects"
      className={cn(
        'relative py-16 lg:py-24',
        'bg-linear-to-b from-background via-background/95 to-background',
        className
      )}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/5 w-96 h-96 bg-linear-to-br from-primary/5 to-ai-cyan/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
            rotate: [180, 270, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-1/5 w-80 h-80 bg-linear-to-br from-ai-amber/5 to-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-linear-to-br from-ai-cyan/5 to-ai-amber/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Projects Content */}
      <ProjectsContent projectsData={projects} />

      {/* Section Divider */}
      <div className="container mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>
    </section>
  );
};

export default ProjectsSection;