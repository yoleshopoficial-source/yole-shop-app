import { motion } from 'framer-motion'
import type { StatCardItem } from '../../types/ui'
import { GlassCard } from './glass-card'

interface StatCardProps {
  item: StatCardItem
}

export function StatCard({ item }: StatCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <GlassCard>
        <p className="text-sm text-slate-400">{item.label}</p>
        <strong className="mt-3 block text-2xl text-white">{item.value}</strong>
        <span className="mt-2 inline-block rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
          {item.trend}
        </span>
      </GlassCard>
    </motion.div>
  )
}
