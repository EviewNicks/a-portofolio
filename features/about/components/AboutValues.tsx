'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import { Value } from '@/lib/types/portfolio';

interface AboutValuesProps {
  values: Value[];
}

/**
 * AboutValues Component
 * 
 * Displays personal values as glassmorphism cards with hover effects.
 * Each value includes a title and description with smooth animations.
 */
export const AboutValues: React.FC<AboutValuesProps> = ({ values }) => {
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
    },
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="space-y-8"
      >
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            Core Values
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The principles that guide my work and personal development
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                variants={hoverVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <GlassCard 
                  variant="light" 
                  size="lg" 
                  hover={true}
                  className="p-6 h-full cursor-pointer group"
                >
                  {/* Value Icon/Number */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-ai-amber flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                  </div>

                  {/* Value Title */}
                  <h4 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h4>

                  {/* Value Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="w-8 h-1 bg-linear-to-r from-primary to-ai-amber rounded-full group-hover:w-12 transition-all duration-300" />
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Visual Elements */}
        <div className="relative">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/10 rounded-full"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-ai-amber/10 rotate-45"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};