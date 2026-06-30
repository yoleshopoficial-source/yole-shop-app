import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { readSyncQueue } from '../lib/local-queue'
import { useNetworkStore } from '../stores/network-store'

export function NetworkProvider({ children }: PropsWithChildren) {
  const setOnlineStatus = useNetworkStore((state) => state.setOnlineStatus)
  const enqueueSyncItem = useNetworkStore((state) => state.enqueueSyncItem)

  useEffect(() => {
    setOnlineStatus(navigator.onLine)

    const storedItems = readSyncQueue()
    storedItems.forEach((item) => enqueueSyncItem(item))

    function handleOnline() {
      setOnlineStatus(true)
    }

    function handleOffline() {
      setOnlineStatus(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [enqueueSyncItem, setOnlineStatus])

  return children
}
