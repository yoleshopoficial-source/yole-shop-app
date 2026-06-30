import { pushSyncQueue, readSyncQueue, removeSyncQueueItem } from '../lib/local-queue'
import { createOrder } from './order-service'
import { createWithdrawalRequest } from './wallet-service'

export async function processPendingSyncQueue() {
  const items = readSyncQueue()

  for (const item of items) {
    const payload = JSON.parse(item.payload)

    if (item.type === 'order-create') {
      await createOrder(payload)
    }

    if (item.type === 'withdrawal-create') {
      await createWithdrawalRequest(payload)
    }

    removeSyncQueueItem(item.id)
  }
}

export function saveOrderOffline(payload: string) {
  pushSyncQueue({
    id: crypto.randomUUID(),
    type: 'order-create',
    payload,
    createdAt: new Date().toISOString(),
  })
}

export function saveWithdrawalOffline(payload: string) {
  pushSyncQueue({
    id: crypto.randomUUID(),
    type: 'withdrawal-create',
    payload,
    createdAt: new Date().toISOString(),
  })
}
