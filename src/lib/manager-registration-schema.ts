import { z } from 'zod'

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
const phoneRegex = /^\+?[0-9\s-]{7,20}$/
const identityRegex = /^[A-Za-z0-9-]{5,30}$/
const cardRegex = /^[0-9\s]{12,23}$/
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

function requiredTrue(message: string) {
  return z.boolean().refine((value) => value === true, { message })
}

export const managerRegistrationSchema = z
  .object({
    fullName: z.string().min(5, 'El nombre completo es demasiado corto'),
    username: z.string().min(4, 'El usuario debe tener al menos 4 caracteres'),
    gmail: z.string().regex(gmailRegex, 'Debes usar un correo Gmail válido'),
    phone: z.string().regex(phoneRegex, 'Ingresa un teléfono válido'),
    age: z.number().int().min(18, 'La edad mínima es 18').max(99, 'Edad inválida'),
    birthDate: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
    identityCard: z.string().regex(identityRegex, 'Carnet de identidad inválido'),
    address: z.string().min(8, 'La dirección es demasiado corta'),
    bankCardNumber: z.string().regex(cardRegex, 'Número de tarjeta inválido'),
    cardHolder: z.string().min(5, 'El titular de la tarjeta es demasiado corto'),
    transferConfirmationPhone: z
      .string()
      .regex(phoneRegex, 'Número de confirmación inválido'),
    observations: z.string().max(500, 'Las observaciones son demasiado largas'),
    hasSalesExperience: z.boolean(),
    password: z.string().regex(
      strongPasswordRegex,
      'La contraseña debe incluir mayúscula, minúscula, número, símbolo y 8 caracteres mínimo.',
    ),
    confirmPassword: z.string().min(1, 'Debes repetir la contraseña'),
    acceptedRules: requiredTrue('Debes confirmar que has leído todas las reglas.'),
    committedHonesty: requiredTrue(
      'Debes comprometerte a trabajar con honestidad.',
    ),
    understandsPayments: requiredTrue(
      'Debes entender el sistema de pagos y comisiones.',
    ),
    acceptedPolicies: requiredTrue(
      'Debes aceptar la Política de Privacidad y las Condiciones de Uso.',
    ),
    readPrivacyPolicy: requiredTrue(
      'Debes abrir y revisar la Política de Privacidad.',
    ),
    readTerms: requiredTrue('Debes abrir y revisar las Condiciones de Uso.'),
  })
  .superRefine((values, ctx) => {
    const birthDate = new Date(values.birthDate)
    const now = new Date()

    if (Number.isNaN(birthDate.getTime()) || birthDate > now) {
      ctx.addIssue({
        code: 'custom',
        path: ['birthDate'],
        message: 'La fecha de nacimiento no es válida',
      })
    }

    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Las contraseñas no coinciden',
      })
    }
  })
