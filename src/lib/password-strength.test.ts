import { describe, expect, it } from 'vitest'
import { evaluatePasswordStrength } from './password-strength'

describe('evaluatePasswordStrength', () => {
  it('detects weak passwords', () => {
    const result = evaluatePasswordStrength('abc')
    expect(result.label).toBe('débil')
    expect(result.checks.uppercase).toBe(false)
  })

  it('detects strong passwords', () => {
    const result = evaluatePasswordStrength('Abcdef1!')
    expect(result.label).toBe('fuerte')
    expect(result.checks.symbol).toBe(true)
    expect(result.score).toBe(5)
  })
})
