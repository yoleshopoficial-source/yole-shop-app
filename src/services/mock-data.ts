import type {
  OrderItem,
  ProductItem,
  QuickActionItem,
  StatCardItem,
  WalletMovement,
} from '../types/ui'

export const homeStats: StatCardItem[] = [
  { label: 'Ventas hoy', value: '$ 12.450', trend: '+18%' },
  { label: 'Pedidos', value: '48', trend: '+9%' },
  { label: 'Comisión', value: '$ 1.220', trend: '+6%' },
]

export const quickActions: QuickActionItem[] = [
  { title: 'Nuevo pedido', description: 'Registrar venta manual rápida' },
  { title: 'Nuevo producto', description: 'Alta de catálogo y stock' },
  { title: 'Retiro saldo', description: 'Solicitar pago de comisiones' },
]

export const products: ProductItem[] = [
  { name: 'Combo Smart Pro', category: 'Tecnología', stock: '28', commission: '12%' },
  { name: 'Auricular Pulse X', category: 'Audio', stock: '91', commission: '9%' },
  { name: 'Mini Tracker Go', category: 'Accesorios', stock: '14', commission: '15%' },
]

export const orders: OrderItem[] = [
  { code: '#YS-1201', customer: 'María López', status: 'Confirmado', total: '$ 350' },
  { code: '#YS-1202', customer: 'Javier Ortiz', status: 'Pendiente', total: '$ 120' },
  { code: '#YS-1203', customer: 'Paula Núñez', status: 'Vendido', total: '$ 560' },
]

export const walletMovements: WalletMovement[] = [
  { title: 'Comisión pedido #YS-1201', date: 'Hoy · 10:42', amount: '+ $ 42' },
  { title: 'Retiro procesado', date: 'Ayer · 18:15', amount: '- $ 120' },
  { title: 'Bono por objetivo', date: 'Ayer · 09:03', amount: '+ $ 80' },
]
