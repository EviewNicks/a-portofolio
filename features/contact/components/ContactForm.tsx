'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ContactForm as ContactFormType } from '@/lib/types/portfolio'
import { GlassCard } from '@/components/common'
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

export function ContactForm({ form }: ContactFormProps) {
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
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (formState.isSubmitted) {
    return (
      <GlassCard variant="medium" className="p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-foreground text-xl font-semibold">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-foreground">
            {form.settings.successMessage}
          </p>
        </motion.div>
      </GlassCard>
    )
  }

  return (
    <GlassCard variant="medium" className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <h4 className="text-foreground mb-2 text-xl font-semibold">
            Send Me a Message
          </h4>
          <p className="text-muted-foreground">
            Fill out the form below and I&quo;ll get back to you as soon as
            possible.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
          {form.fields.map(field => (
            <motion.div
              key={field.name}
              variants={itemVariants}
              className="space-y-2"
            >
              <label
                htmlFor={field.name}
                className="text-foreground text-sm font-medium"
              >
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </label>

              {field.type === 'text' && (
                <Input
                  id={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  value={formState.data[field.name as keyof FormData]}
                  onChange={e => handleInputChange(field.name, e.target.value)}
                  className={`${formState.errors[field.name] ? 'border-red-500' : ''}`}
                  disabled={formState.isSubmitting}
                />
              )}

              {field.type === 'email' && (
                <Input
                  id={field.name}
                  type="email"
                  placeholder={field.placeholder}
                  value={formState.data[field.name as keyof FormData]}
                  onChange={e => handleInputChange(field.name, e.target.value)}
                  className={`${formState.errors[field.name] ? 'border-red-500' : ''}`}
                  disabled={formState.isSubmitting}
                />
              )}

              {field.type === 'select' && field.options && (
                <Select
                  value={formState.data[field.name as keyof FormData]}
                  onValueChange={value => handleInputChange(field.name, value)}
                  disabled={formState.isSubmitting}
                >
                  <SelectTrigger
                    className={`${formState.errors[field.name] ? 'border-red-500' : ''}`}
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
                  onChange={e => handleInputChange(field.name, e.target.value)}
                  className={`min-h-30 ${formState.errors[field.name] ? 'border-red-500' : ''}`}
                  disabled={formState.isSubmitting}
                />
              )}

              {formState.errors[field.name] && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 text-sm text-red-500"
                >
                  <AlertCircle size={14} />
                  {formState.errors[field.name]}
                </motion.p>
              )}
            </motion.div>
          ))}

          {formState.submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
            >
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle size={16} />
                {formState.submitError}
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
            >
              {formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {form.settings.submitText}
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </GlassCard>
  )
}
