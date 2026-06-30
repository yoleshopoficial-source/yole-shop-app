import { formatCurrency } from '../../lib/formatters/currency'
import type { OrderStatusValue, OrderViewModel, PaymentType } from '../../types/order'

export interface OrderRow {
  id: string
  customer_name: string
  customer_phone: string | null
  total_amount: number
  status: OrderStatusValue
  notes: string | null
  payment_type: PaymentType
  product_name: string
  sizes: string
  delivery_price: number | null
  delivery_time: string | null
}

export function mapOrderRow(row: OrderRow): OrderViewModel {
  return {
    id: row.id,
    code: `#${row.id.slice(0, 8).toUpperCase()}`,
    customerName: row.customer_name,
    phone: row.customer_phone || '-',
    productName: row.product_name,
    sizes: row.sizes,
    paymentType: row.payment_type,
    totalAmount: formatCurrency(row.total_amount),
    deliveryPrice: formatCurrency(Number(row.delivery_price || 0)),
    status: row.status,
    notes: row.notes || '',
    deliveryTime: row.delivery_time || 'Sin horario',
  }
}
