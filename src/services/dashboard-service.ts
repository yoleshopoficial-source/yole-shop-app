import { supabaseProject1, supabaseProject2 } from '../lib/supabase-clients'
import { useAuthStore } from '../stores/auth-store'
import type { DashboardReport } from '../types/dashboard'

function getActiveClient() {
  const project = useAuthStore.getState().activeProject
  return project === 'project-2' ? supabaseProject2 : supabaseProject1
}

export async function getDashboardReport(): Promise<DashboardReport> {
  const client = getActiveClient()

  const { data: orders, error: ordersError } = await client
    .from('orders')
    .select('id, total_amount, status, created_at, manager_id')

  if (ordersError) {
    throw ordersError
  }

  const { data: profiles, error: profilesError } = await client
    .from('profiles')
    .select('id, full_name, role')

  if (profilesError) {
    throw profilesError
  }

  const { data: movements, error: movementsError } = await client
    .from('wallet_movements')
    .select('amount, movement_type')

  if (movementsError) {
    throw movementsError
  }

  const totalRevenue = (orders || []).reduce(
    (sum, item) => sum + Number(item.total_amount),
    0,
  )

  const totalOrders = (orders || []).length
  const soldOrders = (orders || []).filter((item) => item.status === 'sold').length
  const pendingOrders = (orders || []).filter((item) => item.status === 'pending').length

  const commissionTotal = (movements || [])
    .filter((item) => item.movement_type === 'commission')
    .reduce((sum, item) => sum + Number(item.amount), 0)

  const salesByDayMap = new Map<string, number>()

  for (const order of orders || []) {
    const day = new Date(order.created_at).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
    })
    salesByDayMap.set(day, (salesByDayMap.get(day) || 0) + Number(order.total_amount))
  }

  const statusMap = new Map<string, number>()

  for (const order of orders || []) {
    statusMap.set(order.status, (statusMap.get(order.status) || 0) + 1)
  }

  const managerMap = new Map<string, { orders: number; revenue: number }>()

  for (const order of orders || []) {
    const profile = (profiles || []).find((item) => item.id === order.manager_id)
    const name = profile?.full_name || 'Gestor'
    const current = managerMap.get(name) || { orders: 0, revenue: 0 }

    managerMap.set(name, {
      orders: current.orders + 1,
      revenue: current.revenue + Number(order.total_amount),
    })
  }

  return {
    totalRevenue,
    totalOrders,
    soldOrders,
    pendingOrders,
    commissionTotal,
    salesByDay: [...salesByDayMap.entries()].map(([name, value]) => ({ name, value })),
    statusDistribution: [...statusMap.entries()].map(([name, value]) => ({ name, value })),
    managerPerformance: [...managerMap.entries()].map(([name, values]) => ({
      name,
      orders: values.orders,
      revenue: values.revenue,
    })),
  }
}
