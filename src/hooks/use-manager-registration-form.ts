import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { managerRegistrationSchema } from '../lib/manager-registration-schema'
import type { ManagerRegistrationValues } from '../types/manager-registration'

export function useManagerRegistrationForm() {
  return useForm<ManagerRegistrationValues>({
    resolver: zodResolver(managerRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      username: '',
      gmail: '',
      phone: '',
      age: 18,
      birthDate: '',
      gender: 'prefer_not_to_say',
      identityCard: '',
      address: '',
      bankCardNumber: '',
      cardHolder: '',
      transferConfirmationPhone: '',
      observations: '',
      hasSalesExperience: false,
      acceptedRules: false,
      committedHonesty: false,
      understandsPayments: false,
      acceptedPolicies: false,
      readPrivacyPolicy: false,
      readTerms: false,
    },
  })
}
