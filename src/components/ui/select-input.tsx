interface SelectInputProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function SelectInput({
  label,
  options,
  value,
  onChange,
}: SelectInputProps) {
  return (
    <label className="space-y-2 text-sm text-slate-300">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
