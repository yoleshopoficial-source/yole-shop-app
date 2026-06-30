import { useEffect, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from '../../components/ui/chart-card'
import { EmptyState } from '../../components/ui/empty-state'
import { KpiCard } from '../../components/ui/kpi-card'
import { NotificationBanner } from '../../components/ui/notification-banner'
import { ReportTable } from '../../components/ui/report-table'
import { SectionTitle } from '../../components/ui/section-title'
import { getDashboardReport } from '../../services/dashboard-service'
import { useAuthStore } from '../../stores/auth-store'
import type { DashboardKpi, DashboardReport } from '../../types/dashboard'
import { ChatPanel } from './chat-panel'
import { OfflineSecurityPanel } from './offline-security-panel'
import { PresencePanel } from './presence-panel'

const emptyReport: DashboardReport = {
  totalRevenue: 0,
  totalOrders: 0,
  soldOrders: 0,
  pendingOrders: 0,
  commissionTotal: 0,
  salesByDay: [],
  statusDistribution: [],
  managerPerformance: [],
}

const pieColors = ['#22d3ee', '#38bdf8', '#818cf8', '#f59e0b', '#fb7185']

export function DashboardPanel() {
  const role = useAuthStore((state) => state.role)
  const [report, setReport] = useState<DashboardReport>(emptyReport)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await getDashboardReport()
        setReport(data)
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'No se pudo cargar el dashboard.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const kpis = useMemo<DashboardKpi[]>(
    () => [
      {
        label: 'Ingresos totales',
        value: `$ ${report.totalRevenue.toFixed(2)}`,
        helper: 'Suma de pedidos del proyecto activo',
      },
      {
        label: 'Pedidos totales',
        value: String(report.totalOrders),
        helper: `${report.pendingOrders} pendientes actualmente`,
      },
      {
        label: 'Pedidos vendidos',
        value: String(report.soldOrders),
        helper: 'Cerrados con comisión generada',
      },
      {
        label: 'Comisiones',
        value: `$ ${report.commissionTotal.toFixed(2)}`,
        helper: 'Acumulado desde wallet_movements',
      },
    ],
    [report],
  )

  return (
    <div className="space-y-5">
      <OfflineSecurityPanel />
      {role === 'admin' ? (
        <NotificationBanner
          message="Vista de administrador activa: acceso a KPIs, presencia y reportes globales del proyecto."
          tone="info"
        />
      ) : (
        <NotificationBanner
          message="Vista de gestor activa: panel centrado en rendimiento, presencia y comunicación operativa."
          tone="info"
        />
      )}
      {errorMessage ? <NotificationBanner message={errorMessage} tone="error" /> : null}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <KpiCard key={item.label} item={item} />
        ))}
      </section>
      {isLoading ? (
        <EmptyState
          title="Cargando dashboard"
          description="Consultando estadísticas reales desde el proyecto activo."
        />
      ) : null}
      {!isLoading ? (
        <section className="grid gap-4 xl:grid-cols-2">
          <ChartCard
            title="Ventas por día"
            description="Evolución diaria de ingresos del proyecto activo."
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={report.salesByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22d3ee" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          <ChartCard
            title="Distribución por estado"
            description="Cómo se reparten los pedidos por estado comercial."
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={report.statusDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                  >
                    {report.statusDistribution.map((entry, index) => (
                      <Cell
                        key={`${entry.name}-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>
      ) : null}
      <PresencePanel />
      <section className="grid gap-4 xl:grid-cols-2">
        <ChatPanel threadType="global" title="Chat global" />
        <ChatPanel threadType="direct_admin" title="Chat directo con administración" />
      </section>
      <section className="space-y-3">
        <SectionTitle title="Reporte por gestores" />
        {!isLoading && report.managerPerformance.length === 0 ? (
          <EmptyState
            title="Sin datos para reportar"
            description="Todavía no hay pedidos suficientes para construir el reporte de gestores."
          />
        ) : null}
        {!isLoading && report.managerPerformance.length > 0 ? (
          <ReportTable rows={report.managerPerformance} />
        ) : null}
      </section>
    </div>
  )
}
