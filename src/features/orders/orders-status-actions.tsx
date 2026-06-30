import type { OrderStatusValue } from '../../types/order'

interface OrdersStatusActionsProps {
  onChange: (status: OrderStatusValue) => void
}

const statuses: OrderStatusValue[] = [
  'pending',
  'confirmed',
  'denied',
  'sold',
  'cancelled',
]

export function OrdersStatusActions({ onChange }: OrdersStatusActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onChange(status)}
          className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300"
        >
          {status}
        </button>
      ))}
    </div>
  )
}
