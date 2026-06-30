import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { chatDraftSchema } from '../lib/chat-schema'
import type { ChatDraftValues } from '../types/chat'

export function useChatDraftForm() {
  return useForm<ChatDraftValues>({
    resolver: zodResolver(chatDraftSchema),
    defaultValues: {
      body: '',
    },
  })
}
