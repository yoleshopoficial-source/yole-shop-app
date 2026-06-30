import type { ProjectTarget } from '../types/auth'
import { getProjectClient } from '../lib/project-client'
import { getCurrentProject } from '../lib/current-session'

const endpoint = 'resolve-round-robin'

function normalizeProject(value: string): ProjectTarget {
  return value === 'project-2' ? 'project-2' : 'project-1'
}

export async function resolveProjectAssignment(email?: string): Promise<ProjectTarget> {
  const activeProject = getCurrentProject()
  const client = getProjectClient(activeProject)
  const response = await client.functions.invoke(endpoint, {
    body: { email: email ?? null },
  })

  if (response.error) {
    throw new Error(response.error.message)
  }

  return normalizeProject(response.data.project)
}

export function getProjectIndex(project: ProjectTarget) {
  return project === 'project-2' ? 1 : 0
}
