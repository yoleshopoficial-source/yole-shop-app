interface ScreenHeaderProps {
  title: string
  description: string
}

export function ScreenHeader({ title, description }: ScreenHeaderProps) {
  return (
    <header className="space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
        YOLE SHOP APP
      </p>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="max-w-xl text-sm text-slate-300">{description}</p>
    </header>
  )
}
