'use client'

import { motion } from 'framer-motion'
import { ContactInfo as ContactInfoType } from '@/lib/types/portfolio'
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  MessageCircle,
  Globe,
} from 'lucide-react'

interface ContactInfoProps {
  info: ContactInfoType
  isInView: boolean
}

const iconHoverVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.15,
    rotate: 5,
    color: 'var(--coral)',
    transition: { duration: 0.3 },
  },
}

export function ContactInfo({ info, isInView }: ContactInfoProps) {
  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: info.email,
      href: `mailto:${info.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: info.phone,
      href: info.phone.includes('xxxx') ? undefined : `tel:${info.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: info.location,
    },
  ]

  const statusItems = [
    {
      icon: CheckCircle,
      label: 'Availability',
      value: info.availability,
    },
    {
      icon: MessageCircle,
      label: 'Response Time',
      value: info.response_time,
    },
    {
      icon: Globe,
      label: 'Languages',
      value: info.languages.join(', '),
    },
  ]

  return (
    <div className="bg-bone/95 border-line-soft space-y-6 rounded-[18px] border p-6 shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)]">
      <h4 className="font-editorial-tight text-ink mb-4 text-xl font-bold">
        Contact Details
      </h4>

      {/* Contact Details */}
      <div className="space-y-3">
        {contactItems.map((item, index) => {
          const Icon = item.icon
          const uniqueKey = `contact-${item.label}-${index}`
          const content = (
            <motion.div
              key={uniqueKey}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="hover:bg-paper-warm group flex items-center gap-3 rounded-lg p-3 transition-colors"
            >
              <motion.div
                variants={iconHoverVariants}
                initial="initial"
                whileHover="hover"
                className="bg-paper-warm text-coral rounded-lg p-2"
              >
                <Icon size={18} />
              </motion.div>
              <div className="min-w-0 flex-1">
                <p className="font-editorial-tight text-ink-faint text-[10.5px] font-medium tracking-[0.14em] uppercase">
                  {item.label}
                </p>
                <p className="font-editorial-body text-ink group-hover:text-coral truncate text-sm transition-colors">
                  {item.value}
                </p>
              </div>
            </motion.div>
          )

          return item.href ? (
            <motion.a
              key={uniqueKey}
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
      <div className="border-line-soft space-y-3 border-t pt-4">
        <h5 className="font-editorial-tight text-ink text-lg font-medium">
          Availability Status
        </h5>
        {statusItems.map((item, index) => {
          const Icon = item.icon
          const uniqueKey = `status-${item.label}-${index}`
          return (
            <motion.div
              key={uniqueKey}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: (index + 3) * 0.1, duration: 0.5 }}
              className="bg-paper-warm flex items-start gap-3 rounded-lg p-3"
            >
              <motion.div
                variants={iconHoverVariants}
                initial="initial"
                whileHover="hover"
                className="text-coral mt-0.5 rounded-lg p-2"
              >
                <Icon size={16} />
              </motion.div>
              <div className="min-w-0 flex-1">
                <p className="font-editorial-tight text-ink-faint text-[10.5px] font-medium tracking-[0.14em] uppercase">
                  {item.label}
                </p>
                <p className="font-editorial-body text-ink text-sm">
                  {item.value}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
