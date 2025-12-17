'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/common/GlassCard'
import { AnimatedText, TypewriterText } from '@/components/common/AnimatedText'
import { useParallax, useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem, floatingVariants } from '@/lib/animations'

interface HeroSectionProps {
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const { y: parallaxY } = useParallax({ speed: 0.5 })

  return (
    <section 
      ref={ref}
      className={cn(
        'min-h-screen relative flex items-center justify-center overflow-hidden',
        'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated background shapes */}
        <motion.div
          style={{ y: parallaxY }}
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          style={{ y: parallaxY }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div variants={staggerItem}>
            <TypewriterText
              text="Hello, I'm"
              as="p"
              className="text-lg text-slate-300 font-body"
            />
          </motion.div>

          {/* Name */}
          <motion.div variants={staggerItem}>
            <AnimatedText
              text="Ardiansyah"
              as="h1"
              variant="slideUp"
              className="text-6xl md:text-8xl font-display font-bold text-white"
              stagger
            />
          </motion.div>

          {/* Title */}
          <motion.div variants={staggerItem}>
            <AnimatedText
              text="AI Engineer & Full Stack Developer"
              as="h2"
              variant="fadeIn"
              delay={0.5}
              className="text-2xl md:text-3xl text-orange-400 font-body"
            />
          </motion.div>

          {/* Description */}
          <motion.div variants={staggerItem}>
            <GlassCard variant="medium" className="max-w-2xl mx-auto p-6">
              <AnimatedText
                text="Passionate about creating intelligent solutions that bridge the gap between artificial intelligence and human needs. Specializing in machine learning, web development, and innovative user experiences."
                as="p"
                variant="slideUp"
                delay={0.8}
                className="text-lg text-slate-300 leading-relaxed font-body"
              />
            </GlassCard>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-xl"
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={staggerItem}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#', label: 'Email' }
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                title={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            className="flex flex-col items-center space-y-2 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-sm font-body">Scroll Down</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}