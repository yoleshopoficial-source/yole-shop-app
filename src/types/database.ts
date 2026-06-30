export type AppRole = 'admin' | 'manager'
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'denied'
  | 'sold'
  | 'cancelled'

export type WalletRequestStatus = 'pending' | 'approved' | 'rejected' | 'paid'

export interface ProfileRecord {
  id: string
  email: string
  full_name: string
  role: AppRole
  project_assignment: 'project-1' | 'project-2'
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CategoryRecord {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface ProductRecord {
  id: string
  category_id: string | null
  name: string
  description: string | null
  image_url: string | null
  price: number
  stock: number
  commission_percent: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface OrderRecord {
  id: string
  manager_id: string
  product_id: string
  customer_name: string
  customer_phone: string | null
  quantity: number
  total_amount: number
  status: OrderStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface WalletMovementRecord {
  id: string
  profile_id: string
  order_id: string | null
  amount: number
  movement_type: 'commission' | 'withdrawal' | 'adjustment' | 'bonus'
  description: string | null
  created_at: string
}

export interface WithdrawalRequestRecord {
  id: string
  profile_id: string
  amount: number
  status: WalletRequestStatus
  notes: string | null
  created_at: string
  updated_at: string
}
