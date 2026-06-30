export type AppRoleOption = 'manager' | 'admin' | 'moderator'

export interface ManagerRegistrationValues {
  fullName: string
  username: string
  gmail: string
  phone: string
  age: number
  birthDate: string
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  identityCard: string
  address: string
  bankCardNumber: string
  cardHolder: string
  transferConfirmationPhone: string
  observations: string
  hasSalesExperience: boolean
  password: string
  confirmPassword: string
  acceptedRules: boolean
  committedHonesty: boolean
  understandsPayments: boolean
  acceptedPolicies: boolean
  readPrivacyPolicy: boolean
  readTerms: boolean
}
