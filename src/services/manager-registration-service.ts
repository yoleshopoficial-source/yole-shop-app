import { signUpWithProject } from './auth-service'
import { useAuthStore } from '../stores/auth-store'
import type { ManagerRegistrationValues } from '../types/manager-registration'
import { resolveProjectAssignment } from './round-robin-service'
import {
  assertManagerRegistrationUniqueness,
  updateManagerProfile,
} from '../repositories/profiles/manager-registration-repository'
import { getProjectClient } from '../lib/project-client'

export async function registerManager(values: ManagerRegistrationValues) {
  const assignedProject = await resolveProjectAssignment(values.gmail)
  useAuthStore.getState().setActiveProject(assignedProject)

  await assertManagerRegistrationUniqueness(values)

  const signUpResponse = await signUpWithProject(
    {
      email: values.gmail,
      password: values.password,
      fullName: values.fullName,
    },
    assignedProject,
  )

  if (signUpResponse.error) {
    throw signUpResponse.error
  }

  const userId = signUpResponse.data.user?.id

  if (!userId) {
    throw new Error('No se pudo obtener el identificador del nuevo gestor.')
  }

  await updateManagerProfile(userId, values)

  const client = getProjectClient(assignedProject)
  await client.auth.signOut()

  return assignedProject
}
