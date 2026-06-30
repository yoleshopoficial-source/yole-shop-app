import { FormInput } from '../../components/ui/form-input'
import type { ManagerRegistrationFormApi } from './registration-types'

interface RegistrationStepIdentityProps {
  form: ManagerRegistrationFormApi
}

export function RegistrationStepIdentity({ form }: RegistrationStepIdentityProps) {
  return (
    <div className="space-y-4">
      <FormInput label="Nombre completo" placeholder="Juan Pérez" registration={form.register('fullName')} error={form.errors.fullName?.message} />
      <FormInput label="Nombre de usuario" placeholder="juanventas" registration={form.register('username')} error={form.errors.username?.message} />
      <FormInput label="Gmail" type="email" placeholder="usuario@gmail.com" registration={form.register('gmail')} error={form.errors.gmail?.message} />
      <FormInput label="Número de teléfono" placeholder="+34 600 000 000" registration={form.register('phone')} error={form.errors.phone?.message} />
      <FormInput label="Carnet de identidad" placeholder="CI-123456" registration={form.register('identityCard')} error={form.errors.identityCard?.message} />
    </div>
  )
}
