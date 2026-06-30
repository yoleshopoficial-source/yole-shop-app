import type { ProjectTarget } from '../../types/auth'

interface ProjectBadgeProps {
  project: ProjectTarget | null
}

const labels: Record<ProjectTarget, string> = {
  'project-1': 'Proyecto 1',
  'project-2': 'Proyecto 2',
}

export function ProjectBadge({ project }: ProjectBadgeProps) {
  if (!project) {
    return <span className="text-sm text-slate-400">Sin proyecto activo</span>
  }

  return (
    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs text-cyan-300">
      {labels[project]}
    </span>
  )
}
