import type { DashboardKpi } from '../../types/dashboard'
import { GlassCard } from './glass-card'

interface KpiCardProps {
  item: DashboardKpi
}

export function KpiCard({ item }: KpiCardProps) {
  return (
    <GlassCard>
      <p className="text-sm text-slate-400">{item.label}</p>
      <strong className="mt-3 block text-2xl text-white">{item.value}</strong>
      <p className="mt-2 text-xs text-cyan-300">{item.helper}</p>
    </GlassCard>
  )
}
