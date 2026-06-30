interface OfflineBannerProps {
  isOnline: boolean
  pendingItems: number
}

export function OfflineBanner({ isOnline, pendingItems }: OfflineBannerProps) {
  const label = isOnline
    ? `Conectado · Cola pendiente ${pendingItems}`
    : `Sin conexión · Cola pendiente ${pendingItems}`

  return (
    <div
      className={`mb-4 rounded-2xl border px-4 py-3 text-sm ${
        isOnline
          ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
          : 'border-amber-400/20 bg-amber-400/10 text-amber-200'
      }`}
    >
      {label}
    </div>
  )
}
