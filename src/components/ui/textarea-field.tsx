interface TextareaFieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
}

export function TextareaField({
  label,
  placeholder,
  value,
  onChange,
  error,
}: TextareaFieldProps) {
  return (
    <label className="space-y-2 text-sm text-slate-300">
      <span>{label}</span>
      <textarea
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none"
      />
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </label>
  )
}
