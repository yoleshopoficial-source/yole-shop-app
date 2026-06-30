import { z } from 'zod'

export const chatDraftSchema = z.object({
  body: z
    .string()
    .min(1, 'Escribe un mensaje')
    .max(1000, 'El mensaje es demasiado largo'),
})
