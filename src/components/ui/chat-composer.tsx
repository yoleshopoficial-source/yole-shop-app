import { useChatDraftForm } from '../../hooks/use-chat-draft-form'

interface ChatComposerProps {
  onSend: (body: string) => Promise<void>
}

export function ChatComposer({ onSend }: ChatComposerProps) {
  const form = useChatDraftForm()

  return (
    <form
      className="space-y-3"
      onSubmit={form.handleSubmit(async (values) => {
        await onSend(values.body)
        form.reset()
      })}
    >
      <textarea
        rows={3}
        placeholder="Escribe un mensaje"
        {...form.register('body')}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none"
      />
      {form.formState.errors.body?.message ? (
        <p className="text-xs text-rose-300">{form.formState.errors.body.message}</p>
      ) : null}
      <button className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-medium text-slate-950">
        Enviar mensaje
      </button>
    </form>
  )
}
