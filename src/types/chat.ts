export type PresenceStatus = 'online' | 'offline' | 'away'
export type ChatThreadType = 'global' | 'direct_admin'

export interface PresenceUser {
  profileId: string
  fullName: string
  role: 'admin' | 'manager' | 'moderator'
  status: PresenceStatus
  canGlobalChat: boolean
  lastSeenAt: string
}

export interface ChatThreadViewModel {
  id: string
  threadType: ChatThreadType
  createdAt: string
}

export interface ChatMessageViewModel {
  id: string
  body: string
  senderId: string
  recipientId: string | null
  createdAt: string
  readAt: string | null
  expiresAt: string | null
}

export interface ChatDraftValues {
  body: string
}
