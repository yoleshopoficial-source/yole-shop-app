import { supabaseProject1, supabaseProject2 } from './supabase-clients'
import type { ProjectTarget } from '../types/auth'

export function getProjectClient(project: ProjectTarget | null) {
  return project === 'project-2' ? supabaseProject2 : supabaseProject1
}
