import { cn } from '../../lib/cn'

interface StatusBadgeProps {
  value: string
}

const statusMap: Record<string, string> = {
  Confirmado: 'bg-emerald-400/15 text-emerald-300',
  Pendiente: 'bg-amber-400/15 text-amber-300',
  Vendido: 'bg-cyan-400/15 text-cyan-300',
  Cancelado: 'bg-rose-400/15 text-rose-300',
  pending: 'bg-amber-400/15 text-amber-300',
  confirmed: 'bg-emerald-400/15 text-emerald-300',
  denied: 'bg-orange-400/15 text-orange-300',
  sold: 'bg-cyan-400/15 text-cyan-300',
  cancelled: 'bg-rose-400/15 text-rose-300',
}

export function StatusBadge({ value }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-xs font-medium',
        statusMap[value] || 'bg-slate-500/15 text-slate-300',
      )}
    >
      {value}
    </span>
  )
}
