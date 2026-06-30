import { useAuthStore } from '../../stores/auth-store'

interface AuthStatusRowProps {
  onSignOut: () => Promise<void>
}

export function AuthStatusRow({ onSignOut }: AuthStatusRowProps) {
  const userEmail = useAuthStore((state) => state.userEmail)

  return (
    <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
      <span>{userEmail || 'Sin sesión activa'}</span>
      <button type="button" onClick={() => void onSignOut()} className="text-rose-300">
        Cerrar sesión
      </button>
    </div>
  )
}
