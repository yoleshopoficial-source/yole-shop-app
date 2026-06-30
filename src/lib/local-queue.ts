const STORAGE_KEY = 'yole-shop-sync-queue'

export interface LocalQueueRecord {
  id: string
  type: 'order-create' | 'withdrawal-create'
  payload: string
  createdAt: string
}

export function readSyncQueue() {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return [] as LocalQueueRecord[]
  }

  try {
    return JSON.parse(raw) as LocalQueueRecord[]
  } catch {
    return [] as LocalQueueRecord[]
  }
}

export function writeSyncQueue(items: LocalQueueRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function pushSyncQueue(item: LocalQueueRecord) {
  const current = readSyncQueue()
  writeSyncQueue([item, ...current])
}

export function removeSyncQueueItem(id: string) {
  const current = readSyncQueue()
  writeSyncQueue(current.filter((item) => item.id !== id))
}
