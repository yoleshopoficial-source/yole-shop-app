import type { PropsWithChildren } from 'react'

interface GlassCardProps extends PropsWithChildren {
  className?: string
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <article
      className={`rounded-3xl border border-white/10 bg-white/8 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.35)] backdrop-blur ${className}`}
    >
      {children}
    </article>
  )
}
