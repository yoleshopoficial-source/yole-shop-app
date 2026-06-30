import { FormInput } from '../../components/ui/form-input'
import { useSignUpForm } from '../../hooks/use-auth-forms'

interface SignUpFormProps {
  onSubmit: (values: {
    email: string
    password: string
    fullName: string
  }) => Promise<void>
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const form = useSignUpForm()

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit((v) => void onSubmit(v))}>
      <FormInput
        label="Nombre completo"
        placeholder="Juan Pérez"
        registration={form.register('fullName')}
        error={form.formState.errors.fullName?.message}
      />
      <FormInput
        label="Correo electrónico"
        type="email"
        placeholder="gestor@yole.shop"
        registration={form.register('email')}
        error={form.formState.errors.email?.message}
      />
      <FormInput
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        registration={form.register('password')}
        error={form.formState.errors.password?.message}
      />
      <button className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-medium text-slate-950">
        Crear cuenta
      </button>
    </form>
  )
}
