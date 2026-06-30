import { formatCurrency } from '../../lib/formatters/currency'
import type { ProductViewModel } from '../../types/product'

export interface ProductRow {
  id: string
  name: string
  description: string | null
  image_url: string | null
  price: number
  stock: number
  commission_percent: number
  categories?: Array<{ name: string }> | null
}

export function mapProductRow(row: ProductRow): ProductViewModel {
  return {
    id: row.id,
    name: row.name,
    category: row.categories?.[0]?.name || 'Sin categoría',
    price: formatCurrency(row.price),
    stock: row.stock,
    commissionPercent: row.commission_percent,
    imageUrl: row.image_url || '',
    description: row.description || 'Sin descripción',
  }
}
