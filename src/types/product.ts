export interface ProductFilterValues {
  query: string
  category: string
  stockState: 'all' | 'in-stock' | 'low-stock'
}

export interface ProductFormValues {
  name: string
  category: string
  price: number
  stock: number
  commissionPercent: number
  imageUrl: string
  description: string
}

export interface ProductViewModel {
  id: string
  name: string
  category: string
  price: string
  stock: number
  commissionPercent: number
  imageUrl: string
  description: string
}
