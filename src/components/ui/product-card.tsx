import { Image, Package2 } from 'lucide-react'
import type { ProductViewModel } from '../../types/product'
import { GlassCard } from './glass-card'
import { StatusBadge } from './status-badge'

interface ProductCardProps {
  product: ProductViewModel
}

export function ProductCard({ product }: ProductCardProps) {
  const stockBadge = product.stock <= 20 ? 'Pendiente' : 'Confirmado'

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
            <Image size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{product.name}</h4>
            <p className="text-sm text-slate-400">{product.category}</p>
          </div>
        </div>
        <StatusBadge value={stockBadge} />
      </div>
      <p className="text-sm text-slate-300">{product.description}</p>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-2xl bg-slate-950/40 p-3">
          <p className="text-slate-400">Precio</p>
          <strong className="text-white">{product.price}</strong>
        </div>
        <div className="rounded-2xl bg-slate-950/40 p-3">
          <p className="text-slate-400">Stock</p>
          <strong className="text-white">{product.stock}</strong>
        </div>
        <div className="rounded-2xl bg-slate-950/40 p-3">
          <p className="text-slate-400">Comisión</p>
          <strong className="text-white">{product.commissionPercent}%</strong>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Package2 size={14} />
        <span>Imagen preparada: {product.imageUrl}</span>
      </div>
    </GlassCard>
  )
}
