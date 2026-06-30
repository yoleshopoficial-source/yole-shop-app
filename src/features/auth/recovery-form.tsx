import { FormInput } from '../../components/ui/form-input'
import { useRecoveryForm } from '../../hooks/use-auth-forms'

interface RecoveryFormProps {
  onSubmit: (values: { email: string }) => Promise<void>
}

export function RecoveryForm({ onSubmit }: RecoveryFormProps) {
  const form = useRecoveryForm()

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit((v) => void onSubmit(v))}>
      <FormInput
        label="Correo electrónico"
        type="email"
        placeholder="cuenta@yole.shop"
        registration={form.register('email')}
        error={form.formState.errors.email?.message}
      />
      <button className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-medium text-slate-950">
        Enviar recuperación
      </button>
    </form>
  )
}
