import { cn } from '../../lib/cn'

interface FormSegmentProps {
  active: boolean
  label: string
  onClick: () => void
}

export function FormSegment({ active, label, onClick }: FormSegmentProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-2xl px-4 py-3 text-sm transition',
        active ? 'bg-cyan-400 text-slate-950' : 'bg-slate-950/40 text-slate-300',
      )}
    >
      {label}
    </button>
  )
}
