import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email('Ingresa un correo válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const signUpSchema = signInSchema.extend({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
})

export const recoverySchema = z.object({
  email: z.email('Ingresa un correo válido'),
})
