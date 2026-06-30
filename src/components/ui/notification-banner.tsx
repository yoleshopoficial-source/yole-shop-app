interface NotificationBannerProps {
  message: string
  tone?: 'info' | 'success' | 'error'
}

const toneMap = {
  info: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
  success: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
  error: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
}

export function NotificationBanner({
  message,
  tone = 'info',
}: NotificationBannerProps) {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${toneMap[tone]}`}>
      {message}
    </div>
  )
}
