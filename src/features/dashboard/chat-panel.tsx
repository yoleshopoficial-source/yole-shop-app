import { useCallback, useEffect, useState } from 'react'
import { ChatComposer } from '../../components/ui/chat-composer'
import { ChatMessageBubble } from '../../components/ui/chat-message-bubble'
import { EmptyState } from '../../components/ui/empty-state'
import { GlassCard } from '../../components/ui/glass-card'
import { SectionTitle } from '../../components/ui/section-title'
import { useRealtimeChat } from '../../hooks/use-realtime-chat'
import {
  confirmMessageRead,
  getThread,
  listThreadMessages,
  postThreadMessage,
} from '../../services/chat-service'
import { getCurrentProfileId } from '../../repositories/profiles/profile-repository'
import type { ChatMessageViewModel, ChatThreadType } from '../../types/chat'

interface ChatPanelProps {
  threadType: ChatThreadType
  title: string
  recipientId?: string
}

export function ChatPanel({ threadType, title, recipientId }: ChatPanelProps) {
  const [threadId, setThreadId] = useState('')
  const [messages, setMessages] = useState<ChatMessageViewModel[]>([])
  const [currentProfileId, setCurrentProfileId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const loadChat = useCallback(async () => {
    try {
      const [thread, profileId] = await Promise.all([
        getThread(threadType),
        getCurrentProfileId('Debes iniciar sesión para usar el chat.'),
      ])

      setThreadId(thread.id)
      setCurrentProfileId(profileId)
      const chatMessages = await listThreadMessages(thread.id)
      setMessages(chatMessages)

      await Promise.all(
        chatMessages
          .filter((message) => !message.readAt && message.senderId !== profileId)
          .map((message) => confirmMessageRead(message.id)),
      )
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo cargar el chat.')
    }
  }, [threadType])

  useRealtimeChat({ threadId, onMessagesChange: loadChat })

  useEffect(() => {
    loadChat()
  }, [loadChat])

  async function handleSend(body: string) {
    if (!threadId) {
      return
    }

    await postThreadMessage(threadId, body, recipientId)
  }

  return (
    <GlassCard className="space-y-4">
      <SectionTitle title={title} />
      {errorMessage ? <EmptyState title="Error" description={errorMessage} /> : null}
      {!errorMessage && messages.length === 0 ? (
        <EmptyState title="Sin mensajes" description="Todavía no hay mensajes en este chat." />
      ) : null}
      <div className="space-y-3">
        {messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            body={message.body}
            createdAt={message.createdAt}
            own={message.senderId === currentProfileId}
          />
        ))}
      </div>
      <ChatComposer onSend={handleSend} />
    </GlassCard>
  )
}
