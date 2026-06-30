import { useEffect, useState } from 'react'
import { EmptyState } from '../../components/ui/empty-state'
import { GlassCard } from '../../components/ui/glass-card'
import { ListTile } from '../../components/ui/list-tile'
import { NotificationBanner } from '../../components/ui/notification-banner'
import { SectionTitle } from '../../components/ui/section-title'
import { StatusBadge } from '../../components/ui/status-badge'
import { saveOrderOffline } from '../../services/offline-service'
import { listOrders, updateOrderStatus, createOrder } from '../../services/order-service'
import { useNetworkStore } from '../../stores/network-store'
import type { OrderFormValues, OrderViewModel, OrderStatusValue } from '../../types/order'
import { AdminOrderReviewPanel } from './admin-order-review-panel'
import { OrdersForm } from './orders-form'
import { OrdersStatusActions } from './orders-status-actions'

export function OrdersPanel() {
  const isOnline = useNetworkStore((state) => state.isOnline)
  const enqueueSyncItem = useNetworkStore((state) => state.enqueueSyncItem)
  const [orders, setOrders] = useState<OrderViewModel[]>([])
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  async function loadData() {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const ordersData = await listOrders()
      setOrders(ordersData)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudo cargar pedidos.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleCreateOrder(values: OrderFormValues) {
    try {
      if (!isOnline) {
        const payload = JSON.stringify(values)
        saveOrderOffline(payload)
        enqueueSyncItem({
          id: crypto.randomUUID(),
          type: 'order-create',
          payload,
          createdAt: new Date().toISOString(),
        })
        setNotification('Sin conexión: pedido guardado en cola para sincronización.')
        return
      }

      await createOrder(values)
      setNotification('Pedido creado correctamente.')
      await loadData()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudo crear el pedido.',
      )
    }
  }

  async function handleStatusChange(id: string, status: OrderStatusValue) {
    try {
      await updateOrderStatus(id, status)
      setNotification(`Estado actualizado a ${status}.`)
      await loadData()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudo actualizar el estado.',
      )
    }
  }

  return (
    <div className="space-y-5">
      {notification ? <NotificationBanner message={notification} tone="success" /> : null}
      {errorMessage ? <NotificationBanner message={errorMessage} tone="error" /> : null}
      <OrdersForm onSubmit={handleCreateOrder} />
      <AdminOrderReviewPanel />
      <GlassCard className="space-y-3">
        <SectionTitle title="Estados del pedido" />
        <p className="text-sm text-slate-400">
          Pendiente, confirmado, denegado, vendido y cancelado.
        </p>
      </GlassCard>
      <section className="space-y-3">
        <SectionTitle title="Pedidos operativos" action="Actualizar" />
        {isLoading ? (
          <EmptyState
            title="Cargando pedidos"
            description="Consultando pedidos del proyecto activo."
          />
        ) : null}
        {!isLoading && !errorMessage && orders.length === 0 ? (
          <EmptyState
            title="Sin pedidos registrados"
            description="Crea el primer pedido desde el formulario para comenzar el flujo comercial."
          />
        ) : null}
        {!isLoading && !errorMessage
          ? orders.map((order) => (
              <ListTile
                key={order.id}
                title={`${order.code} · ${order.customerName}`}
                subtitle={`${order.productName} · ${order.totalAmount}`}
                aside={<StatusBadge value={order.status} />}
              >
                <div className="space-y-3">
                  <p className="text-sm text-slate-400">
                    {order.phone} · Tallas {order.sizes} · Pago {order.paymentType}
                  </p>
                  <p className="text-sm text-slate-400">
                    Domicilio {order.deliveryPrice} · Hora {order.deliveryTime}
                  </p>
                  <p className="text-sm text-slate-300">{order.notes}</p>
                  <OrdersStatusActions
                    onChange={(status) => handleStatusChange(order.id, status)}
                  />
                </div>
              </ListTile>
            ))
          : null}
      </section>
    </div>
  )
}
