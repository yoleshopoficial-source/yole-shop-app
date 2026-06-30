import { CheckboxField } from '../../components/ui/checkbox-field'
import type { ManagerRegistrationValues } from '../../types/manager-registration'

interface ManagerRegistrationConfirmationsProps {
  values: ManagerRegistrationValues
  errors: Record<string, string | undefined>
  setValue: (name: keyof ManagerRegistrationValues, value: boolean) => void
}

export function ManagerRegistrationConfirmations({
  values,
  errors,
  setValue,
}: ManagerRegistrationConfirmationsProps) {
  return (
    <div className="space-y-3">
      <CheckboxField
        checked={values.acceptedRules}
        onChange={(value) => setValue('acceptedRules', value)}
        label="Confirmo que he leído todas las reglas de YOLE SHOP."
        error={errors.acceptedRules}
      />
      <CheckboxField
        checked={values.committedHonesty}
        onChange={(value) => setValue('committedHonesty', value)}
        label="Me comprometo a trabajar con responsabilidad y honestidad."
        error={errors.committedHonesty}
      />
      <CheckboxField
        checked={values.understandsPayments}
        onChange={(value) => setValue('understandsPayments', value)}
        label="Entiendo el sistema de pagos y comisiones."
        error={errors.understandsPayments}
      />
      <CheckboxField
        checked={values.acceptedPolicies}
        onChange={(value) => setValue('acceptedPolicies', value)}
        label="Acepto la Política de Privacidad y las Condiciones de Uso."
        error={errors.acceptedPolicies}
      />
    </div>
  )
}
