import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { withdrawalSchema } from '../lib/wallet-schemas'
import type { WithdrawalFormValues } from '../types/wallet'

export function useWithdrawalForm() {
  return useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: 0,
      notes: '',
    },
  })
}
