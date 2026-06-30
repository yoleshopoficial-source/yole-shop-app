import { z } from 'zod'

export const productFormSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  category: z.string().min(2, 'Selecciona una categoría'),
  price: z.number().min(0, 'El precio no puede ser negativo'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
  commissionPercent: z
    .number()
    .min(0, 'La comisión no puede ser negativa')
    .max(100, 'La comisión no puede superar 100'),
  imageUrl: z.url('Ingresa una URL válida para la imagen'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
})
