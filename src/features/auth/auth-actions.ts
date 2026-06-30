import { assertRateLimit } from '../../lib/rate-limit-guard'
import { resolveProjectAssignment } from '../../services/round-robin-service'
import {
  recoverPassword,
  signInWithProject,
  signOutFromProject,
  signUpWithProject,
} from '../../services/auth-service'
import { useAuthStore } from '../../stores/auth-store'
import type { ProjectTarget } from '../../types/auth'

export async function handleAuthSignIn(values: {
  email: string
  password: string
}) {
  assertRateLimit('auth-sign-in', 5, 60_000)
  const session = useAuthStore.getState()

  if (!session.activeProject) {
    throw new Error('Selecciona primero el proyecto correcto del usuario.')
  }

  const { error } = await signInWithProject(values, session.activeProject)

  if (error) {
    throw error
  }

  session.setSession({
    isAuthenticated: true,
    userEmail: values.email,
    role: 'manager',
  })
}

export async function handleAuthSignUp(values: {
  email: string
  password: string
  fullName: string
}) {
  assertRateLimit('auth-sign-up', 4, 60_000)
  const session = useAuthStore.getState()
  const assignedProject = await resolveProjectAssignment(values.email)
  const { error } = await signUpWithProject(values, assignedProject)

  if (error) {
    throw error
  }

  session.setSession({
    activeProject: assignedProject,
    userEmail: values.email,
    role: 'manager',
  })

  return assignedProject
}

export async function handleAuthRecovery(values: { email: string }) {
  assertRateLimit('auth-recovery', 3, 60_000)
  const session = useAuthStore.getState()

  if (!session.activeProject) {
    throw new Error('Selecciona el proyecto del usuario antes de recuperar la cuenta.')
  }

  const { error } = await recoverPassword(values, session.activeProject)

  if (error) {
    throw error
  }
}

export async function handleAuthSignOut() {
  const session = useAuthStore.getState()

  if (!session.activeProject) {
    session.clearSession()
    return
  }

  await signOutFromProject(session.activeProject)
  session.clearSession()
}

export function handleSelectProject(project: ProjectTarget) {
  useAuthStore.getState().setActiveProject(project)
}
