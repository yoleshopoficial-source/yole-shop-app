import { mapWalletMovement, mapWalletSummary, mapWithdrawalRequest } from '../repositories/wallet/wallet-mappers'
import {
  fetchWalletMovementRows,
  fetchWalletSummaryRows,
  fetchWithdrawalRequestRows,
  insertWithdrawalRequest,
} from '../repositories/wallet/wallet-repository'
import type { WithdrawalFormValues } from '../types/wallet'

export async function getWalletSummary() {
  const { movements, requests } = await fetchWalletSummaryRows()
  const availableBalance = movements.reduce((sum, item) => sum + Number(item.amount), 0)
  const totalCommissions = movements
    .filter((item) => item.movement_type === 'commission')
    .reduce((sum, item) => sum + Number(item.amount), 0)
  const pendingWithdrawals = requests
    .filter((item) => item.status === 'pending')
    .reduce((sum, item) => sum + Number(item.amount), 0)

  return mapWalletSummary(availableBalance, totalCommissions, pendingWithdrawals)
}

export async function listWalletMovements() {
  const rows = await fetchWalletMovementRows()
  return rows.map((item) =>
    mapWalletMovement({
      ...item,
      amount: Number(item.amount),
    }),
  )
}

export async function listWithdrawalRequests() {
  const rows = await fetchWithdrawalRequestRows()
  return rows.map((item) =>
    mapWithdrawalRequest({
      ...item,
      amount: Number(item.amount),
    }),
  )
}

export async function createWithdrawalRequest(values: WithdrawalFormValues) {
  await insertWithdrawalRequest(values)
}
