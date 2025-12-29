'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Availability } from '@/lib/types/portfolio';
import { GlassCard } from '@/components/common';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Heart,
  Calendar,
  Timer
} from 'lucide-react';

interface AvailabilityStatusProps {
  availability: Availability;
}

const statusConfig = {
  available: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    label: 'Available',
  },
  busy: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    label: 'Busy',
  },
  unavailable: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    label: 'Unavailable',
  },
};

const typeIcons = {
  internship: GraduationCap,
  freelance: Briefcase,
  collaboration: Users,
  mentorship: Heart,
};

export function AvailabilityStatus({ availability }: AvailabilityStatusProps) {
  const status = statusConfig[availability.status];
  const StatusIcon = status.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <GlassCard variant="light" className="p-6">
      <div className="space-y-6">
        {/* Status Header */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${status.bgColor}`}>
            <StatusIcon className={`${status.color}`} size={20} />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-foreground">
              Availability Status
            </h4>
            <p className={`text-sm font-medium ${status.color}`}>
              Currently {status.label}
            </p>
          </div>
        </div>

        {/* Availability Types */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {availability.types.map((type) => {
            const TypeIcon = typeIcons[type.type as keyof typeof typeIcons] || Briefcase;
            
            return (
              <motion.div
                key={type.type}
                variants={itemVariants}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  type.available
                    ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    type.available 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' 
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    <TypeIcon size={18} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-foreground">
                        {type.title}
                      </h5>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        type.available
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {type.available ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {type.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Timer size={12} />
                        <span>Duration: {type.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Start: {type.start_date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>


      </div>
    </GlassCard>
  );
}