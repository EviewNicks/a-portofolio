'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroTitle, HeroSubtitle } from '@/components/common/AnimatedText';
import TextType from '@/components/reactbits/TextType';
import ProfileCard from '@/components/reactbits/ProfileCard';
import { Button } from '@/components/ui/button';
import { HeroData } from '@/lib/types/portfolio';

interface HeroContentProps {
  heroData: HeroData;
}

/**
 * HeroContent Component
 * 
 * Handles all content elements of the hero section including:
 * - Name, title, and tagline
 * - Description text
 * - Call-to-action buttons
 * - Avatar image
 * - Professional highlights
 */
export const HeroContent: React.FC<HeroContentProps> = ({ heroData }) => {
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

  const highlightVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  // Handle contact button click
  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-2 py-4 lg:py-8">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* Left Column - Text Content */}
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          {/* Name and Title */}
          <motion.div 
            variants={itemVariants} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <HeroTitle
              text={heroData.name}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
            />
            <HeroSubtitle
              text={heroData.title}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground"
            />
          </motion.div>

          {/* Tagline */}
          <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <TextType
              text={heroData.tagline}
              typingSpeed={80}
              initialDelay={1000}
              pauseDuration={3000}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              cursorBlinkDuration={0.7}
              className="text-lg md:text-xl font-medium text-ai-amber"
              startOnVisible={true}
            />
          </motion.div>

          {/* Description */}
          <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
              {heroData.description}
            </p>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div 
            variants={itemVariants} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              onClick={() => {
                if (heroData.cta.primary.link.startsWith('#')) {
                  const element = document.querySelector(heroData.cta.primary.link);
                  element?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.open(heroData.cta.primary.link, '_blank');
                }
              }}
            >
              {heroData.cta.primary.text}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
              onClick={() => {
                if (heroData.cta.secondary.link.startsWith('#')) {
                  const element = document.querySelector(heroData.cta.secondary.link);
                  element?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.open(heroData.cta.secondary.link, '_blank');
                }
              }}
            >
              {heroData.cta.secondary.text}
            </Button>
          </motion.div>
        </div>

        {/* Right Column - ProfileCard and Highlights */}
        <div className="lg:col-span-5 ">
          {/* ProfileCard */}
          <motion.div 
            variants={itemVariants} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            {/* profle card menajdi ke sisi kiri */}
            <div className="w-full justify-left  max-w-xs">
              <ProfileCard
                avatarUrl={heroData.avatar.url}
                name={heroData.name}
                title={heroData.title}
                handle="ardiansyah"
                status="Internship"
                // contactText="Hubungi Saya"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                mobileTiltSensitivity={3}
                behindGlowEnabled={false}
                behindGlowColor="rgba(251, 146, 60, 0.25)"
                behindGlowSize="40%"
                innerGradient="linear-gradient(145deg, rgba(251, 146, 60, 0.06) 0%, rgba(59, 130, 246, 0.06) 100%)"
                onContactClick={handleContactClick}
                className="w-full h-auto transform scale-75 origin-center"
              />
            </div>
          </motion.div>

          {/* Professional Highlights */}
          <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-background/80 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-lg"
          >
            <h3 className="text-base font-semibold mb-3 text-foreground">
              Keahlian Utama
            </h3>
            <ul className="space-y-2">
              {heroData.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  variants={highlightVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ 
                    delay: 0.8 + index * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};