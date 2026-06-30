import { FormInput } from '../../components/ui/form-input'
import { useSignInForm } from '../../hooks/use-auth-forms'

interface SignInFormProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>
}

export function SignInForm({ onSubmit }: SignInFormProps) {
  const form = useSignInForm()

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit((v) => void onSubmit(v))}>
      <FormInput
        label="Correo electrónico"
        type="email"
        placeholder="equipo@yole.shop"
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
        Iniciar sesión
      </button>
    </form>
  )
}
