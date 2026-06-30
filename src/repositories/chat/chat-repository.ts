import { formatDateTime } from '../../lib/formatters/date'
import { getCurrentProfileId } from '../profiles/profile-repository'
import { getRepositoryContext } from '../shared/repository-context'
import type {
  ChatMessageViewModel,
  ChatThreadType,
  ChatThreadViewModel,
  PresenceStatus,
  PresenceUser,
} from '../../types/chat'
import type { AppRole } from '../../types/auth'

export async function upsertPresence(status: PresenceStatus) {
  const { client } = getRepositoryContext()
  const profileId = await getCurrentProfileId('Debes iniciar sesión para actualizar presencia.')
  const response = await client.from('presence_sessions').upsert({
    profile_id: profileId,
    status,
    can_global_chat: true,
    last_seen_at: new Date().toISOString(),
  })

  if (response.error) {
    throw response.error
  }
}

export async function fetchPresenceUsers() {
  const { client } = getRepositoryContext()
  const response = await client
    .from('presence_sessions')
    .select('profile_id, status, can_global_chat, last_seen_at, profiles(full_name, role)')
    .order('last_seen_at', { ascending: false })

  if (response.error) {
    throw response.error
  }

  return (response.data || []).map((item) => {
    const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles

    return {
      profileId: item.profile_id,
      fullName: profile?.full_name || 'Usuario',
      role: (profile?.role || 'manager') as AppRole,
      status: item.status,
      canGlobalChat: item.can_global_chat,
      lastSeenAt: formatDateTime(item.last_seen_at),
    } as PresenceUser
  })
}

export async function ensureThread(threadType: ChatThreadType) {
  const { client } = getRepositoryContext()
  const profileId = await getCurrentProfileId('Debes iniciar sesión para usar el chat.')

  const existing = await client
    .from('chat_threads')
    .select('id, thread_type, created_at')
    .eq('thread_type', threadType)
    .limit(1)
    .maybeSingle()

  if (existing.data?.id) {
    return {
      id: existing.data.id,
      threadType: existing.data.thread_type,
      createdAt: formatDateTime(existing.data.created_at),
    } as ChatThreadViewModel
  }

  const created = await client
    .from('chat_threads')
    .insert({
      thread_type: threadType,
      created_by: profileId,
    })
    .select('id, thread_type, created_at')
    .single()

  if (created.error) {
    throw created.error
  }

  return {
    id: created.data.id,
    threadType: created.data.thread_type,
    createdAt: formatDateTime(created.data.created_at),
  } as ChatThreadViewModel
}

export async function fetchMessages(threadId: string) {
  const { client } = getRepositoryContext()
  const response = await client
    .from('chat_messages')
    .select('id, body, sender_id, recipient_id, created_at, read_at, expires_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true })

  if (response.error) {
    throw response.error
  }

  return (response.data || []).map(
    (item) =>
      ({
        id: item.id,
        body: item.body,
        senderId: item.sender_id,
        recipientId: item.recipient_id,
        createdAt: formatDateTime(item.created_at),
        readAt: item.read_at,
        expiresAt: item.expires_at,
      }) as ChatMessageViewModel,
  )
}

export async function sendMessage(threadId: string, body: string, recipientId?: string) {
  const { client } = getRepositoryContext()
  const senderId = await getCurrentProfileId('Debes iniciar sesión para enviar mensajes.')
  const response = await client.from('chat_messages').insert({
    thread_id: threadId,
    sender_id: senderId,
    recipient_id: recipientId ?? null,
    body,
  })

  if (response.error) {
    throw response.error
  }
}

export async function markMessageRead(messageId: string) {
  const { client } = getRepositoryContext()
  const response = await client.rpc('mark_message_read', { message_id: messageId })

  if (response.error) {
    throw response.error
  }
}
