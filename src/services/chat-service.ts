import {
  ensureThread,
  fetchMessages,
  fetchPresenceUsers,
  markMessageRead,
  sendMessage,
  upsertPresence,
} from '../repositories/chat/chat-repository'
import type { ChatThreadType, PresenceStatus } from '../types/chat'

export async function setPresence(status: PresenceStatus) {
  await upsertPresence(status)
}

export async function listPresenceUsers() {
  return fetchPresenceUsers()
}

export async function getThread(threadType: ChatThreadType) {
  return ensureThread(threadType)
}

export async function listThreadMessages(threadId: string) {
  return fetchMessages(threadId)
}

export async function postThreadMessage(
  threadId: string,
  body: string,
  recipientId?: string,
) {
  await sendMessage(threadId, body, recipientId)
}

export async function confirmMessageRead(messageId: string) {
  await markMessageRead(messageId)
}
