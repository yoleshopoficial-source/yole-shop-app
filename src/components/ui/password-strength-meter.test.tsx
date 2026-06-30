import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PasswordStrengthMeter } from './password-strength-meter'

describe('PasswordStrengthMeter', () => {
  it('renders weak state feedback', () => {
    render(<PasswordStrengthMeter password="abc" />)
    expect(screen.getByText(/Seguridad:/i)).toHaveTextContent('débil')
  })

  it('renders strong state feedback', () => {
    render(<PasswordStrengthMeter password="Abcdef1!" />)
    expect(screen.getByText(/Seguridad:/i)).toHaveTextContent('fuerte')
    expect(screen.getByText(/8 caracteres mínimo/i)).toBeInTheDocument()
  })
})
