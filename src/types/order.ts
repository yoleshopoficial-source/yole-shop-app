export type OrderStatusValue =
  | 'pending'
  | 'confirmed'
  | 'denied'
  | 'sold'
  | 'cancelled'

export type PaymentType = 'transferencia' | 'efectivo' | 'zelle' | 'otro'
export type OrderImageUploadStatus =
  | 'pending'
  | 'optimizing'
  | 'ready'
  | 'uploading'
  | 'uploaded'
  | 'error'

export interface OrderFormFields {
  productName: string
  sizes: string
  productPrice: number
  address: string
  phone: string
  deliveryPrice?: number
  customerName: string
  paymentType: PaymentType
  deliveryTime?: string
  notes: string
}

export interface OrderFormValues extends OrderFormFields {
  images: OrderImageDraft[]
}

export interface OrderImageDraft {
  id: string
  fileName: string
  mimeType: string
  previewUrl: string
  sizeKb: number
  width?: number
  height?: number
  file?: File
  status: OrderImageUploadStatus
  progress: number
  errorMessage?: string
}

export interface OrderViewModel {
  id: string
  code: string
  customerName: string
  phone: string
  productName: string
  sizes: string
  paymentType: PaymentType
  totalAmount: string
  deliveryPrice: string
  status: OrderStatusValue
  notes: string
  deliveryTime: string
}
