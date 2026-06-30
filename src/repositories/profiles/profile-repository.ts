import { getRepositoryContext } from '../shared/repository-context'
import { assertRepositoryData, assertRepositoryUser } from '../shared/repository-errors'

export async function getCurrentProfileId(message: string) {
  const { client, userEmail } = getRepositoryContext()
  const email = assertRepositoryUser(userEmail, message)
  const response = await client
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

  const data = assertRepositoryData(response.data, response.error)
  return data.id
}
