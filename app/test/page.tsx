'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { motion } from 'framer-motion'
import { fadeInUp, glassCard } from '@/lib/utils'
import { slideUpVariants, staggerContainer, staggerItem } from '@/lib/animations'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-white">
            Component Integration Test
          </h1>
          <p className="text-slate-300">
            Testing shadcn/ui components, Framer Motion animations, and glassmorphism effects
          </p>
        </motion.div>

        {/* shadcn/ui Components Test */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Buttons Test */}
          <motion.div variants={staggerItem}>
            <Card className={glassCard('medium')}>
              <CardHeader>
                <CardTitle className="text-white">Button Components</CardTitle>
                <CardDescription className="text-slate-300">
                  Testing different button variants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Components Test */}
          <motion.div variants={staggerItem}>
            <Card className={glassCard('medium')}>
              <CardHeader>
                <CardTitle className="text-white">Form Components</CardTitle>
                <CardDescription className="text-slate-300">
                  Testing input and form elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Test input field" className="bg-white/10 border-white/20 text-white placeholder:text-slate-400" />
                <div className="flex items-center space-x-2">
                  <Switch id="test-switch" />
                  <label htmlFor="test-switch" className="text-white">Test Switch</label>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress and Badges Test */}
          <motion.div variants={staggerItem}>
            <Card className={glassCard('medium')}>
              <CardHeader>
                <CardTitle className="text-white">Progress & Badges</CardTitle>
                <CardDescription className="text-slate-300">
                  Testing progress bars and badge components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Progress Test</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="bg-white/20" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Animation Test */}
          <motion.div variants={staggerItem}>
            <Card className={glassCard('heavy')}>
              <CardHeader>
                <CardTitle className="text-white">Animation Test</CardTitle>
                <CardDescription className="text-slate-300">
                  Testing Framer Motion animations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="w-16 h-16 bg-linear-to-r from-orange-500 to-amber-500 rounded-lg mx-auto"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <p className="text-center text-white mt-4">Animated Box</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Glassmorphism Effects Test */}
        <motion.div
          {...fadeInUp(0.6)}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white text-center">
            Glassmorphism Effects Test
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${glassCard('light')} p-6 text-center`}>
              <h3 className="text-white font-semibold mb-2">Light Glass</h3>
              <p className="text-slate-300 text-sm">backdrop-blur-sm bg-white/10</p>
            </div>
            <div className={`${glassCard('medium')} p-6 text-center`}>
              <h3 className="text-white font-semibold mb-2">Medium Glass</h3>
              <p className="text-slate-300 text-sm">backdrop-blur-md bg-white/20</p>
            </div>
            <div className={`${glassCard('heavy')} p-6 text-center`}>
              <h3 className="text-white font-semibold mb-2">Heavy Glass</h3>
              <p className="text-slate-300 text-sm">backdrop-blur-lg bg-white/30</p>
            </div>
          </div>
        </motion.div>

        {/* Typography Test */}
        <motion.div
          {...fadeInUp(0.8)}
          className={`${glassCard('medium')} p-8 text-center space-y-4`}
        >
          <h2 className="text-3xl font-display text-white">Typography Test</h2>
          <p className="text-lg font-body text-slate-300">
            This text uses Poppins font family for body text
          </p>
          <code className="text-sm font-mono text-orange-400 bg-black/30 px-2 py-1 rounded">
            This code uses Fira Code font family
          </code>
        </motion.div>
      </div>
    </div>
  )
}