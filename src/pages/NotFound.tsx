import { LinkButton } from '@/components/Button'

export function NotFound() {
  return (
    <div className="content-width page-padding flex flex-col items-center py-24 text-center md:py-32">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 text-3xl font-light text-text-primary md:text-4xl">Page not found.</h1>
      <p className="mt-4 max-w-sm text-text-secondary">
        The page you are looking for does not exist or may have been moved.
      </p>
      <LinkButton to="/" variant="primary" className="mt-8">
        Return Home
      </LinkButton>
    </div>
  )
}
