import type { PropsWithChildren } from 'react'
import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'
import { NetworkProvider } from './network-provider'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <NetworkProvider>
        <QueryProvider>{children}</QueryProvider>
      </NetworkProvider>
    </ThemeProvider>
  )
}
