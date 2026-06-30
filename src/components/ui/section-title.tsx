interface SectionTitleProps {
  title: string
  action?: string
}

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {action ? <button className="text-sm text-cyan-300">{action}</button> : null}
    </div>
  )
}
