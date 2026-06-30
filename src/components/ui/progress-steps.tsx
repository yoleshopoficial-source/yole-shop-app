interface ProgressStepsProps {
  currentStep: number
  totalSteps: number
}

export function ProgressSteps({ currentStep, totalSteps }: ProgressStepsProps) {
  const progress = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Progreso del registro</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800">
        <div
          className="h-2 rounded-full bg-cyan-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
