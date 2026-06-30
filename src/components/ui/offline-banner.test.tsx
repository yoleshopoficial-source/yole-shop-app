import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OfflineBanner } from './offline-banner'

describe('OfflineBanner', () => {
  it('shows online state', () => {
    render(<OfflineBanner isOnline={true} pendingItems={2} />)
    expect(screen.getByText(/Conectado/i)).toBeInTheDocument()
  })

  it('shows offline state', () => {
    render(<OfflineBanner isOnline={false} pendingItems={3} />)
    expect(screen.getByText(/Sin conexión/i)).toBeInTheDocument()
  })
})
