import { HighlightBanner } from '../components/ui/highlight-banner'
import { QuickActionCard } from '../components/ui/quick-action-card'
import { ScreenContainer } from '../components/ui/screen-container'
import { ScreenHeader } from '../components/ui/screen-header'
import { SectionTitle } from '../components/ui/section-title'
import { StatCard } from '../components/ui/stat-card'
import { homeStats, quickActions } from '../services/mock-data'

export function HomePage() {
  return (
    <ScreenContainer>
      <ScreenHeader
        title="Centro de operaciones"
        description="Vista principal pensada para actuar como aplicación Android premium con accesos rápidos y métricas clave."
      />
      <HighlightBanner
        title="Control comercial en tiempo real"
        description="Monitorea pedidos, productos, comisiones y actividad del equipo desde una experiencia móvil clara y veloz."
      />
      <section className="grid gap-4 md:grid-cols-3" aria-label="Métricas principales">
        {homeStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>
      <section className="space-y-3" aria-label="Acciones rápidas">
        <SectionTitle title="Acciones rápidas" action="Personalizar" />
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((item) => (
            <QuickActionCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </ScreenContainer>
  )
}

export default HomePage
