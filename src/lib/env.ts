function getEnvValue(key: string) {
  const value = import.meta.env[key]

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }

  return value
}

export const env = {
  supabaseUrl1: getEnvValue('VITE_SUPABASE_URL_1'),
  supabaseKey1: getEnvValue('VITE_SUPABASE_PUBLISHABLE_KEY_1'),
  supabaseUrl2: getEnvValue('VITE_SUPABASE_URL_2'),
  supabaseKey2: getEnvValue('VITE_SUPABASE_PUBLISHABLE_KEY_2'),
}
