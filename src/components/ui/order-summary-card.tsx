import { GlassCard } from './glass-card'

interface OrderSummaryCardProps {
  productName: string
  sizes: string
  paymentType: string
}

export function OrderSummaryCard({
  productName,
  sizes,
  paymentType,
}: OrderSummaryCardProps) {
  return (
    <GlassCard className="space-y-2">
      <p className="text-sm text-slate-400">Resumen operativo del pedido</p>
      <strong className="text-lg text-white">{productName || 'Producto pendiente'}</strong>
      <p className="text-sm text-slate-300">Tallas: {sizes || 'Sin definir'}</p>
      <p className="text-sm text-slate-300">Pago: {paymentType}</p>
    </GlassCard>
  )
}
