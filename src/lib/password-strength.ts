export interface PasswordStrengthResult {
  score: number
  label: 'débil' | 'media' | 'fuerte'
  checks: {
    minLength: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    symbol: boolean
  }
}

export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const checks = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }

  const score = Object.values(checks).filter(Boolean).length
  const label = score >= 5 ? 'fuerte' : score >= 3 ? 'media' : 'débil'

  return { score, label, checks }
}
