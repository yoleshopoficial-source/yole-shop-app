import type {
  ProjectTarget,
  RecoveryFormValues,
  SignInFormValues,
  SignUpFormValues,
} from '../types/auth'
import { supabaseProject1, supabaseProject2 } from '../lib/supabase-clients'

function getClient(project: ProjectTarget) {
  return project === 'project-1' ? supabaseProject1 : supabaseProject2
}

export async function signInWithProject(
  values: SignInFormValues,
  project: ProjectTarget,
) {
  const client = getClient(project)

  return client.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })
}

export async function signUpWithProject(
  values: SignUpFormValues,
  project: ProjectTarget,
) {
  const client = getClient(project)

  return client.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        full_name: values.fullName,
        role: 'manager',
        project_assignment: project,
      },
    },
  })
}

export async function recoverPassword(
  values: RecoveryFormValues,
  project: ProjectTarget,
) {
  const client = getClient(project)

  return client.auth.resetPasswordForEmail(values.email)
}

export async function signOutFromProject(project: ProjectTarget) {
  const client = getClient(project)
  return client.auth.signOut()
}
