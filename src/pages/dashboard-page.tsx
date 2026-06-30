import { ScreenContainer } from '../components/ui/screen-container'
import { ScreenHeader } from '../components/ui/screen-header'
import { DashboardPanel } from '../features/dashboard/dashboard-panel'

export function DashboardPage() {
  return (
    <ScreenContainer>
      <ScreenHeader
        title="Dashboard ejecutivo"
        description="Fase 9: paneles para administrador y gestor con KPIs, gráficos y reportes del proyecto activo."
      />
      <DashboardPanel />
    </ScreenContainer>
  )
}

export default DashboardPage
