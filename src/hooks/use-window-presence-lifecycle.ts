import { useEffect } from 'react'
import { setPresence } from '../services/chat-service'

export function useWindowPresenceLifecycle() {
  useEffect(() => {
    function handleVisibilityChange() {
      const status = document.hidden ? 'away' : 'online'
      setPresence(status).catch(() => undefined)
    }

    function handleBeforeUnload() {
      setPresence('offline').catch(() => undefined)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
}
