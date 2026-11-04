import { useState, type FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from './Button'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  country: string
  productInterest: string
  projectType: string
  message: string
}

const initialData: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  productInterest: '',
  projectType: '',
  message: '',
}

const productInterests = [
  'Architectural Lighting',
  'Stage Lights',
  'Studio Lighting',
  'Landscape Lighting',
  'Film & Fiction Lighting',
  'Stadium Lighting',
  'DJ & Pub Lighting',
  'TV Studio Lighting',
  'Video Conference Lighting',
  'Video Wall',
  'Drapery & Stage Crafts',
  'Control System',
  'Lighting Accessories',
  'Not Sure Yet',
]
const projectTypes = ['Architectural / Facade', 'Stage & Theatre', 'Studio & Broadcast', 'Landscape', 'Stadium', 'DJ & Pub', 'Corporate / Video Conference', 'Other']

function validate(data: FormData) {
  const errors: Partial<Record<keyof FormData, string>> = {}
  if (!data.name.trim()) errors.name = 'Enter your full name.'
  if (!data.email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address, e.g. name@company.com.'
  }
  if (!data.message.trim()) errors.message = 'Enter a message describing your enquiry.'
  return errors
}

function Field({
  id,
  label,
  required,
  error,
  span,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  span?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={span ? 'md:col-span-2' : undefined}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-text-primary">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-status-error">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-status-error">
          {error}
        </p>
      )}
    </div>
  )
}

const inputBase =
  'h-10 w-full rounded-md border bg-surface-page px-3.5 text-sm max-lg:text-base text-text-primary placeholder:text-text-tertiary transition-colors duration-150 focus-visible:outline-none focus:ring-4 focus:ring-interactive-default/5'

const selectBase = `${inputBase} appearance-none pr-9`

export function ContactForm() {
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validate(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('success')
    }, 900)
  }

  function borderClass(field: keyof FormData) {
    return errors[field] ? 'border-status-error' : 'border-border-strong focus:border-interactive-default'
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-lg border border-border-default bg-surface-page p-7 shadow-subtle md:p-9">
        <p className="text-xl font-normal text-text-primary">Enquiry sent.</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
          Thank you — a member of our team will respond to your enquiry within two business days.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border-default bg-surface-page p-6 shadow-subtle md:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-normal text-text-primary md:text-xl">Send us a message</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
          Share a few details about your project and we&apos;ll route your enquiry to the right specialist.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            id="name"
            autoComplete="name"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`${inputBase} ${borderClass('name')}`}
          />
        </Field>

        <Field id="company" label="Company">
          <input
            id="company"
            autoComplete="organization"
            value={data.company}
            onChange={(e) => update('company', e.target.value)}
            className={`${inputBase} ${borderClass('company')}`}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${inputBase} ${borderClass('email')}`}
          />
        </Field>

        <Field id="phone" label="Phone">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={`${inputBase} ${borderClass('phone')}`}
          />
        </Field>

        <Field id="country" label="Country">
          <input
            id="country"
            autoComplete="country-name"
            value={data.country}
            onChange={(e) => update('country', e.target.value)}
            className={`${inputBase} ${borderClass('country')}`}
          />
        </Field>

        <Field id="productInterest" label="Product Interest">
          <div className="relative">
            <select
              id="productInterest"
              value={data.productInterest}
              onChange={(e) => update('productInterest', e.target.value)}
              className={`${selectBase} ${borderClass('productInterest')}`}
            >
              <option value="">Select an option</option>
              {productInterests.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
          </div>
        </Field>

        <Field id="projectType" label="Project Type">
          <div className="relative">
            <select
              id="projectType"
              value={data.projectType}
              onChange={(e) => update('projectType', e.target.value)}
              className={`${selectBase} ${borderClass('projectType')}`}
            >
              <option value="">Select an option</option>
              {projectTypes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
          </div>
        </Field>

        <Field id="message" label="Message" required error={errors.message} span>
          <textarea
            id="message"
            rows={4}
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${inputBase} h-auto py-2.5 ${borderClass('message')}`}
          />
        </Field>

        <div className="flex flex-col gap-4 border-t border-border-default pt-5 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
          <p className="text-xs text-text-tertiary">
            <span aria-hidden="true" className="text-status-error">*</span> Required fields
          </p>
          <Button type="submit" disabled={status === 'submitting'} className="sm:min-w-[160px]">
            {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
          </Button>
        </div>
      </form>
    </div>
  )
}
