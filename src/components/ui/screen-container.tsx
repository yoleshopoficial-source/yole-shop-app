import type { PropsWithChildren } from 'react'

export function ScreenContainer({ children }: PropsWithChildren) {
  return <div className="space-y-5">{children}</div>
}
