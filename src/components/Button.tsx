import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost'

export const buttonBaseClasses =
  'inline-flex items-center justify-center gap-2 h-9 px-5 text-lg font-medium tracking-wide rounded-lg transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40'

const base = buttonBaseClasses

export const buttonVariantClasses: Record<Variant, string> = {
  primary:
    'bg-interactive-default text-interactive-inverse hover:bg-interactive-hover',
  secondary:
    'border border-interactive-default text-text-primary hover:bg-interactive-default hover:text-interactive-inverse',
  ghost: 'text-text-primary hover:text-interactive-hover px-0 h-auto',
}

const variants = buttonVariantClasses

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  withArrow?: boolean
}

export function Button({ variant = 'primary', withArrow, className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {withArrow && <ArrowRight size={16} strokeWidth={1.5} />}
    </button>
  )
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  variant?: Variant
  withArrow?: boolean
}

export function LinkButton({ to, variant = 'primary', withArrow, className = '', children, ...props }: LinkButtonProps) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {withArrow && <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-250 group-hover:translate-x-1" />}
    </Link>
  )
}
