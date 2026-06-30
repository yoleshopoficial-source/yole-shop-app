import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import type { ManagerRegistrationValues } from '../../types/manager-registration'

export interface ManagerRegistrationFormApi {
  register: UseFormRegister<ManagerRegistrationValues>
  setValue: UseFormSetValue<ManagerRegistrationValues>
  errors: FieldErrors<ManagerRegistrationValues>
  values: ManagerRegistrationValues
}

export interface ManagerRegistrationControlProps {
  control: Control<ManagerRegistrationValues>
}
