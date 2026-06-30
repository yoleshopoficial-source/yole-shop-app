import { Suspense } from 'react'
import { createHashRouter } from 'react-router-dom'
import { PageLoader } from '../components/ui/page-loader'
import { MobileAppLayout } from '../layouts/mobile-app-layout'
import {
  AuthPage,
  DashboardPage,
  HomePage,
  OrdersPage,
  ProductsPage,
  WalletPage,
} from './lazy-pages'
import { routePaths } from './route-paths'

function withSuspense(node: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{node}</Suspense>
}

export const appRouter = createHashRouter([
  {
    path: routePaths.home,
    element: <MobileAppLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: routePaths.auth.slice(1), element: withSuspense(<AuthPage />) },
      {
        path: routePaths.dashboard.slice(1),
        element: withSuspense(<DashboardPage />),
      },
      {
        path: routePaths.products.slice(1),
        element: withSuspense(<ProductsPage />),
      },
      { path: routePaths.orders.slice(1), element: withSuspense(<OrdersPage />) },
      { path: routePaths.wallet.slice(1), element: withSuspense(<WalletPage />) },
    ],
  },
])
