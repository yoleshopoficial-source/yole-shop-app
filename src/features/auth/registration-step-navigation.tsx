interface RegistrationStepNavigationProps {
  step: number
  canContinue: boolean
  canSubmit: boolean
  onBack: () => void
  onNext: () => void
}

export function RegistrationStepNavigation({
  step,
  canContinue,
  canSubmit,
  onBack,
  onNext,
}: RegistrationStepNavigationProps) {
  return (
    <div className="flex items-center gap-3">
      {step > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-2xl border border-white/10 px-4 py-3 text-slate-300"
        >
          Atrás
        </button>
      ) : null}
      {step < 4 ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="flex-1 rounded-2xl bg-cyan-400 px-4 py-3 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continuar
        </button>
      ) : (
        <button
          type="submit"
          disabled={!canSubmit}
          className="flex-1 rounded-2xl bg-cyan-400 px-4 py-3 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Crear cuenta
        </button>
      )}
    </div>
  )
}
