const prefix = 'yole-shop'

export function setSecureItem(key: string, value: string) {
  sessionStorage.setItem(`${prefix}:${key}`, value)
}

export function getSecureItem(key: string) {
  return sessionStorage.getItem(`${prefix}:${key}`)
}

export function removeSecureItem(key: string) {
  sessionStorage.removeItem(`${prefix}:${key}`)
}
