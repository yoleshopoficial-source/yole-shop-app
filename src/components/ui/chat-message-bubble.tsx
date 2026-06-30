interface ChatMessageBubbleProps {
  body: string
  createdAt: string
  own: boolean
}

export function ChatMessageBubble({
  body,
  createdAt,
  own,
}: ChatMessageBubbleProps) {
  return (
    <div className={`flex ${own ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm ${
          own ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-white'
        }`}
      >
        <p>{body}</p>
        <p className="mt-2 text-[11px] opacity-70">{createdAt}</p>
      </div>
    </div>
  )
}
