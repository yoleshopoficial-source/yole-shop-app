import { FormSegment } from '../../components/ui/form-segment'

export type AuthMode = 'sign-in' | 'sign-up' | 'recovery'

interface AuthModeTabsProps {
  mode: AuthMode
  setMode: (mode: AuthMode) => void
}

export function AuthModeTabs({ mode, setMode }: AuthModeTabsProps) {
  return (
    <div className="flex gap-2 rounded-3xl bg-white/5 p-2">
      <FormSegment
        active={mode === 'sign-in'}
        label="Entrar"
        onClick={() => setMode('sign-in')}
      />
      <FormSegment
        active={mode === 'sign-up'}
        label="Registro"
        onClick={() => setMode('sign-up')}
      />
      <FormSegment
        active={mode === 'recovery'}
        label="Recuperar"
        onClick={() => setMode('recovery')}
      />
    </div>
  )
}
