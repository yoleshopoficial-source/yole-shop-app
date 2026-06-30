import { useState } from 'react'

export type RegistrationStep = 1 | 2 | 3 | 4

export function useManagerRegistrationStepper() {
  const [step, setStep] = useState<RegistrationStep>(1)

  function nextStep() {
    setStep((current) => (current < 4 ? ((current + 1) as RegistrationStep) : current))
  }

  function previousStep() {
    setStep((current) => (current > 1 ? ((current - 1) as RegistrationStep) : current))
  }

  return { step, nextStep, previousStep, setStep }
}
