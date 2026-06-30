import { FormInput } from '../../components/ui/form-input'
import { PasswordStrengthMeter } from '../../components/ui/password-strength-meter'
import type { ManagerRegistrationFormApi } from './registration-types'

interface RegistrationStepSecurityProps {
  form: ManagerRegistrationFormApi
}

export function RegistrationStepSecurity({ form }: RegistrationStepSecurityProps) {
  return (
    <div className="space-y-4">
      <FormInput label="Contraseña" type="password" placeholder="••••••••" registration={form.register('password')} error={form.errors.password?.message} />
      <PasswordStrengthMeter password={form.values.password} />
      <FormInput label="Confirmar contraseña" type="password" placeholder="••••••••" registration={form.register('confirmPassword')} error={form.errors.confirmPassword?.message} />
    </div>
  )
}
