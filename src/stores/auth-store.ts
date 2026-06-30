import { create } from 'zustand'
import { getSecureItem, removeSecureItem, setSecureItem } from '../lib/secure-storage'
import type { AppRole, AuthSessionState, ProjectTarget } from '../types/auth'

interface AuthStore extends AuthSessionState {
  setSession: (payload: Partial<AuthSessionState>) => void
  clearSession: () => void
  setActiveProject: (project: ProjectTarget | null) => void
}

const initialState: AuthSessionState = {
  activeProject: (getSecureItem('activeProject') as ProjectTarget | null) || null,
  userEmail: getSecureItem('userEmail'),
  role: (getSecureItem('role') as AppRole | null) || null,
  isAuthenticated: getSecureItem('isAuthenticated') === 'true',
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setSession: (payload) =>
    set((state) => {
      const nextState = { ...state, ...payload }

      if (nextState.activeProject) {
        setSecureItem('activeProject', nextState.activeProject)
      }

      if (nextState.userEmail) {
        setSecureItem('userEmail', nextState.userEmail)
      }

      if (nextState.role) {
        setSecureItem('role', nextState.role)
      }

      setSecureItem('isAuthenticated', String(nextState.isAuthenticated))
      return nextState
    }),
  clearSession: () => {
    removeSecureItem('activeProject')
    removeSecureItem('userEmail')
    removeSecureItem('role')
    removeSecureItem('isAuthenticated')
    set(initialState)
  },
  setActiveProject: (project) => {
    if (project) {
      setSecureItem('activeProject', project)
    } else {
      removeSecureItem('activeProject')
    }

    set({ activeProject: project })
  },
}))
