const registry = new Map<string, number[]>()

export function assertRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const entries = registry.get(key) || []
  const recent = entries.filter((timestamp) => now - timestamp <= windowMs)

  if (recent.length >= limit) {
    throw new Error('Demasiados intentos en poco tiempo. Espera antes de continuar.')
  }

  registry.set(key, [...recent, now])
}
