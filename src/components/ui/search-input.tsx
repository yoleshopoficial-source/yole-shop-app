interface SearchInputProps {
  value?: string
  onChange?: (value: string) => void
}

export function SearchInput({ value = '', onChange }: SearchInputProps) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
      <span className="text-slate-500">⌕</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Buscar por nombre, código o categoría"
        className="w-full border-none bg-transparent text-sm text-white outline-none"
      />
    </label>
  )
}
