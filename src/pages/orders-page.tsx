import { ScreenContainer } from '../components/ui/screen-container'
import { ScreenHeader } from '../components/ui/screen-header'
import { OrdersPanel } from '../features/orders/orders-panel'

export function OrdersPage() {
  return (
    <ScreenContainer>
      <ScreenHeader
        title="Gestión de pedidos"
        description="Fase 7: pedidos conectados al proyecto activo con estados comerciales y feedback visual."
      />
      <OrdersPanel />
    </ScreenContainer>
  )
}

export default OrdersPage
