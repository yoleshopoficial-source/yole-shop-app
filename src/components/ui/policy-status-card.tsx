interface PolicyStatusCardProps {
  title: string
  description: string
  reviewed: boolean
  onOpen: () => void
}

export function PolicyStatusCard({
  title,
  description,
  reviewed,
  onOpen,
}: PolicyStatusCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`w-full rounded-3xl border p-4 text-left ${
        reviewed
          ? 'border-emerald-400/30 bg-emerald-400/10'
          : 'border-white/10 bg-slate-950/40'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <p className="mt-1 text-sm text-slate-300">{description}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            reviewed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-300'
          }`}
        >
          {reviewed ? 'Revisado' : 'Pendiente'}
        </span>
      </div>
    </button>
  )
}
