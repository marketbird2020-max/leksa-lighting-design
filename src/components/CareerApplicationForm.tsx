import { useState, type FormEvent } from 'react'
import { ChevronDown, Paperclip } from 'lucide-react'
import { Button } from './Button'

interface ApplicationData {
  name: string
  email: string
  phone: string
  linkedin: string
  department: string
  experience: string
  message: string
}

const initialData: ApplicationData = {
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  department: '',
  experience: '',
  message: '',
}

const departments = [
  'Design & Engineering',
  'Manufacturing & Production',
  'Sales & Business Development',
  'Marketing & Communications',
  'Quality Assurance',
  'Human Resources & Administration',
  'Other',
]

const experienceLevels = ['Fresher / Trainee', '1–3 years', '3–5 years', '5–10 years', '10+ years']

type FieldErrors = Partial<Record<keyof ApplicationData | 'resume', string>>

function validate(data: ApplicationData, resumeFile: File | null) {
  const errors: FieldErrors = {}
  if (!data.name.trim()) errors.name = 'Enter your full name.'
  if (!data.email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address, e.g. name@company.com.'
  }
  if (!data.department) errors.department = 'Select the area you’re interested in.'
  if (!resumeFile) errors.resume = 'Attach your resume.'
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

export function CareerApplicationForm() {
  const [data, setData] = useState<ApplicationData>(initialData)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function update<K extends keyof ApplicationData>(key: K, value: ApplicationData[K]) {
    setData((d) => ({ ...d, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validate(data, resumeFile)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('success')
    }, 900)
  }

  function borderClass(field: keyof ApplicationData | 'resume') {
    return errors[field] ? 'border-status-error' : 'border-border-strong focus:border-interactive-default'
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-lg border border-border-default bg-surface-page p-7 shadow-subtle md:p-9">
        <p className="text-xl font-normal text-text-primary">Application received.</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
          Thank you for applying — our HR team reviews every application and will reach out if there&apos;s a fit.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border-default bg-surface-page p-6 shadow-subtle md:p-8">
      <div className="mb-6">
        <h3 className="text-lg font-normal text-text-primary md:text-xl">Apply now</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
          Share your details and resume below — we review every application personally.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
        <Field id="applicant-name" label="Full Name" required error={errors.name}>
          <input
            id="applicant-name"
            autoComplete="name"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'applicant-name-error' : undefined}
            className={`${inputBase} ${borderClass('name')}`}
          />
        </Field>

        <Field id="applicant-email" label="Email" required error={errors.email}>
          <input
            id="applicant-email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'applicant-email-error' : undefined}
            className={`${inputBase} ${borderClass('email')}`}
          />
        </Field>

        <Field id="applicant-phone" label="Phone">
          <input
            id="applicant-phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={`${inputBase} ${borderClass('phone')}`}
          />
        </Field>

        <Field id="applicant-linkedin" label="LinkedIn / Portfolio URL">
          <input
            id="applicant-linkedin"
            type="url"
            placeholder="https://"
            value={data.linkedin}
            onChange={(e) => update('linkedin', e.target.value)}
            className={`${inputBase} ${borderClass('linkedin')}`}
          />
        </Field>

        <Field id="applicant-department" label="Area of Interest" required error={errors.department}>
          <div className="relative">
            <select
              id="applicant-department"
              value={data.department}
              onChange={(e) => update('department', e.target.value)}
              aria-invalid={!!errors.department}
              aria-describedby={errors.department ? 'applicant-department-error' : undefined}
              className={`${selectBase} ${borderClass('department')}`}
            >
              <option value="">Select an option</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
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

        <Field id="applicant-experience" label="Experience">
          <div className="relative">
            <select
              id="applicant-experience"
              value={data.experience}
              onChange={(e) => update('experience', e.target.value)}
              className={`${selectBase} ${borderClass('experience')}`}
            >
              <option value="">Select an option</option>
              {experienceLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
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

        <Field id="applicant-resume" label="Resume" required error={errors.resume} span>
          <label
            htmlFor="applicant-resume"
            className={`flex h-10 w-full cursor-pointer items-center gap-2 rounded-md border bg-surface-page px-3.5 text-sm transition-colors duration-150 ${
              errors.resume ? 'border-status-error' : 'border-border-strong hover:border-interactive-default'
            }`}
          >
            <Paperclip size={14} strokeWidth={1.5} className="flex-shrink-0 text-text-tertiary" />
            <span className={resumeFile ? 'truncate text-text-primary' : 'text-text-tertiary'}>
              {resumeFile ? resumeFile.name : 'Attach PDF or Word document'}
            </span>
          </label>
          <input
            id="applicant-resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
            aria-invalid={!!errors.resume}
            aria-describedby={errors.resume ? 'applicant-resume-error' : undefined}
            className="sr-only"
          />
        </Field>

        <Field id="applicant-message" label="Tell us why you'd be a good fit" span>
          <textarea
            id="applicant-message"
            rows={4}
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
            className={`${inputBase} h-auto py-2.5 ${borderClass('message')}`}
          />
        </Field>

        <div className="flex flex-col gap-4 border-t border-border-default pt-5 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
          <p className="text-xs text-text-tertiary">
            <span aria-hidden="true" className="text-status-error">*</span> Required fields
          </p>
          <Button type="submit" disabled={status === 'submitting'} className="sm:min-w-[180px]">
            {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </div>
  )
}
