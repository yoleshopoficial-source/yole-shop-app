import { ManagerRegistrationConfirmations } from './manager-registration-confirmations'
import { ManagerRegistrationPolicies } from './manager-registration-policies'
import type { ManagerRegistrationValues } from '../../types/manager-registration'

interface RegistrationStepConfirmationProps {
  values: ManagerRegistrationValues
  errors: Record<string, string | undefined>
  setValue: (name: keyof ManagerRegistrationValues, value: boolean) => void
  onOpenPrivacy: () => void
  onOpenTerms: () => void
}

export function RegistrationStepConfirmation({
  values,
  errors,
  setValue,
  onOpenPrivacy,
  onOpenTerms,
}: RegistrationStepConfirmationProps) {
  return (
    <div className="space-y-4">
      <ManagerRegistrationPolicies
        readPrivacyPolicy={values.readPrivacyPolicy}
        readTerms={values.readTerms}
        onOpenPrivacy={onOpenPrivacy}
        onOpenTerms={onOpenTerms}
      />
      <ManagerRegistrationConfirmations
        values={values}
        errors={errors}
        setValue={setValue}
      />
    </div>
  )
}
