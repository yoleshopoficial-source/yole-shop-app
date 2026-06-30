import { ProjectBadge } from '../../components/ui/project-badge'
import { useAuthStore } from '../../stores/auth-store'
import { handleSelectProject } from './auth-actions'

interface AuthProjectSelectorProps {
  onFeedback: (message: string) => void
}

export function AuthProjectSelector({ onFeedback }: AuthProjectSelectorProps) {
  const activeProject = useAuthStore((state) => state.activeProject)

  function select(project: 'project-1' | 'project-2') {
    handleSelectProject(project)
    onFeedback(`Proyecto activo seleccionado: ${project}.`)
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <ProjectBadge project={activeProject} />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => select('project-1')}
          className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300"
        >
          Proyecto 1
        </button>
        <button
          type="button"
          onClick={() => select('project-2')}
          className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300"
        >
          Proyecto 2
        </button>
      </div>
    </div>
  )
}
