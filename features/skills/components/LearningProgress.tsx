'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LearningItem, Certification } from '@/lib/types/portfolio';
import { GlassCard } from '@/components/common';
import { ProgressBar } from './ProgressBar';

interface LearningProgressProps {
  learning: LearningItem[];
  certifications: Certification[];
  className?: string;
}

interface LearningCardProps {
  item: LearningItem;
  index: number;
}

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

/**
 * LearningCard Component
 * Display current learning progress
 */
const LearningCard: React.FC<LearningCardProps> = ({ item, index }) => {
  const targetDate = new Date(item.target_date);
  const isOverdue = targetDate < new Date();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <GlassCard
        variant="light"
        hover
        className="p-6 h-full transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="flex items-start justify-between mb-4">
          <h4 className="font-semibold text-foreground text-lg">{item.name}</h4>
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              isOverdue
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            )}
          >
            {targetDate.toLocaleDateString('en-US', { 
              month: 'short', 
              year: 'numeric' 
            })}
          </span>
        </div>

        <ProgressBar
          value={item.progress}
          color={isOverdue ? '#ef4444' : '#3b82f6'}
          animated
          showValue
          className="mb-4"
        />

        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.reason}
        </p>
      </GlassCard>
    </motion.div>
  );
};

/**
 * CertificationCard Component
 * Display certification status and plans
 */
const CertificationCard: React.FC<CertificationCardProps> = ({ certification, index }) => {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Unknown';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <GlassCard
        variant="light"
        hover
        className="p-6 h-full transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-semibold text-foreground text-lg mb-1">
              {certification.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {certification.issuer}
            </p>
          </div>
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              getStatusColor(certification.status)
            )}
          >
            {getStatusText(certification.status)}
          </span>
        </div>

        {certification.target_date && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Target: {new Date(certification.target_date).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};

/**
 * LearningProgress Component
 * 
 * Display current learning items and certification plans
 * 
 * Features:
 * - Current learning progress with target dates
 * - Certification status tracking
 * - Progress indicators and visual status
 * - Responsive card layouts
 * - Animated entrance effects
 */
export const LearningProgress: React.FC<LearningProgressProps> = ({
  learning,
  certifications,
  className,
}) => {
  return (
    <div className={cn('container mx-auto px-4 mt-16', className)}>
      {/* Learning Section */}
      {learning.length > 0 && (
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-bold text-foreground mb-2">
              Currently Learning
            </h3>
            <p className="text-muted-foreground">
              Skills and technologies I&apos;m actively developing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learning.map((item, index) => (
              <LearningCard key={item.name} item={item} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-bold text-foreground mb-2">
              Certifications
            </h3>
            <p className="text-muted-foreground">
              Professional certifications and planned achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((certification, index) => (
              <CertificationCard
                key={certification.name}
                certification={certification}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningProgress;