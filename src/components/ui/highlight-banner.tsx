interface HighlightBannerProps {
  title: string
  description: string
}

export function HighlightBanner({ title, description }: HighlightBannerProps) {
  return (
    <section className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-slate-900 p-5">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Premium mode</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-200">{description}</p>
    </section>
  )
}
