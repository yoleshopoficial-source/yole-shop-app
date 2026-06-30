import { useEffect, useState } from 'react'
import { EmptyState } from '../../components/ui/empty-state'
import { GlassCard } from '../../components/ui/glass-card'
import { ListTile } from '../../components/ui/list-tile'
import { SectionTitle } from '../../components/ui/section-title'
import { StatusBadge } from '../../components/ui/status-badge'
import { listOrders, updateOrderStatus } from '../../services/order-service'
import { useAuthStore } from '../../stores/auth-store'
import type { OrderStatusValue, OrderViewModel } from '../../types/order'

export function AdminOrderReviewPanel() {
  const role = useAuthStore((state) => state.role)
  const [orders, setOrders] = useState<OrderViewModel[]>([])

  async function loadOrders() {
    const data = await listOrders()
    setOrders(data)
  }

  useEffect(() => {
    if (role === 'admin' || role === 'moderator') {
      loadOrders().catch(() => undefined)
    }
  }, [role])

  async function handleAction(id: string, status: OrderStatusValue) {
    await updateOrderStatus(id, status)
    await loadOrders()
  }

  if (role !== 'admin' && role !== 'moderator') {
    return null
  }

  return (
    <GlassCard className="space-y-4">
      <SectionTitle title="Revisión operativa de pedidos" />
      {orders.length === 0 ? (
        <EmptyState
          title="Sin pedidos para revisar"
          description="No hay pedidos operativos visibles en este momento."
        />
      ) : null}
      {orders.map((order) => (
        <ListTile
          key={order.id}
          title={`${order.productName} · ${order.customerName}`}
          subtitle={`${order.sizes} · ${order.totalAmount} · ${order.paymentType}`}
          aside={<StatusBadge value={order.status} />}
        >
          <div className="space-y-3">
            <p className="text-sm text-slate-300">{order.notes}</p>
            <p className="text-sm text-slate-400">
              Teléfono: {order.phone} · Hora: {order.deliveryTime}
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => void handleAction(order.id, 'confirmed')} className="rounded-xl border border-white/10 px-3 py-2 text-xs text-emerald-300">Confirmar</button>
              <button onClick={() => void handleAction(order.id, 'sold')} className="rounded-xl border border-white/10 px-3 py-2 text-xs text-cyan-300">Vender</button>
              <button onClick={() => void handleAction(order.id, 'denied')} className="rounded-xl border border-white/10 px-3 py-2 text-xs text-rose-300">Denegar</button>
            </div>
          </div>
        </ListTile>
      ))}
    </GlassCard>
  )
}
