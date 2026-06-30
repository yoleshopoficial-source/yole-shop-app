import { Controller } from 'react-hook-form'
import { CheckboxField } from '../../components/ui/checkbox-field'
import { FormInput } from '../../components/ui/form-input'
import { SelectInput } from '../../components/ui/select-input'
import { TextareaField } from '../../components/ui/textarea-field'
import type {
  ManagerRegistrationControlProps,
  ManagerRegistrationFormApi,
} from './registration-types'

interface RegistrationStepProfileProps extends ManagerRegistrationControlProps {
  form: ManagerRegistrationFormApi
}

export function RegistrationStepProfile({
  form,
  control,
}: RegistrationStepProfileProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput label="Edad" type="number" placeholder="18" registration={form.register('age', { valueAsNumber: true })} error={form.errors.age?.message} />
        <FormInput label="Fecha de nacimiento" type="date" placeholder="" registration={form.register('birthDate')} error={form.errors.birthDate?.message} />
      </div>
      <Controller control={control} name="gender" render={({ field }) => <SelectInput label="Género" value={field.value} onChange={field.onChange} options={['male', 'female', 'other', 'prefer_not_to_say']} />} />
      <FormInput label="Dirección" placeholder="Calle Principal 123" registration={form.register('address')} error={form.errors.address?.message} />
      <FormInput label="Número de tarjeta bancaria" placeholder="0000 0000 0000 0000" registration={form.register('bankCardNumber')} error={form.errors.bankCardNumber?.message} />
      <FormInput label="Titular de la tarjeta" placeholder="Juan Pérez" registration={form.register('cardHolder')} error={form.errors.cardHolder?.message} />
      <FormInput label="Número para confirmar la transferencia" placeholder="+34 611 111 111" registration={form.register('transferConfirmationPhone')} error={form.errors.transferConfirmationPhone?.message} />
      <Controller control={control} name="observations" render={({ field }) => <TextareaField label="Observaciones" placeholder="Soy estudiante. Trabajo por las tardes. Solo puedo vender los fines de semana." value={field.value} onChange={field.onChange} error={form.errors.observations?.message} />} />
      <Controller control={control} name="hasSalesExperience" render={({ field }) => <CheckboxField checked={field.value} onChange={field.onChange} label="Tengo experiencia en ventas" />} />
    </div>
  )
}
