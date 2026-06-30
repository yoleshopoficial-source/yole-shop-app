import type { WithdrawalFormValues } from '../../types/wallet'
import { getCurrentProfileId } from '../profiles/profile-repository'
import { getRepositoryContext } from '../shared/repository-context'

export async function fetchWalletSummaryRows() {
  const { client } = getRepositoryContext()
  const profileId = await getCurrentProfileId('Debes iniciar sesión para consultar la billetera.')
  const movements = await client
    .from('wallet_movements')
    .select('amount, movement_type')
    .eq('profile_id', profileId)
  const requests = await client
    .from('withdrawal_requests')
    .select('amount, status')
    .eq('profile_id', profileId)

  if (movements.error) throw movements.error
  if (requests.error) throw requests.error

  return {
    movements: movements.data || [],
    requests: requests.data || [],
    profileId,
  }
}

export async function fetchWalletMovementRows() {
  const { client } = getRepositoryContext()
  const profileId = await getCurrentProfileId('Debes iniciar sesión para consultar la billetera.')
  const response = await client
    .from('wallet_movements')
    .select('id, amount, movement_type, description, created_at')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false })

  if (response.error) throw response.error
  return response.data || []
}

export async function fetchWithdrawalRequestRows() {
  const { client } = getRepositoryContext()
  const profileId = await getCurrentProfileId('Debes iniciar sesión para consultar la billetera.')
  const response = await client
    .from('withdrawal_requests')
    .select('id, amount, status, notes, created_at')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false })

  if (response.error) throw response.error
  return response.data || []
}

export async function insertWithdrawalRequest(values: WithdrawalFormValues) {
  const { client } = getRepositoryContext()
  const profileId = await getCurrentProfileId('Debes iniciar sesión para crear solicitudes.')
  const response = await client.from('withdrawal_requests').insert({
    profile_id: profileId,
    amount: values.amount,
    status: 'pending',
    notes: values.notes,
  })

  if (response.error) throw response.error
}
