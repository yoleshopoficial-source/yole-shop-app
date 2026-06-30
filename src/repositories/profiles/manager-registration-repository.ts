import type { ManagerRegistrationValues } from '../../types/manager-registration'
import { getRepositoryContext } from '../shared/repository-context'

function getCardLast4(cardNumber: string) {
  const digits = cardNumber.replace(/\D/g, '')
  return digits.slice(-4)
}

export async function assertManagerRegistrationUniqueness(
  values: ManagerRegistrationValues,
) {
  const { client } = getRepositoryContext()

  const [emailCheck, usernameCheck, identityCheck] = await Promise.all([
    client.from('profiles').select('id').eq('email', values.gmail).maybeSingle(),
    client.from('profiles').select('id').eq('username', values.username).maybeSingle(),
    client
      .from('profiles')
      .select('id')
      .eq('identity_card', values.identityCard)
      .maybeSingle(),
  ])

  if (emailCheck.data?.id) {
    throw new Error('Ese correo ya está registrado.')
  }

  if (usernameCheck.data?.id) {
    throw new Error('Ese nombre de usuario ya está en uso.')
  }

  if (identityCheck.data?.id) {
    throw new Error('Ese carnet de identidad ya existe.')
  }
}

export async function updateManagerProfile(
  userId: string,
  values: ManagerRegistrationValues,
) {
  const { client } = getRepositoryContext()
  const response = await client
    .from('profiles')
    .update({
      email: values.gmail,
      full_name: values.fullName,
      username: values.username,
      phone: values.phone,
      age: values.age,
      birth_date: values.birthDate,
      gender: values.gender,
      identity_card: values.identityCard,
      address: values.address,
      bank_card_last4: getCardLast4(values.bankCardNumber),
      card_holder: values.cardHolder,
      transfer_confirmation_phone: values.transferConfirmationPhone,
      observations: values.observations,
      has_sales_experience: values.hasSalesExperience,
      joined_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (response.error) {
    throw response.error
  }
}
