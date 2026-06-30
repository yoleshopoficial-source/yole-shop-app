export interface StatCardItem {
  label: string
  value: string
  trend: string
}

export interface QuickActionItem {
  title: string
  description: string
}

export interface ProductItem {
  name: string
  category: string
  stock: string
  commission: string
}

export interface OrderItem {
  code: string
  customer: string
  status: string
  total: string
}

export interface WalletMovement {
  title: string
  date: string
  amount: string
}
