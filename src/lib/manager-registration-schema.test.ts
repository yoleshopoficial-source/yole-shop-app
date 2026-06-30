import { describe, expect, it } from 'vitest'
import { managerRegistrationSchema } from './manager-registration-schema'

const validPayload = {
  fullName: 'Juan Pérez Díaz',
  username: 'juanventas',
  gmail: 'juanventas@gmail.com',
  phone: '+34600111222',
  age: 25,
  birthDate: '2000-01-10',
  gender: 'male',
  identityCard: 'CI-123456',
  address: 'Calle Principal 123',
  bankCardNumber: '4111 1111 1111 1111',
  cardHolder: 'Juan Pérez Díaz',
  transferConfirmationPhone: '+34600111222',
  observations: 'Trabajo por las tardes',
  hasSalesExperience: true,
  password: 'Abcdef1!',
  confirmPassword: 'Abcdef1!',
  acceptedRules: true,
  committedHonesty: true,
  understandsPayments: true,
  acceptedPolicies: true,
  readPrivacyPolicy: true,
  readTerms: true,
} as const

describe('managerRegistrationSchema', () => {
  it('accepts a valid manager payload', () => {
    const result = managerRegistrationSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it('rejects weak passwords', () => {
    const result = managerRegistrationSchema.safeParse({
      ...validPayload,
      password: 'abc',
      confirmPassword: 'abc',
    })

    expect(result.success).toBe(false)
  })

  it('rejects when passwords do not match', () => {
    const result = managerRegistrationSchema.safeParse({
      ...validPayload,
      confirmPassword: 'Abcdef2!',
    })

    expect(result.success).toBe(false)
  })
})
