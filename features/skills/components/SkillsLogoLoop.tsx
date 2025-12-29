'use client';

import React from 'react';
import { motion } from 'framer-motion';
import LogoLoop, { LogoItem } from '@/components/reactbits/LogoLoop';
import { SkillCategory } from '@/lib/types/portfolio';

interface SkillsLogoLoopProps {
  categories: SkillCategory[];
  className?: string;
}

/**
 * SkillsLogoLoop Component
 * 
 * Displays a continuous loop of technology icons from the skills data
 * Uses the LogoLoop component to create an animated showcase of technologies
 */
export const SkillsLogoLoop: React.FC<SkillsLogoLoopProps> = ({ 
  categories, 
  className = '' 
}) => {
  // Create logo items from skills data
  const logoItems: LogoItem[] = React.useMemo(() => {
    const skillLogos: LogoItem[] = [];
    
    // Map skill IDs to available icon files
    const iconMap: Record<string, string> = {
      'python': '/images/icons/python-programming-language-icon.svg',
      'javascript': '/images/icons/javascript-programming-language-icon.svg',
      'typescript': '/images/icons/typescript-programming-language-icon.svg',
      'react': '/images/icons/react-js-icon.svg',
      'nextjs': '/images/icons/nextjs-icon.svg',
      'git': '/images/icons/git-icon.svg',
      'github': '/images/icons/github-icon.svg',
      'jira': '/images/icons/atlassian-jira-icon.svg',
      'confluence': '/images/icons/atlassian-confluence-icon.svg',
      'bootstrap': '/images/icons/bootstrap-5-logo-icon.svg',
      'tailwindcss': '/images/icons/tailwind-css-icon.svg',
      'tensorflow': '/images/icons/tensorflow-icon.svg',
      'pytorch': '/images/icons/pytorch-icon.svg',
      'huggingface': '/images/icons/huggingface-icon.svg',
      'vscode': '/images/icons/visual-studio-code-icon.svg',
    };

    // Extract skills from all categories
    categories.forEach(category => {
      category.skills.forEach(skill => {
        const iconPath = iconMap[skill.id];
        if (iconPath) {
          skillLogos.push({
            src: iconPath,
            alt: `${skill.name} icon`,
            title: `${skill.name} - ${skill.level}% proficiency`,
            width: 40,
            height: 40,
          });
        }
      });
    });

    // Add learning technologies with different styling
    const learningTechs = ['tensorflow', 'typescript'];
    learningTechs.forEach(techId => {
      const iconPath = iconMap[techId];
      if (iconPath && !skillLogos.some(logo => 'src' in logo && logo.src === iconPath)) {
        skillLogos.push({
          src: iconPath,
          alt: `${techId} icon`,
          title: `${techId} - Currently Learning`,
          width: 40,
          height: 40,
        });
      }
    });

    // Add some additional popular tech icons for visual appeal
    const additionalIcons = [
      {
        src: '/images/icons/cursor-ai-code-icon.svg',
        alt: 'AI Development',
        title: 'AI Development Tools',
        width: 40,
        height: 40,
      }
    ];

    return [...skillLogos, ...additionalIcons];
  }, [categories]);

  if (logoItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className={`w-full ${className}`}
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-lg font-semibold text-muted-foreground mb-2"
        >
          Technologies & Tools
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-16 h-0.5 bg-gradient-to-r from-primary/50 to-ai-cyan/50 mx-auto"
        />
      </div>

      {/* Logo Loop Container */}
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-lg blur-xl" />
        
        {/* Logo Loop */}
        <div className="relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
          <LogoLoop
            logos={logoItems}
            speed={60}
            direction="left"
            logoHeight={32}
            gap={48}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            className="w-full"
            ariaLabel="Technology stack and tools used in projects"
          />
        </div>
      </div>

      {/* Bottom description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-center text-sm text-muted-foreground mt-4"
      >
        Hover to pause • Technologies used in real projects
      </motion.p>
    </motion.div>
  );
};

export default SkillsLogoLoop;