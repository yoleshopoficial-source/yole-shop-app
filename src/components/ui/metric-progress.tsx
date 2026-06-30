interface MetricProgressProps {
  label: string
  value: string
  percent: number
}

export function MetricProgress({ label, value, percent }: MetricProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800">
        <div
          className="h-2 rounded-full bg-cyan-400"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
