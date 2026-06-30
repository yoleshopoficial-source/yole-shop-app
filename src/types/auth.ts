export type ProjectTarget = 'project-1' | 'project-2'
export type AppRole = 'admin' | 'manager' | 'moderator'

export interface SignInFormValues {
  email: string
  password: string
}

export interface SignUpFormValues extends SignInFormValues {
  fullName: string
}

export interface RecoveryFormValues {
  email: string
}

export interface AuthSessionState {
  activeProject: ProjectTarget | null
  userEmail: string | null
  role: AppRole | null
  isAuthenticated: boolean
}
