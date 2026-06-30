import type { PropsWithChildren } from 'react'
import { GlassCard } from './glass-card'

interface ChartCardProps extends PropsWithChildren {
  title: string
  description: string
}

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <GlassCard className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
      {children}
    </GlassCard>
  )
}
