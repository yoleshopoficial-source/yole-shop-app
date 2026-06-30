export function assertRepositoryUser(email: string | null, message: string) {
  if (!email) {
    throw new Error(message)
  }

  return email
}

export function assertRepositoryData<T>(data: T | null, error: { message: string } | null) {
  if (error) {
    throw error
  }

  if (!data) {
    throw new Error('No se encontró la información solicitada.')
  }

  return data
}
