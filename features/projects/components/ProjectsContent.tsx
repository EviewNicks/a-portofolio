'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectsData, Project } from '@/lib/types/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './ProjectFilters';

interface ProjectSectionProps {
  title: string;
  projects: Project[];
  description?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, projects, description }) => {
  if (projects.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

interface ProjectsContentProps {
  projectsData: ProjectsData;
  className?: string;
}

/**
 * ProjectsContent Component
 * 
 * Main content component for projects section
 * 
 * Features:
 * - Project showcase with categorization
 * - Filtering by category and status
 * - Smooth transitions for filter changes
 * - Responsive grid layouts
 * - Featured projects highlighting
 * - Project statistics display
 */
export const ProjectsContent: React.FC<ProjectsContentProps> = ({
  projectsData,
  className,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');

  // Combine all projects from different sections
  const allProjects = useMemo(() => {
    return [
      ...projectsData.academic,
      ...projectsData.personal,
    ];
  }, [projectsData]);

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
      const statusMatch = activeStatus === 'all' || project.status === activeStatus;
      return categoryMatch && statusMatch;
    });
  }, [allProjects, activeCategory, activeStatus]);

  // Group projects by section for display
  const groupedProjects = useMemo(() => {
    const featured = filteredProjects.filter(p => p.featured);
    const academic = filteredProjects.filter(p => 
      projectsData.academic.some(ap => ap.id === p.id)
    );
    const personal = filteredProjects.filter(p => 
      projectsData.personal.some(pp => pp.id === p.id)
    );

    return { featured, academic, personal };
  }, [filteredProjects, projectsData]);



  return (
    <div className={cn('container mx-auto px-4', className)}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Featured Projects
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A showcase of my technical projects spanning AI/ML, web development, and automation.
          Each project demonstrates different aspects of my skills and problem-solving approach.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12"
      >
      </motion.div>

      {/* Projects Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${activeStatus}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more projects.
              </p>
            </div>
          ) : (
            <div className="space-y-12">

              {/* Academic Projects */}
              <ProjectSection
                title="Academic Projects"
                projects={groupedProjects.academic}
                description="Projects developed during academic studies and coursework"
              />

              {/* Personal Projects */}
              <ProjectSection
                title="Umkm Projects"
                projects={groupedProjects.personal}
                description="Independent projects and experiments"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Results Summary */}
      {filteredProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-border/50"
        >
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} of {allProjects.length} projects
            {(activeCategory !== 'all' || activeStatus !== 'all') && (
              <span> with current filters</span>
            )}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsContent;