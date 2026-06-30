import { evaluatePasswordStrength } from '../../lib/password-strength'

interface PasswordStrengthMeterProps {
  password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const result = evaluatePasswordStrength(password)
  const width = `${(result.score / 5) * 100}%`

  return (
    <div className="space-y-2">
      <div className="h-2 rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full ${
            result.label === 'fuerte'
              ? 'bg-emerald-400'
              : result.label === 'media'
                ? 'bg-amber-400'
                : 'bg-rose-400'
          }`}
          style={{ width }}
        />
      </div>
      <p className="text-xs text-slate-300">Seguridad: {result.label}</p>
      <div className="grid gap-1 text-xs text-slate-400 md:grid-cols-2">
        <span>{result.checks.minLength ? '✓' : '•'} 8 caracteres mínimo</span>
        <span>{result.checks.uppercase ? '✓' : '•'} Una mayúscula</span>
        <span>{result.checks.lowercase ? '✓' : '•'} Una minúscula</span>
        <span>{result.checks.number ? '✓' : '•'} Un número</span>
        <span>{result.checks.symbol ? '✓' : '•'} Un símbolo</span>
      </div>
    </div>
  )
}
