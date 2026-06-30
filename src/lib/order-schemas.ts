import { z } from 'zod'

export const orderFormSchema = z.object({
  productName: z.string().min(2, 'Debes indicar el producto'),
  sizes: z.string().min(1, 'Debes indicar la talla o tallas'),
  productPrice: z.number().min(0, 'El precio del producto no puede ser negativo'),
  address: z.string().min(8, 'La dirección es demasiado corta'),
  phone: z.string().min(7, 'Ingresa un teléfono válido'),
  deliveryPrice: z.number().min(0, 'El precio del domicilio no puede ser negativo').optional(),
  customerName: z.string().min(3, 'El cliente debe tener al menos 3 caracteres'),
  paymentType: z.enum(['transferencia', 'efectivo', 'zelle', 'otro']),
  deliveryTime: z.string().optional(),
  notes: z.string().min(4, 'Agrega una observación útil'),
})
