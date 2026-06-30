import type { SubmitHandler } from 'react-hook-form'
import { FormInput } from '../../components/ui/form-input'
import { GlassCard } from '../../components/ui/glass-card'
import { TextareaInput } from '../../components/ui/textarea-input'
import { useWithdrawalForm } from '../../hooks/use-withdrawal-form'
import type { WithdrawalFormValues } from '../../types/wallet'

interface WithdrawalFormProps {
  onSubmit: SubmitHandler<WithdrawalFormValues>
}

export function WithdrawalForm({ onSubmit }: WithdrawalFormProps) {
  const form = useWithdrawalForm()

  return (
    <GlassCard>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          label="Monto a retirar"
          type="number"
          placeholder="100"
          registration={form.register('amount', { valueAsNumber: true })}
          error={form.formState.errors.amount?.message}
        />
        <TextareaInput
          label="Notas"
          placeholder="Datos del retiro, referencia o comentario"
          registration={form.register('notes')}
          error={form.formState.errors.notes?.message}
        />
        <button className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-medium text-slate-950">
          Solicitar retiro
        </button>
      </form>
    </GlassCard>
  )
}
