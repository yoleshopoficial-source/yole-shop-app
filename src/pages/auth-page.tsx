import { EmptyState } from '../components/ui/empty-state'
import { ScreenContainer } from '../components/ui/screen-container'
import { ScreenHeader } from '../components/ui/screen-header'
import { AuthPanel } from '../features/auth/auth-panel'
import { ManagerRegistrationForm } from '../features/auth/manager-registration-form'

export function AuthPage() {
  return (
    <ScreenContainer>
      <ScreenHeader
        title="Acceso y seguridad"
        description="Autenticación, recuperación y registro profesional completo de gestores con validaciones, políticas y confirmaciones obligatorias."
      />
      <AuthPanel />
      <ManagerRegistrationForm />
      <EmptyState
        title="Validación backend aún pendiente"
        description="Los controles duros de duplicados, cifrado de datos sensibles y validación definitiva deben cerrarse en backend y base de datos real."
      />
    </ScreenContainer>
  )
}

export default AuthPage
