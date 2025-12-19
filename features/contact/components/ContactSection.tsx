'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContactSectionData } from '@/lib/types/portfolio';
import { GlassCard } from '@/components/common';
import { ContactContent } from './ContactContent';
import { useIntersectionObserver } from '@/lib/hooks';

interface ContactSectionProps {
  data: ContactSectionData;
  className?: string;
}

export function ContactSection({ data, className = '' }: ContactSectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {data.contact.cta.description}
            </p>
          </motion.div>

          {/* Contact Content */}
          <motion.div variants={itemVariants}>
            <GlassCard variant="medium" className="p-8 md:p-12">
              <ContactContent data={data.contact} />
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}