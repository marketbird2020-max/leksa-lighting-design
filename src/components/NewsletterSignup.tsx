import { useState, type FormEvent } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitted')
  }

  if (status === 'submitted') {
    return <p className="text-lg text-white/70">Thanks — you're on the list.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="h-9 w-full rounded-lg border border-border-strong bg-surface-page px-4 text-lg text-text-primary placeholder:text-text-tertiary focus-visible:outline-none"
      />
      <button
        type="submit"
        className="ml-2 h-9 shrink-0 whitespace-nowrap rounded-lg bg-white px-4 text-lg font-medium text-text-primary transition-colors duration-150 hover:bg-white/85"
      >
        Subscribe
      </button>
    </form>
  )
}
