import type { ClientSecuritySignal } from '../../types/security'
import { GlassCard } from './glass-card'

interface SecurityStatusCardProps {
  signal: ClientSecuritySignal
}

export function SecurityStatusCard({ signal }: SecurityStatusCardProps) {
  return (
    <GlassCard className="space-y-3">
      <div>
        <p className="text-sm text-slate-400">Estado de seguridad del cliente</p>
        <strong className="text-2xl text-white">{signal.score}/100</strong>
      </div>
      <p className="text-sm text-slate-300">
        {signal.blocked
          ? 'Entorno sospechoso detectado. Se deben restringir acciones sensibles.'
          : 'Sin señales críticas inmediatas en el cliente.'}
      </p>
      <div className="flex flex-wrap gap-2">
        {signal.reasons.length === 0 ? (
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
            Sin alertas
          </span>
        ) : (
          signal.reasons.map((reason) => (
            <span
              key={reason}
              className="rounded-full bg-rose-400/15 px-3 py-1 text-xs text-rose-300"
            >
              {reason}
            </span>
          ))
        )}
      </div>
    </GlassCard>
  )
}
