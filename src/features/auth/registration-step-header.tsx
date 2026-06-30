interface RegistrationStepHeaderProps {
  step: number
}

const labels = {
  1: 'Identidad básica',
  2: 'Información personal y operativa',
  3: 'Seguridad de la cuenta',
  4: 'Políticas y confirmación',
} as const

export function RegistrationStepHeader({ step }: RegistrationStepHeaderProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
        Paso {step} de 4
      </p>
      <h3 className="text-lg font-semibold text-white">
        {labels[step as keyof typeof labels]}
      </h3>
    </div>
  )
}
