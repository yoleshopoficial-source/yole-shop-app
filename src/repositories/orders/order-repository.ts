import type { OrderFormValues, OrderStatusValue } from '../../types/order'
import { getCurrentProfileId } from '../profiles/profile-repository'
import { getRepositoryContext } from '../shared/repository-context'
import { insertOrderImages } from './order-image-repository'

export async function fetchOrderRows() {
  const { client } = getRepositoryContext()
  const response = await client
    .from('orders')
    .select('id, customer_name, customer_phone, total_amount, status, notes, payment_type, product_name, sizes, delivery_price, delivery_time')
    .is('archived_at', null)
    .order('created_at', { ascending: false })

  if (response.error) {
    throw response.error
  }

  return response.data || []
}

export async function insertOrderRow(
  values: OrderFormValues,
  onProgress?: (imageId: string, progress: number, status: OrderFormValues['images'][number]['status']) => void,
) {
  const { client } = getRepositoryContext()
  const profileId = await getCurrentProfileId('Debes iniciar sesión para crear pedidos.')
  const totalAmount = Number(values.productPrice) + Number(values.deliveryPrice || 0)

  const response = await client
    .from('orders')
    .insert({
      manager_id: profileId,
      product_id: null,
      customer_name: values.customerName,
      customer_phone: values.phone,
      quantity: 1,
      total_amount: totalAmount,
      status: 'pending',
      notes: values.notes,
      payment_type: values.paymentType,
      product_name: values.productName,
      sizes: values.sizes,
      delivery_price: values.deliveryPrice || 0,
      delivery_time: values.deliveryTime || null,
    })
    .select('id')
    .single()

  if (response.error) {
    throw response.error
  }

  await insertOrderImages(response.data.id, values.images, onProgress)
  return response.data.id
}

export async function updateOrderRowStatus(id: string, status: OrderStatusValue) {
  const { client } = getRepositoryContext()
  const response = await client.from('orders').update({ status }).eq('id', id)

  if (response.error) {
    throw response.error
  }
}
