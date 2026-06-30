export interface DashboardKpi {
  label: string
  value: string
  helper: string
}

export interface SalesChartPoint {
  name: string
  value: number
}

export interface StatusDistributionItem {
  name: string
  value: number
}

export interface ManagerPerformanceItem {
  name: string
  orders: number
  revenue: number
}

export interface DashboardReport {
  totalRevenue: number
  totalOrders: number
  soldOrders: number
  pendingOrders: number
  commissionTotal: number
  salesByDay: SalesChartPoint[]
  statusDistribution: StatusDistributionItem[]
  managerPerformance: ManagerPerformanceItem[]
}
