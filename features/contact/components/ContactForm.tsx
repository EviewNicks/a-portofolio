'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContactForm as ContactFormType } from '@/lib/types/portfolio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface ContactFormProps {
  form: ContactFormType
  isInView?: boolean
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

interface FormState {
  data: FormData
  errors: FormErrors
  isSubmitting: boolean
  isSubmitted: boolean
  submitError: string | null
}

export function ContactForm({ form, isInView = true }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>({
    data: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    submitError: null,
  })

  const validateField = (name: string, value: string): string => {
    const field = form.fields.find(f => f.name === name)
    if (!field) return ''

    // Required validation
    if (field.required && !value.trim()) {
      return `${field.label} is required`
    }

    // Pattern validation
    if (field.validation?.pattern && value) {
      const regex = new RegExp(field.validation.pattern)
      if (!regex.test(value)) {
        if (field.type === 'email') {
          return 'Please enter a valid email address'
        }
        return `${field.label} format is invalid`
      }
    }

    // Length validation
    if (
      field.validation?.minLength &&
      value.length < field.validation.minLength
    ) {
      return `${field.label} must be at least ${field.validation.minLength} characters`
    }

    if (
      field.validation?.maxLength &&
      value.length > field.validation.maxLength
    ) {
      return `${field.label} must not exceed ${field.validation.maxLength} characters`
    }

    return ''
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    let isValid = true

    Object.entries(formState.data).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) {
        errors[key] = error
        isValid = false
      }
    })

    setFormState(prev => ({ ...prev, errors }))
    return isValid
  }

  const handleInputChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [name]: value },
      errors: { ...prev.errors, [name]: '' },
      submitError: null,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setFormState(prev => ({ ...prev, isSubmitting: true, submitError: null }))

    try {
      // Simulate form submission (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // For demo purposes, we'll just show success
      // In a real implementation, you would integrate with EmailJS or another service
      console.log('Form submitted:', formState.data)

      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        data: { name: '', email: '', subject: '', message: '' },
      }))

      // Reset success state after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSubmitted: false }))
      }, 5000)
    } catch {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: form.settings.errorMessage,
      }))
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  // const shakeVariants = {
  //   shake: {
  //     x: [-8, 8, -8, 8, 0],
  //     transition: { duration: 0.4 },
  //   },
  // }

  if (formState.isSubmitted) {
    return (
      <div className="bg-bone border-line-soft editorial-shadow rounded-[18px] border p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="space-y-6 text-center"
        >
          <motion.div
            className="bg-coral/10 relative mx-auto flex h-20 w-20 items-center justify-center rounded-full"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1] as const,
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="bg-coral/20 absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <CheckCircle className="text-coral relative z-10 h-10 w-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="font-editorial-tight text-ink mb-2 text-2xl font-bold tracking-tight">
              Message Sent Successfully!
            </h3>
            <p className="font-editorial-body text-ink-soft">
              {form.settings.successMessage}
            </p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-bone border-line-soft editorial-shadow rounded-[18px] border p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <h4 className="font-editorial-tight text-ink mb-2 text-2xl font-bold tracking-tight">
            Send Me a Message
          </h4>
          <p className="font-editorial-body text-ink-soft">
            Fill out the form below and I&apos;ll get back to you as soon as
            possible.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
          {form.fields.map(field => (
            <motion.div
              key={field.name}
              variants={itemVariants}
              animate={formState.errors[field.name] ? 'shake' : 'visible'}
              className="space-y-2"
            >
              <label
                htmlFor={field.name}
                className="font-editorial-tight text-ink text-sm font-semibold tracking-tight"
              >
                {field.label}
                {field.required && <span className="text-coral ml-1">*</span>}
              </label>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.18 }}
              >
                {field.type === 'text' && (
                  <Input
                    id={field.name}
                    type="text"
                    placeholder={field.placeholder}
                    value={formState.data[field.name as keyof FormData]}
                    onChange={e =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className={`font-editorial-body bg-paper/50 border-line-soft focus:border-coral focus:ring-coral/20 rounded-2xl px-4 py-3 transition-all duration-180 focus:ring-2 ${formState.errors[field.name] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} `}
                    disabled={formState.isSubmitting}
                  />
                )}

                {field.type === 'email' && (
                  <Input
                    id={field.name}
                    type="email"
                    placeholder={field.placeholder}
                    value={formState.data[field.name as keyof FormData]}
                    onChange={e =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className={`font-editorial-body bg-paper/50 border-line-soft focus:border-coral focus:ring-coral/20 rounded-2xl px-4 py-3 transition-all duration-180 focus:ring-2 ${formState.errors[field.name] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} `}
                    disabled={formState.isSubmitting}
                  />
                )}

                {field.type === 'select' && field.options && (
                  <Select
                    value={formState.data[field.name as keyof FormData]}
                    onValueChange={value =>
                      handleInputChange(field.name, value)
                    }
                    disabled={formState.isSubmitting}
                  >
                    <SelectTrigger
                      className={`font-editorial-body bg-paper/50 border-line-soft focus:border-coral focus:ring-coral/20 rounded-2xl px-4 py-3 transition-all duration-180 focus:ring-2 ${formState.errors[field.name] ? 'border-red-500' : ''} `}
                    >
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {field.type === 'textarea' && (
                  <Textarea
                    id={field.name}
                    placeholder={field.placeholder}
                    value={formState.data[field.name as keyof FormData]}
                    onChange={e =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className={`font-editorial-body bg-paper/50 border-line-soft focus:border-coral focus:ring-coral/20 min-h-35 rounded-2xl px-4 py-3 transition-all duration-180 focus:ring-2 ${formState.errors[field.name] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} `}
                    disabled={formState.isSubmitting}
                  />
                )}
              </motion.div>

              <AnimatePresence mode="wait">
                {formState.errors[field.name] && (
                  <motion.p
                    key={`error-${field.name}`}
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height: 'auto',
                      x: [-4, 4, -4, 0],
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-editorial-body flex items-center gap-2 text-sm text-red-600"
                  >
                    <AlertCircle size={14} />
                    {formState.errors[field.name]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <AnimatePresence>
            {formState.submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-2xl border border-red-300 bg-red-50 p-4"
              >
                <div className="font-editorial-body flex items-center gap-2 text-sm text-red-700">
                  <AlertCircle size={16} />
                  {formState.submitError}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              <Button
                type="submit"
                disabled={formState.isSubmitting}
                className="bg-coral hover:bg-coral-soft text-paper font-editorial-tight group relative w-full overflow-hidden rounded-2xl px-6 py-6 text-base font-semibold tracking-tight shadow-lg transition-all duration-180 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formState.isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>{form.settings.submitText}</span>
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Send className="h-5 w-5" />
                      </motion.span>
                    </>
                  )}
                </span>

                {/* Button hover glow effect */}
                <motion.div
                  className="from-coral to-coral-soft absolute inset-0 bg-linear-to-r opacity-0 transition-opacity duration-180 group-hover:opacity-100"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.2 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}
