'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import { AnimatedText } from '@/components/common/AnimatedText';
import { AboutData } from '@/lib/types/portfolio';

interface AboutContentProps {
  aboutData: AboutData;
}

/**
 * AboutContent Component
 * 
 * Handles the main content of the about section including:
 * - Personal information (bio, philosophy, interests)
 * - Education details with achievements
 * - Career objectives
 * - Statistics with animated counters
 */
export const AboutContent: React.FC<AboutContentProps> = ({ aboutData }) => {
  const [counters, setCounters] = useState<Record<string, number>>({});

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  // Animate counters for statistics
  useEffect(() => {
    const animateCounters = () => {
      aboutData.stats.forEach((stat) => {
        const numericValue = parseInt(stat.value.replace(/\D/g, '')) || 0;
        if (numericValue > 0) {
          let current = 0;
          const increment = numericValue / 50; // 50 steps for smooth animation
          const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
              current = numericValue;
              clearInterval(timer);
            }
            setCounters(prev => ({
              ...prev,
              [stat.label]: Math.floor(current)
            }));
          }, 30);
        }
      });
    };

    // Start animation after component mounts
    const timeout = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timeout);
  }, [aboutData.stats]);

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="space-y-12 lg:space-y-16"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <AnimatedText
            text="About Me"
            as="h2"
            variant="slideUp"
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          />
          <AnimatedText
            text="Get to know more about my journey, education, and aspirations"
            as="p"
            variant="fadeIn"
            delay={0.2}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Personal Info */}
          <div className="space-y-8">
            {/* Bio Section */}
            <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <GlassCard variant="medium" size="lg" className="p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium">{aboutData.personal.location}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timezone:</span>
                      <p className="font-medium">{aboutData.personal.timezone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {aboutData.personal.bio}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Philosophy Section */}
            <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <GlassCard variant="light" size="lg" className="p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Philosophy
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.personal.philosophy}
                </p>
              </GlassCard>
            </motion.div>

            {/* Interests */}
            <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <GlassCard variant="medium" size="lg" className="p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.personal.interests.map((interest, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column - Education & Objectives */}
          <div className="space-y-8">
            {/* Education */}
            <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <GlassCard variant="medium" size="lg" className="p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">{aboutData.education.current.degree}</h4>
                    <p className="text-primary font-medium">{aboutData.education.current.institution}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">{aboutData.education.current.period}</span>
                      <span className="text-sm font-medium">GPA: {aboutData.education.current.gpa}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Focus Areas</h5>
                    <div className="flex flex-wrap gap-2">
                      {aboutData.education.current.focus_areas.map((area, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-ai-amber/10 text-ai-amber rounded text-xs font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h5 className="font-medium mb-2">Achievements</h5>
                    <div className="space-y-2">
                      {aboutData.education.achievements.map((achievement, index) => (
                        <div key={index} className="border-l-2 border-primary/30 pl-3">
                          <div className="flex justify-between items-start">
                            <h6 className="font-medium text-sm">{achievement.title}</h6>
                            <span className="text-xs text-muted-foreground">{achievement.period}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Career Objectives */}
            <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <GlassCard variant="light" size="lg" className="p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Career Objectives
                </h3>
                <ul className="space-y-3">
                  {aboutData.career_objectives.map((objective, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-ai-cyan rounded-full mt-2 shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {objective}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Statistics Section */}
        <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
          <GlassCard variant="medium" size="xl" className="p-6 lg:p-8">
            <h3 className="text-xl font-semibold mb-6 text-center text-foreground">
              By the Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {aboutData.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.value.includes('+') 
                      ? `${counters[stat.label] || 0}+`
                      : stat.value
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
};