'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SkillsData, SkillCategory, Skill } from '@/lib/types/portfolio';
import { GlassCard } from '@/components/common';
import { ProgressBar } from './ProgressBar';

interface SkillsContentProps {
  skillsData: SkillsData;
  className?: string;
}

interface SkillCardProps {
  skill: Skill;
  categoryColor: string;
  index: number;
}

interface CategorySectionProps {
  category: SkillCategory;
  index: number;
}

/**
 * SkillCard Component
 * Individual skill display with progress bar and details
 */
const SkillCard: React.FC<SkillCardProps> = ({ skill, categoryColor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <GlassCard
        variant="light"
        hover
        className="p-4 h-full transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: categoryColor }}
            >
              {skill.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{skill.name}</h4>
              <p className="text-xs text-muted-foreground">{skill.experience}</p>
            </div>
          </div>
        </div>

        <ProgressBar
          value={skill.level}
          color={categoryColor}
          animated
          showValue
          className="mb-3"
        />

        <p className="text-sm text-muted-foreground leading-relaxed">
          {skill.description}
        </p>
      </GlassCard>
    </motion.div>
  );
};

/**
 * CategorySection Component
 * Display skills grouped by category
 */
const CategorySection: React.FC<CategorySectionProps> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className="mb-12"
    >
      {/* Category Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
          style={{ backgroundColor: category.color }}
        >
          <span className="text-lg font-bold">
            {category.name.split(' ').map(word => word.charAt(0)).join('')}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">{category.name}</h3>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.skills.map((skill, skillIndex) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            categoryColor={category.color}
            index={skillIndex}
          />
        ))}
      </div>
    </motion.div>
  );
};

/**
 * SkillsContent Component
 * 
 * Main content component for skills section
 * 
 * Features:
 * - Category organization with visual distinction
 * - Individual skill cards with progress bars
 * - Animated entrance effects
 * - Responsive grid layouts
 * - Glassmorphism design elements
 */
export const SkillsContent: React.FC<SkillsContentProps> = ({
  skillsData,
  className,
}) => {
  return (
    <div className={cn('container mx-auto px-4', className)}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Technical Skills
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A comprehensive overview of my technical expertise across various domains,
          from AI/ML frameworks to web development and DevOps tools.
        </p>
      </motion.div>

      {/* Skills Categories */}
      <div className="space-y-16">
        {skillsData.categories.map((category, index) => (
          <CategorySection
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsContent;