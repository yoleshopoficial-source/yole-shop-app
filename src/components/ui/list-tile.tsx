import type { PropsWithChildren } from 'react'

interface ListTileProps extends PropsWithChildren {
  title: string
  subtitle: string
  aside?: React.ReactNode
}

export function ListTile({ title, subtitle, aside, children }: ListTileProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-slate-950/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>
        {aside}
      </div>
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  )
}
