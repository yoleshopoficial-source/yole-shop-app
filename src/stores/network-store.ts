import { create } from 'zustand'

interface SyncQueueItem {
  id: string
  type: 'order-create' | 'withdrawal-create'
  payload: string
  createdAt: string
}

interface NetworkStore {
  isOnline: boolean
  pendingSync: SyncQueueItem[]
  setOnlineStatus: (value: boolean) => void
  enqueueSyncItem: (item: SyncQueueItem) => void
  removeSyncItem: (id: string) => void
  clearSyncQueue: () => void
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  isOnline: true,
  pendingSync: [],
  setOnlineStatus: (value) => set({ isOnline: value }),
  enqueueSyncItem: (item) =>
    set((state) => ({ pendingSync: [item, ...state.pendingSync] })),
  removeSyncItem: (id) =>
    set((state) => ({
      pendingSync: state.pendingSync.filter((item) => item.id !== id),
    })),
  clearSyncQueue: () => set({ pendingSync: [] }),
}))
