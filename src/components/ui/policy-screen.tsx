import { GlassCard } from './glass-card'

interface PolicyScreenProps {
  title: string
  content: string[]
  onBack: () => void
  onConfirmRead: () => void
}

export function PolicyScreen({
  title,
  content,
  onBack,
  onConfirmRead,
}: PolicyScreenProps) {
  return (
    <GlassCard className="space-y-4">
      <button type="button" onClick={onBack} className="text-sm text-cyan-300">
        ← Volver
      </button>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div className="space-y-3 text-sm text-slate-300">
        {content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <button
        type="button"
        onClick={onConfirmRead}
        className="w-full rounded-2xl bg-emerald-400 px-4 py-3 font-medium text-slate-950"
      >
        Confirmar lectura
      </button>
    </GlassCard>
  )
}
