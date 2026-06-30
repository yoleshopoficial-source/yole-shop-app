import { z } from 'zod'

export const withdrawalSchema = z.object({
  amount: z.number().min(1, 'El monto debe ser mayor que cero'),
  notes: z.string().min(4, 'Agrega una nota breve'),
})
