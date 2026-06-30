import { useEffect, useState } from 'react'
import { EmptyState } from '../../components/ui/empty-state'
import { ListTile } from '../../components/ui/list-tile'
import { NotificationBanner } from '../../components/ui/notification-banner'
import { SectionTitle } from '../../components/ui/section-title'
import { StatusBadge } from '../../components/ui/status-badge'
import { WalletSummaryCard } from '../../components/ui/wallet-summary-card'
import { saveWithdrawalOffline } from '../../services/offline-service'
import {
  createWithdrawalRequest,
  getWalletSummary,
  listWalletMovements,
  listWithdrawalRequests,
} from '../../services/wallet-service'
import { useNetworkStore } from '../../stores/network-store'
import type {
  WalletMovementViewModel,
  WalletSummary,
  WithdrawalFormValues,
  WithdrawalRequestViewModel,
} from '../../types/wallet'
import { WithdrawalForm } from './withdrawal-form'

const emptySummary: WalletSummary = {
  availableBalance: '$ 0.00',
  totalCommissions: '$ 0.00',
  pendingWithdrawals: '$ 0.00',
}

export function WalletPanel() {
  const isOnline = useNetworkStore((state) => state.isOnline)
  const enqueueSyncItem = useNetworkStore((state) => state.enqueueSyncItem)
  const [summary, setSummary] = useState<WalletSummary>(emptySummary)
  const [movements, setMovements] = useState<WalletMovementViewModel[]>([])
  const [requests, setRequests] = useState<WithdrawalRequestViewModel[]>([])
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  async function loadWallet() {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const [summaryData, movementsData, requestsData] = await Promise.all([
        getWalletSummary(),
        listWalletMovements(),
        listWithdrawalRequests(),
      ])

      setSummary(summaryData)
      setMovements(movementsData)
      setRequests(requestsData)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudo cargar la billetera.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadWallet()
  }, [])

  async function handleWithdrawal(values: WithdrawalFormValues) {
    try {
      if (!isOnline) {
        const payload = JSON.stringify(values)
        saveWithdrawalOffline(payload)
        enqueueSyncItem({
          id: crypto.randomUUID(),
          type: 'withdrawal-create',
          payload,
          createdAt: new Date().toISOString(),
        })
        setNotification('Sin conexión: retiro guardado en cola para sincronización.')
        return
      }

      await createWithdrawalRequest(values)
      setNotification('Solicitud de retiro creada correctamente.')
      await loadWallet()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudo crear la solicitud.',
      )
    }
  }

  return (
    <div className="space-y-5">
      {notification ? <NotificationBanner message={notification} tone="success" /> : null}
      {errorMessage ? <NotificationBanner message={errorMessage} tone="error" /> : null}
      <WalletSummaryCard summary={summary} />
      <WithdrawalForm onSubmit={handleWithdrawal} />
      <section className="space-y-3">
        <SectionTitle title="Historial de movimientos" />
        {isLoading ? (
          <EmptyState
            title="Cargando movimientos"
            description="Consultando comisiones, ajustes y retiros desde la base de datos."
          />
        ) : null}
        {!isLoading && !errorMessage && movements.length === 0 ? (
          <EmptyState
            title="Sin movimientos"
            description="Aún no hay comisiones o ajustes registrados para esta cuenta."
          />
        ) : null}
        {!isLoading && !errorMessage
          ? movements.map((movement) => (
              <ListTile
                key={movement.id}
                title={movement.title}
                subtitle={movement.date}
                aside={<span className="text-sm text-white">{movement.amount}</span>}
              />
            ))
          : null}
      </section>
      <section className="space-y-3">
        <SectionTitle title="Solicitudes de retiro" />
        {!isLoading && !errorMessage && requests.length === 0 ? (
          <EmptyState
            title="Sin solicitudes"
            description="Todavía no existen retiros solicitados para este usuario."
          />
        ) : null}
        {!isLoading && !errorMessage
          ? requests.map((request) => (
              <ListTile
                key={request.id}
                title={request.amount}
                subtitle={request.createdAt}
                aside={<StatusBadge value={request.status} />}
              >
                <p className="text-sm text-slate-300">{request.notes}</p>
              </ListTile>
            ))
          : null}
      </section>
    </div>
  )
}
