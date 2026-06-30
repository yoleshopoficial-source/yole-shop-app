import { useEffect } from 'react'
import { getCurrentClient } from '../lib/current-session'

interface UseRealtimePresenceProps {
  onPresenceChange: () => void
}

export function useRealtimePresence({
  onPresenceChange,
}: UseRealtimePresenceProps) {
  useEffect(() => {
    const client = getCurrentClient()
    const channel = client
      .channel('presence-sessions-stream')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'presence_sessions' },
        () => onPresenceChange(),
      )
      .subscribe()

    return () => {
      client.removeChannel(channel)
    }
  }, [onPresenceChange])
}
