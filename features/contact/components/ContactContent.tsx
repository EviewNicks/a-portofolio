'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContactData } from '@/lib/types/portfolio';
import { ContactInfo } from './ContactInfo';
import { SocialLinks } from './SocialLinks';
import { ContactForm } from './ContactForm';
// import { AvailabilityStatus } from './AvailabilityStatus';

interface ContactContentProps {
  data: ContactData;
}

export function ContactContent({ data }: ContactContentProps) {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* CTA Section */}
      <motion.div variants={itemVariants} className="text-center space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
          {data.cta.title}
        </h3>
        <p className="text-lg text-muted-foreground">
          {data.cta.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {data.cta.buttons.map((button, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                button.variant === 'primary'
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25'
                  : 'border border-border bg-background/50 hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={() => {
                if (button.action === 'scroll-to-form') {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                } else if (button.action === 'download' && button.url) {
                  window.open(button.url, '_blank');
                }
              }}
            >
              {button.text}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Contact Info & Social */}
        <motion.div variants={itemVariants} className="space-y-8">
          <ContactInfo info={data.info} />
          <SocialLinks links={data.social_links} />
          {/* <AvailabilityStatus availability={data.availability} /> */}
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div variants={itemVariants}>
          <ContactForm form={data.form} />
        </motion.div>
      </div>
    </motion.div>
  );
}