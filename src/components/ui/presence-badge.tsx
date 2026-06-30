import type { PresenceStatus } from '../../types/chat'

interface PresenceBadgeProps {
  status: PresenceStatus
}

const styles = {
  online: 'bg-emerald-400/15 text-emerald-300',
  offline: 'bg-slate-500/15 text-slate-300',
  away: 'bg-amber-400/15 text-amber-300',
}

export function PresenceBadge({ status }: PresenceBadgeProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs ${styles[status]}`}>
      {status}
    </span>
  )
}
