import { PolicyStatusCard } from '../../components/ui/policy-status-card'

interface ManagerRegistrationPoliciesProps {
  readPrivacyPolicy: boolean
  readTerms: boolean
  onOpenPrivacy: () => void
  onOpenTerms: () => void
}

export function ManagerRegistrationPolicies({
  readPrivacyPolicy,
  readTerms,
  onOpenPrivacy,
  onOpenTerms,
}: ManagerRegistrationPoliciesProps) {
  return (
    <div className="space-y-3">
      <PolicyStatusCard
        title="Política de Privacidad"
        description="Debes abrirla y revisarla antes de continuar."
        reviewed={readPrivacyPolicy}
        onOpen={onOpenPrivacy}
      />
      <PolicyStatusCard
        title="Condiciones de Uso"
        description="Debes abrirlas y revisarlas antes de continuar."
        reviewed={readTerms}
        onOpen={onOpenTerms}
      />
    </div>
  )
}
