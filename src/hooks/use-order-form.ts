import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { orderFormSchema } from '../lib/order-schemas'
import type { OrderFormFields } from '../types/order'

export function useOrderForm() {
  return useForm<OrderFormFields>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      productName: '',
      sizes: '',
      productPrice: 0,
      address: '',
      phone: '',
      deliveryPrice: 0,
      customerName: '',
      paymentType: 'transferencia',
      deliveryTime: '',
      notes: '',
    },
  })
}
