import { RouterProvider } from 'react-router-dom'
import { appRouter } from '../routes/app-router'
import { AppProvider } from '../providers/app-provider'

export function App() {
  return (
    <AppProvider>
      <RouterProvider router={appRouter} />
    </AppProvider>
  )
}
