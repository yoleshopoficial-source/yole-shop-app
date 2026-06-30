import { useState } from 'react'
import { GlassCard } from '../../components/ui/glass-card'
import {
  handleAuthRecovery,
  handleAuthSignIn,
  handleAuthSignOut,
  handleAuthSignUp,
} from './auth-actions'
import { AuthModeTabs, type AuthMode } from './auth-mode-tabs'
import { AuthProjectSelector } from './auth-project-selector'
import { AuthStatusRow } from './auth-status-row'
import { RecoveryForm } from './recovery-form'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'

export function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>('sign-in')
  const [feedback, setFeedback] = useState('')

  async function onSignIn(values: { email: string; password: string }) {
    try {
      await handleAuthSignIn(values)
      setFeedback('Inicio de sesión correcto.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Error inesperado.')
    }
  }

  async function onSignUp(values: {
    email: string
    password: string
    fullName: string
  }) {
    try {
      const project = await handleAuthSignUp(values)
      setFeedback(`Registro enviado al ${project}. Revisa tu correo.`)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Error inesperado.')
    }
  }

  async function onRecovery(values: { email: string }) {
    try {
      await handleAuthRecovery(values)
      setFeedback('Correo de recuperación enviado.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Error inesperado.')
    }
  }

  return (
    <GlassCard className="space-y-4">
      <AuthProjectSelector onFeedback={setFeedback} />
      <AuthModeTabs mode={mode} setMode={setMode} />
      {mode === 'sign-in' ? <SignInForm onSubmit={onSignIn} /> : null}
      {mode === 'sign-up' ? <SignUpForm onSubmit={onSignUp} /> : null}
      {mode === 'recovery' ? <RecoveryForm onSubmit={onRecovery} /> : null}
      <AuthStatusRow onSignOut={handleAuthSignOut} />
      {feedback ? <p className="text-sm text-slate-300">{feedback}</p> : null}
    </GlassCard>
  )
}
