'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SocialLink } from '@/lib/types/portfolio';
import { GlassCard } from '@/components/common';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  ExternalLink,
  BookOpen,
  Code,
  HelpCircle
} from 'lucide-react';

interface SocialLinksProps {
  links: SocialLink[];
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  medium: BookOpen,
  dev: Code,
  stackoverflow: HelpCircle,
};

const colorMap = {
  github: 'hover:text-gray-900 dark:hover:text-gray-100',
  linkedin: 'hover:text-blue-600',
  twitter: 'hover:text-blue-400',
  instagram: 'hover:text-pink-500',
  medium: 'hover:text-green-600',
  dev: 'hover:text-purple-600',
  stackoverflow: 'hover:text-orange-500',
};

export function SocialLinks({ links }: SocialLinksProps) {
  const publicLinks = links.filter(link => link.isPublic);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <GlassCard variant="light" className="p-6">
      <h4 className="text-xl font-semibold text-foreground mb-6">
        Connect With Me
      </h4>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {publicLinks.map((link) => {
          const Icon = iconMap[link.platform as keyof typeof iconMap] || ExternalLink;
          const colorClass = colorMap[link.platform as keyof typeof colorMap] || 'hover:text-primary';

          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-background/30 hover:bg-accent/50 transition-all duration-300 group"
            >
              <div className={`p-2 rounded-lg bg-background/50 text-muted-foreground transition-colors ${colorClass}`}>
                <Icon size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h5 className="font-medium text-foreground capitalize">
                    {link.platform}
                  </h5>
                  <span className="text-xs text-muted-foreground">
                    @{link.username}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {link.description}
                </p>
              </div>

              <ExternalLink 
                size={16} 
                className="text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" 
              />
            </motion.a>
          );
        })}
      </motion.div>

      {/* Social Stats or Additional Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          Follow me for updates on projects, tech insights, and industry discussions
        </p>
      </div>
    </GlassCard>
  );
}