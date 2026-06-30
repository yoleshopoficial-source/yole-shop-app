import type { UseFormRegisterReturn } from 'react-hook-form'

interface TextareaInputProps {
  label: string
  placeholder: string
  error?: string
  registration: UseFormRegisterReturn
}

export function TextareaInput({
  label,
  placeholder,
  error,
  registration,
}: TextareaInputProps) {
  return (
    <label className="space-y-2 text-sm text-slate-300">
      <span>{label}</span>
      <textarea
        rows={4}
        placeholder={placeholder}
        {...registration}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none"
      />
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </label>
  )
}
