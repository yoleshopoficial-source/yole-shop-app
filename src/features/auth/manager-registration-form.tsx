import { useState } from 'react'
import { GlassCard } from '../../components/ui/glass-card'
import { PolicyScreen } from '../../components/ui/policy-screen'
import { ProgressSteps } from '../../components/ui/progress-steps'
import { useManagerRegistrationForm } from '../../hooks/use-manager-registration-form'
import { useManagerRegistrationStepper } from '../../hooks/use-manager-registration-stepper'
import type { ManagerRegistrationValues } from '../../types/manager-registration'
import { privacyPolicyContent, termsContent } from './manager-policy-content'
import { submitManagerRegistration } from './manager-registration-actions'
import { RegistrationStepConfirmation } from './registration-step-confirmation'
import { RegistrationStepHeader } from './registration-step-header'
import { RegistrationStepIdentity } from './registration-step-identity'
import { RegistrationStepNavigation } from './registration-step-navigation'
import { RegistrationStepProfile } from './registration-step-profile'
import { RegistrationStepSecurity } from './registration-step-security'

type PolicyView = 'form' | 'privacy' | 'terms'

export function ManagerRegistrationForm() {
  const [feedback, setFeedback] = useState('')
  const [policyView, setPolicyView] = useState<PolicyView>('form')
  const form = useManagerRegistrationForm()
  const stepper = useManagerRegistrationStepper()
  const values = form.watch()
  const canSubmit = form.formState.isValid

  async function onSubmit(data: ManagerRegistrationValues) {
    try {
      const project = await submitManagerRegistration(data)
      setFeedback(`Solicitud enviada correctamente al ${project}.`)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Error inesperado.')
    }
  }

  async function goNextStep() {
    const fieldsByStep: Record<number, Array<keyof ManagerRegistrationValues>> = {
      1: ['fullName', 'username', 'gmail', 'phone', 'identityCard'],
      2: [
        'age',
        'birthDate',
        'gender',
        'address',
        'bankCardNumber',
        'cardHolder',
        'transferConfirmationPhone',
        'observations',
        'hasSalesExperience',
      ],
      3: ['password', 'confirmPassword'],
      4: [],
    }

    const valid = await form.trigger(fieldsByStep[stepper.step])

    if (valid) {
      stepper.nextStep()
    }
  }

  if (policyView === 'privacy') {
    return <PolicyScreen title="Política de Privacidad" content={privacyPolicyContent} onBack={() => setPolicyView('form')} onConfirmRead={() => { form.setValue('readPrivacyPolicy', true, { shouldValidate: true }); setPolicyView('form') }} />
  }

  if (policyView === 'terms') {
    return <PolicyScreen title="Condiciones de Uso" content={termsContent} onBack={() => setPolicyView('form')} onConfirmRead={() => { form.setValue('readTerms', true, { shouldValidate: true }); setPolicyView('form') }} />
  }

  const formApi = {
    register: form.register,
    setValue: form.setValue,
    errors: form.formState.errors,
    values,
  }

  return (
    <GlassCard className="space-y-5">
      <RegistrationStepHeader step={stepper.step} />
      <ProgressSteps currentStep={stepper.step} totalSteps={4} />
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {stepper.step === 1 ? <RegistrationStepIdentity form={formApi} /> : null}
        {stepper.step === 2 ? <RegistrationStepProfile form={formApi} control={form.control} /> : null}
        {stepper.step === 3 ? <RegistrationStepSecurity form={formApi} /> : null}
        {stepper.step === 4 ? <RegistrationStepConfirmation values={values} errors={{ acceptedRules: form.formState.errors.acceptedRules?.message, committedHonesty: form.formState.errors.committedHonesty?.message, understandsPayments: form.formState.errors.understandsPayments?.message, acceptedPolicies: form.formState.errors.acceptedPolicies?.message }} setValue={(name, value) => form.setValue(name, value, { shouldValidate: true })} onOpenPrivacy={() => setPolicyView('privacy')} onOpenTerms={() => setPolicyView('terms')} /> : null}
        <RegistrationStepNavigation step={stepper.step} canContinue={true} canSubmit={canSubmit} onBack={stepper.previousStep} onNext={() => void goNextStep()} />
      </form>
      {feedback ? <p className="text-sm text-slate-300">{feedback}</p> : null}
    </GlassCard>
  )
}
