import type { WalletSummary } from '../../types/wallet'
import { GlassCard } from './glass-card'

interface WalletSummaryCardProps {
  summary: WalletSummary
}

export function WalletSummaryCard({ summary }: WalletSummaryCardProps) {
  return (
    <GlassCard className="space-y-4">
      <div>
        <p className="text-sm text-slate-400">Saldo disponible</p>
        <strong className="text-3xl text-white">{summary.availableBalance}</strong>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-slate-950/40 p-3">
          <p className="text-slate-400">Comisiones</p>
          <strong className="text-white">{summary.totalCommissions}</strong>
        </div>
        <div className="rounded-2xl bg-slate-950/40 p-3">
          <p className="text-slate-400">Retiros pendientes</p>
          <strong className="text-white">{summary.pendingWithdrawals}</strong>
        </div>
      </div>
    </GlassCard>
  )
}
