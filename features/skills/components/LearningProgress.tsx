'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LearningItem, Certification } from '@/lib/types/portfolio';
import { GlassCard } from '@/components/common';
import { ProgressBar } from './ProgressBar';
import Image from 'next/image';

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
 * Display current learning progress with enhanced layout
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
        className="p-8 h-full transition-all duration-300 hover:scale-[1.02] min-h-[280px]"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h4 className="font-bold text-foreground text-xl mb-2">{item.name}</h4>
            {/* Platform badge if available */}
            {(item as any).platform && (
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                {(item as any).platform}
              </span>
            )}
          </div>
          <span
            className={cn(
              'px-3 py-2 rounded-full text-sm font-semibold',
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

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <span className="text-lg font-bold text-foreground">{item.progress}%</span>
          </div>
          <ProgressBar
            value={item.progress}
            color={isOverdue ? '#ef4444' : '#3b82f6'}
            animated
            showValue={false}
            className="mb-2 h-3"
          />
        </div>

        {/* Description */}
        <p className="text-base text-muted-foreground leading-relaxed mb-4">
          {item.reason}
        </p>

        {/* Course URL if available */}
        {(item as any).url && (
          <div className="mt-auto pt-4 border-t border-border/50">
            <a
              href={(item as any).url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View Course
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};

/**
 * CertificationCard Component
 * Display certification with image and details
 */
const CertificationCard: React.FC<CertificationCardProps> = ({ certification, index }) => {
  const formatDate = (dateString: string) => {
    // Convert DD/MM/YYYY to readable format
    const [day, month, year] = dateString.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
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
        className="p-6 h-full transition-all duration-300 hover:scale-[1.02] min-h-[400px]"
      >
        {/* Certificate Image */}
        <div className="mb-6 relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={`/${certification.media}`}
            alt={`${certification["name-license"]} Certificate`}
            width={400}
            height={300}
            className="w-full  object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          {/* Fallback placeholder */}
          <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">Certificate</p>
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-foreground text-lg mb-2 overflow-hidden" style={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical' 
            }}>
              {certification["name-license"]}
            </h4>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-primary">
                {certification.organisasi}
              </p>
              <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium">
                Completed
              </span>
            </div>
          </div>

          {/* Certificate Number and Date */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span className="font-medium">Certificate No:</span>
              <span className="font-mono text-xs">{certification.no}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Issued:</span>
              <span>{formatDate(certification["tanggal-terbit"])}</span>
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed overflow-hidden" style={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 4, 
              WebkitBoxOrient: 'vertical' 
            }}>
              {certification.deksripsi}
            </p>
          </div>
        </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((certification, index) => (
              <CertificationCard
                key={certification["name-license"]}
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