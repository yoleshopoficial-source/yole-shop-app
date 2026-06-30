export type WalletMovementType =
  | 'commission'
  | 'withdrawal'
  | 'adjustment'
  | 'bonus'

export type WithdrawalStatus = 'pending' | 'approved' | 'rejected' | 'paid'

export interface WalletMovementViewModel {
  id: string
  title: string
  date: string
  amount: string
  movementType: WalletMovementType
}

export interface WithdrawalFormValues {
  amount: number
  notes: string
}

export interface WithdrawalRequestViewModel {
  id: string
  amount: string
  status: WithdrawalStatus
  notes: string
  createdAt: string
}

export interface WalletSummary {
  availableBalance: string
  totalCommissions: string
  pendingWithdrawals: string
}
