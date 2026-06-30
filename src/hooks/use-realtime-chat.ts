import { useEffect } from 'react'
import { getCurrentClient } from '../lib/current-session'

interface UseRealtimeChatProps {
  threadId: string
  onMessagesChange: () => void
}

export function useRealtimeChat({ threadId, onMessagesChange }: UseRealtimeChatProps) {
  useEffect(() => {
    if (!threadId) {
      return
    }

    const client = getCurrentClient()
    const channel = client
      .channel(`chat-messages-${threadId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
          filter: `thread_id=eq.${threadId}`,
        },
        () => onMessagesChange(),
      )
      .subscribe()

    return () => {
      client.removeChannel(channel)
    }
  }, [threadId, onMessagesChange])
}
