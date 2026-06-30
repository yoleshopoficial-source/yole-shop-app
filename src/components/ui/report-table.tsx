import type { ManagerPerformanceItem } from '../../types/dashboard'

interface ReportTableProps {
  rows: ManagerPerformanceItem[]
}

export function ReportTable({ rows }: ReportTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <table className="w-full border-collapse text-left text-sm text-slate-300">
        <thead className="bg-slate-950/60 text-slate-400">
          <tr>
            <th className="px-4 py-3">Gestor</th>
            <th className="px-4 py-3">Pedidos</th>
            <th className="px-4 py-3">Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-white/10 bg-slate-950/30">
              <td className="px-4 py-3">{row.name}</td>
              <td className="px-4 py-3">{row.orders}</td>
              <td className="px-4 py-3">$ {row.revenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
