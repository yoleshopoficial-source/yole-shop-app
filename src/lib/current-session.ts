import { useAuthStore } from '../stores/auth-store'
import { getProjectClient } from './project-client'

export function getCurrentProject() {
  return useAuthStore.getState().activeProject
}

export function getCurrentClient() {
  return getProjectClient(getCurrentProject())
}

export function getCurrentUserEmail() {
  return useAuthStore.getState().userEmail
}
