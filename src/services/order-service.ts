import { mapOrderRow } from '../repositories/orders/order-mappers'
import {
  fetchOrderRows,
  insertOrderRow,
  updateOrderRowStatus,
} from '../repositories/orders/order-repository'
import type { OrderFormValues, OrderStatusValue } from '../types/order'

export async function listOrders() {
  const rows = await fetchOrderRows()
  return rows.map(mapOrderRow)
}

export async function createOrder(
  values: OrderFormValues,
  onProgress?: (imageId: string, progress: number, status: OrderFormValues['images'][number]['status']) => void,
) {
  return insertOrderRow(values, onProgress)
}

export async function updateOrderStatus(id: string, status: OrderStatusValue) {
  await updateOrderRowStatus(id, status)
}
