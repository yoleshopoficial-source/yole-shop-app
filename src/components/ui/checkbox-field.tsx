interface CheckboxFieldProps {
  checked: boolean
  label: string
  onChange: (value: boolean) => void
  error?: string
}

export function CheckboxField({
  checked,
  label,
  onChange,
  error,
}: CheckboxFieldProps) {
  return (
    <label className="space-y-2 text-sm text-slate-300">
      <span className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-4 w-4"
        />
        <span>{label}</span>
      </span>
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </label>
  )
}
