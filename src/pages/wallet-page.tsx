import { ScreenContainer } from '../components/ui/screen-container'
import { ScreenHeader } from '../components/ui/screen-header'
import { WalletPanel } from '../features/wallet/wallet-panel'

export function WalletPage() {
  return (
    <ScreenContainer>
      <ScreenHeader
        title="Billetera virtual"
        description="Fase 8: saldo, comisiones, pagos, solicitudes e historial conectados al proyecto activo."
      />
      <WalletPanel />
    </ScreenContainer>
  )
}

export default WalletPage
