import { registerManager } from '../../services/manager-registration-service'
import type { ManagerRegistrationValues } from '../../types/manager-registration'

export async function submitManagerRegistration(values: ManagerRegistrationValues) {
  return registerManager(values)
}
