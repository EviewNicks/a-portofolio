'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ContactInfo as ContactInfoType } from '@/lib/types/portfolio'
import { GlassCard } from '@/components/common'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
  Globe,
} from 'lucide-react'

interface ContactInfoProps {
  info: ContactInfoType
}

export function ContactInfo({ info }: ContactInfoProps) {
  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: info.email,
      href: `mailto:${info.email}`,
      color: 'text-blue-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: info.phone,
      href: `tel:${info.phone}`,
      color: 'text-green-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: info.location,
      color: 'text-red-500',
    },
    {
      icon: Clock,
      label: 'Timezone',
      value: info.timezone,
      color: 'text-purple-500',
    },
  ]

  const statusItems = [
    {
      icon: CheckCircle,
      label: 'Availability',
      value: info.availability,
      color: 'text-green-500',
    },
    {
      icon: MessageCircle,
      label: 'Response Time',
      value: info.response_time,
      color: 'text-blue-500',
    },
    {
      icon: Globe,
      label: 'Languages',
      value: info.languages.join(', '),
      color: 'text-orange-500',
    },
  ]

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <GlassCard variant="light" className="space-y-6 p-6">
      <h4 className="text-foreground mb-4 text-xl font-semibold">
        Contact Information
      </h4>

      {/* Contact Details */}
      <div className="space-y-4">
        {contactItems.map(item => {
          const Icon = item.icon
          const content = (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="hover:bg-accent/50 group flex items-center gap-3 rounded-lg p-3 transition-colors"
            >
              <div className={`bg-background/50 rounded-lg p-2 ${item.color}`}>
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-sm font-medium">
                  {item.label}
                </p>
                <p className="text-foreground group-hover:text-primary truncate text-sm transition-colors">
                  {item.value}
                </p>
              </div>
            </motion.div>
          )

          return item.href ? (
            <motion.a
              key={item.label}
              href={item.href}
              className="block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {content}
            </motion.a>
          ) : (
            content
          )
        })}
      </div>

      {/* Status Information */}
      <div className="border-border space-y-4 border-t pt-4">
        <h5 className="text-foreground text-lg font-medium">Current Status</h5>
        {statusItems.map(item => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="bg-background/30 flex items-start gap-3 rounded-lg p-3"
            >
              <div
                className={`bg-background/50 rounded-lg p-2 ${item.color} mt-0.5`}
              >
                <Icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-sm font-medium">
                  {item.label}
                </p>
                <p className="text-foreground text-sm">{item.value}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </GlassCard>
  )
}
