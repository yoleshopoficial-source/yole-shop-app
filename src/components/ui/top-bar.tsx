import { Bell, Moon, Search, Sun } from 'lucide-react'
import { useThemeStore } from '../../stores/theme-store'

export function TopBar() {
  const mode = useThemeStore((state) => state.mode)
  const toggleMode = useThemeStore((state) => state.toggleMode)
  const Icon = mode === 'dark' ? Sun : Moon

  return (
    <header className="mb-6 flex items-center justify-between gap-3 rounded-[28px] border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80">
          Android Premium UI
        </p>
        <h1 className="text-lg font-semibold text-white">YOLE Shop App</h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="rounded-full border border-white/10 p-2 text-slate-300"
          aria-label="Buscar"
        >
          <Search size={18} />
        </button>
        <button
          className="rounded-full border border-white/10 p-2 text-slate-300"
          aria-label="Notificaciones"
        >
          <Bell size={18} />
        </button>
        <button
          type="button"
          onClick={toggleMode}
          className="rounded-full border border-white/10 p-2 text-slate-300"
          aria-label="Cambiar tema"
        >
          <Icon size={18} />
        </button>
      </div>
    </header>
  )
}
