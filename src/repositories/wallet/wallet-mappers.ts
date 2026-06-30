import { formatCurrency } from '../../lib/formatters/currency'
import { formatDateTime } from '../../lib/formatters/date'
import type {
  WalletMovementViewModel,
  WalletSummary,
  WithdrawalRequestViewModel,
} from '../../types/wallet'

export function mapWalletSummary(balance: number, commissions: number, pending: number): WalletSummary {
  return {
    availableBalance: formatCurrency(balance),
    totalCommissions: formatCurrency(commissions),
    pendingWithdrawals: formatCurrency(pending),
  }
}

export function mapWalletMovement(row: {
  id: string
  amount: number
  movement_type: WalletMovementViewModel['movementType']
  description: string | null
  created_at: string
}): WalletMovementViewModel {
  return {
    id: row.id,
    title: row.description || 'Movimiento de billetera',
    date: formatDateTime(row.created_at),
    amount: `${row.amount >= 0 ? '+' : '-'} ${formatCurrency(Math.abs(row.amount))}`,
    movementType: row.movement_type,
  }
}

export function mapWithdrawalRequest(row: {
  id: string
  amount: number
  status: WithdrawalRequestViewModel['status']
  notes: string | null
  created_at: string
}): WithdrawalRequestViewModel {
  return {
    id: row.id,
    amount: formatCurrency(row.amount),
    status: row.status,
    notes: row.notes || '',
    createdAt: formatDateTime(row.created_at),
  }
}
