import { useEffect, useState } from 'react'
import { OfflineBanner } from '../../components/ui/offline-banner'
import { SecurityStatusCard } from '../../components/ui/security-status-card'
import { getClientSecuritySignal } from '../../lib/security-guard'
import { processPendingSyncQueue } from '../../services/offline-service'
import { useNetworkStore } from '../../stores/network-store'
import type { ClientSecuritySignal } from '../../types/security'

const defaultSignal: ClientSecuritySignal = {
  score: 100,
  blocked: false,
  reasons: [],
}

export function OfflineSecurityPanel() {
  const isOnline = useNetworkStore((state) => state.isOnline)
  const pendingItems = useNetworkStore((state) => state.pendingSync.length)
  const [signal, setSignal] = useState<ClientSecuritySignal>(defaultSignal)

  useEffect(() => {
    setSignal(getClientSecuritySignal())
  }, [])

  useEffect(() => {
    if (isOnline) {
      processPendingSyncQueue().catch(() => undefined)
    }
  }, [isOnline])

  return (
    <div className="space-y-4">
      <OfflineBanner isOnline={isOnline} pendingItems={pendingItems} />
      <SecurityStatusCard signal={signal} />
    </div>
  )
}
