import { motion } from 'framer-motion'
import { ChartColumn, House, Package, Receipt, Wallet } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { routePaths } from '../../routes/route-paths'

const items = [
  { to: routePaths.home, label: 'Inicio', icon: House },
  { to: routePaths.dashboard, label: 'Panel', icon: ChartColumn },
  { to: routePaths.products, label: 'Productos', icon: Package },
  { to: routePaths.orders, label: 'Pedidos', icon: Receipt },
  { to: routePaths.wallet, label: 'Billetera', icon: Wallet },
]

export function BottomNav() {
  return (
    <nav
      className="mt-6 grid grid-cols-5 gap-2 rounded-[28px] border border-white/10 bg-slate-900/80 p-3 backdrop-blur-xl"
      aria-label="Navegación principal"
    >
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} aria-label={label}>
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.96 }}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-[11px] text-slate-300',
                isActive && 'bg-cyan-400/15 text-cyan-300',
              )}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </motion.div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
