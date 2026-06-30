import type { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
  label: string
  type?: string
  placeholder: string
  error?: string
  registration: UseFormRegisterReturn
}

export function FormInput({
  label,
  type = 'text',
  placeholder,
  error,
  registration,
}: FormInputProps) {
  return (
    <label className="space-y-2 text-sm text-slate-300">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        {...registration}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none"
      />
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </label>
  )
}
