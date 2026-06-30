import { motion } from 'framer-motion'
import type { QuickActionItem } from '../../types/ui'
import { GlassCard } from './glass-card'

interface QuickActionCardProps {
  item: QuickActionItem
}

export function QuickActionCard({ item }: QuickActionCardProps) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }}>
      <GlassCard className="h-full">
        <h4 className="text-base font-semibold text-white">{item.title}</h4>
        <p className="mt-2 text-sm text-slate-300">{item.description}</p>
      </GlassCard>
    </motion.div>
  )
}
