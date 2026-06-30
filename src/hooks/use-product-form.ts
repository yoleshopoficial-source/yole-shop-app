import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { productFormSchema } from '../lib/product-schemas'
import type { ProductFormValues } from '../types/product'

export function useProductForm() {
  return useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      category: 'Tecnología',
      price: 0,
      stock: 0,
      commissionPercent: 10,
      imageUrl: 'https://images.example.com/product.png',
      description: '',
    },
  })
}
