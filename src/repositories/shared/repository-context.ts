import type { SupabaseClient } from '@supabase/supabase-js'
import { getCurrentClient, getCurrentProject, getCurrentUserEmail } from '../../lib/current-session'

export interface RepositoryContext {
  client: SupabaseClient
  project: ReturnType<typeof getCurrentProject>
  userEmail: string | null
}

export function getRepositoryContext(): RepositoryContext {
  return {
    client: getCurrentClient(),
    project: getCurrentProject(),
    userEmail: getCurrentUserEmail(),
  }
}
