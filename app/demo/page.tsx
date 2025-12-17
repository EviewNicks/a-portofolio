'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HeroSection } from '@/features/hero/components'
import { GlassCard, AnimatedText, AnimatedHeading } from '@/components/common'
import { ThemeToggle, FloatingThemeToggle } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { glassCard } from '@/lib/utils'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Theme Toggle */}
      <FloatingThemeToggle position="top-right" />

      {/* Hero Section */}
      <HeroSection />

      {/* Demo Sections */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-20">
        
        {/* Glassmorphism Showcase */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <motion.div variants={staggerItem} className="text-center">
            <AnimatedHeading 
              text="Glassmorphism Effects"
              className="text-4xl font-display text-white mb-4"
            />
            <AnimatedText
              text="Demonstrating different glass effect variants and interactive elements"
              as="p"
              variant="fadeIn"
              delay={0.3}
              className="text-slate-300 text-lg font-body"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Light Glass */}
            <motion.div variants={staggerItem}>
              <GlassCard variant="light" className="p-8 text-center space-y-4">
                <h3 className="text-xl font-semibold text-white">Light Glass</h3>
                <p className="text-slate-300">Subtle transparency with minimal blur</p>
                <div className="space-y-2">
                  <Progress value={30} className="bg-white/20" />
                  <Badge variant="outline" className="border-white/30 text-white">30% Opacity</Badge>
                </div>
              </GlassCard>
            </motion.div>

            {/* Medium Glass */}
            <motion.div variants={staggerItem}>
              <GlassCard variant="medium" hover glow className="p-8 text-center space-y-4">
                <h3 className="text-xl font-semibold text-white">Medium Glass</h3>
                <p className="text-slate-300">Balanced transparency with moderate blur</p>
                <div className="space-y-2">
                  <Progress value={60} className="bg-white/20" />
                  <Badge className="bg-orange-500">60% Opacity</Badge>
                </div>
              </GlassCard>
            </motion.div>

            {/* Heavy Glass */}
            <motion.div variants={staggerItem}>
              <GlassCard variant="heavy" className="p-8 text-center space-y-4">
                <h3 className="text-xl font-semibold text-white">Heavy Glass</h3>
                <p className="text-slate-300">Strong transparency with heavy blur</p>
                <div className="space-y-2">
                  <Progress value={90} className="bg-white/20" />
                  <Badge variant="secondary">90% Opacity</Badge>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.section>

        {/* Animation Showcase */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <motion.div variants={staggerItem} className="text-center">
            <AnimatedHeading 
              text="Animation System"
              className="text-4xl font-display text-white mb-4"
            />
            <AnimatedText
              text="Showcasing various animation patterns and transitions"
              as="p"
              variant="slideUp"
              delay={0.3}
              className="text-slate-300 text-lg font-body"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Text Animations */}
            <motion.div variants={staggerItem}>
              <Card className={glassCard('medium')}>
                <CardHeader>
                  <CardTitle className="text-white">Text Animations</CardTitle>
                  <CardDescription className="text-slate-300">
                    Different text animation variants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Slide Up:</p>
                    <AnimatedText
                      text="This text slides up smoothly"
                      variant="slideUp"
                      className="text-white"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Fade In:</p>
                    <AnimatedText
                      text="This text fades in gradually"
                      variant="fadeIn"
                      delay={0.5}
                      className="text-white"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Stagger Effect:</p>
                    <AnimatedText
                      text="Each letter appears individually"
                      variant="slideUp"
                      stagger
                      delay={1}
                      className="text-orange-400 font-semibold"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interactive Elements */}
            <motion.div variants={staggerItem}>
              <Card className={glassCard('medium')}>
                <CardHeader>
                  <CardTitle className="text-white">Interactive Elements</CardTitle>
                  <CardDescription className="text-slate-300">
                    Hover and click animations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                        Hover & Click Me
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      className="p-4 rounded-lg bg-white/10 border border-white/20 text-center"
                      whileHover={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(251, 146, 60, 0.5)'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-white">Hover for color change</p>
                    </motion.div>

                    <div className="flex justify-center">
                      <ThemeToggle variant="switch" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Typography Showcase */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <motion.div variants={staggerItem} className="text-center">
            <AnimatedHeading 
              text="Typography System"
              className="text-4xl font-display text-white mb-4"
            />
            <AnimatedText
              text="Custom font integration with Playfair Display, Poppins, and Fira Code"
              as="p"
              variant="fadeIn"
              delay={0.3}
              className="text-slate-300 text-lg font-body"
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlassCard variant="medium" className="p-8 space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-display text-white">Playfair Display</h1>
                <p className="text-slate-400">Used for headings and display text</p>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-2xl font-body text-white">Poppins Regular</p>
                <p className="text-slate-400">Used for body text and UI elements</p>
              </div>
              
              <div className="text-center space-y-4">
                <code className="text-xl font-mono text-orange-400 bg-black/30 px-4 py-2 rounded">
                  const code = &quot;Fira Code&quot;;
                </code>
                <p className="text-slate-400">Used for code blocks and technical content</p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.section>

        {/* Responsive Design Test */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <motion.div variants={staggerItem} className="text-center">
            <AnimatedHeading 
              text="Responsive Design"
              className="text-4xl font-display text-white mb-4"
            />
            <AnimatedText
              text="All components are fully responsive and mobile-optimized"
              as="p"
              variant="slideUp"
              delay={0.3}
              className="text-slate-300 text-lg font-body"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <motion.div key={i} variants={staggerItem}>
                <GlassCard 
                  variant="light" 
                  hover 
                  className="p-6 text-center"
                >
                  <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-amber-500 rounded-full mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Feature {i + 1}</h3>
                  <p className="text-slate-300 text-sm">Responsive card component</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}