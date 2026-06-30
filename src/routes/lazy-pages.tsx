import { lazy } from 'react'

export const HomePage = lazy(() => import('../pages/home-page'))
export const AuthPage = lazy(() => import('../pages/auth-page'))
export const DashboardPage = lazy(() => import('../pages/dashboard-page'))
export const ProductsPage = lazy(() => import('../pages/products-page'))
export const OrdersPage = lazy(() => import('../pages/orders-page'))
export const WalletPage = lazy(() => import('../pages/wallet-page'))
