import { useCallback, useEffect, useState } from 'react'
import { EmptyState } from '../../components/ui/empty-state'
import { ListTile } from '../../components/ui/list-tile'
import { PresenceBadge } from '../../components/ui/presence-badge'
import { SectionTitle } from '../../components/ui/section-title'
import { useRealtimePresence } from '../../hooks/use-realtime-presence'
import { useWindowPresenceLifecycle } from '../../hooks/use-window-presence-lifecycle'
import { listPresenceUsers, setPresence } from '../../services/chat-service'
import type { PresenceUser } from '../../types/chat'

export function PresencePanel() {
  const [users, setUsers] = useState<PresenceUser[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  useWindowPresenceLifecycle()

  const loadPresence = useCallback(() => {
    listPresenceUsers()
      .then(setUsers)
      .catch((error) => {
        setErrorMessage(
          error instanceof Error ? error.message : 'No se pudo cargar presencia.',
        )
      })
  }, [])

  useRealtimePresence({ onPresenceChange: loadPresence })

  useEffect(() => {
    setPresence('online').catch(() => undefined)
    loadPresence()

    return () => {
      setPresence('offline').catch(() => undefined)
    }
  }, [loadPresence])

  return (
    <section className="space-y-3">
      <SectionTitle title="Gestores conectados y presencia" />
      {errorMessage ? <EmptyState title="Error" description={errorMessage} /> : null}
      {!errorMessage && users.length === 0 ? (
        <EmptyState
          title="Sin presencia activa"
          description="No hay usuarios visibles ahora mismo."
        />
      ) : null}
      {users.map((user) => (
        <ListTile
          key={user.profileId}
          title={`${user.fullName} · ${user.role}`}
          subtitle={`Última actividad: ${user.lastSeenAt}`}
          aside={<PresenceBadge status={user.status} />}
        >
          <p className="text-sm text-slate-400">
            Chat global: {user.canGlobalChat ? 'habilitado' : 'bloqueado'}
          </p>
        </ListTile>
      ))}
    </section>
  )
}
