import { getRepositoryContext } from '../shared/repository-context'
import { assertRepositoryData } from '../shared/repository-errors'
import type { ProductFilterValues, ProductFormValues } from '../../types/product'
import type { ProductRow } from './product-mappers'

export async function fetchProductRows(filters: ProductFilterValues) {
  const { client } = getRepositoryContext()

  let query = client
    .from('products')
    .select('id, name, description, image_url, price, stock, commission_percent, categories(name)')
    .order('created_at', { ascending: false })

  if (filters.query) {
    query = query.or(`name.ilike.%${filters.query}%,description.ilike.%${filters.query}%`)
  }

  if (filters.stockState === 'in-stock') {
    query = query.gt('stock', 20)
  }

  if (filters.stockState === 'low-stock') {
    query = query.lte('stock', 20)
  }

  const response = await query
  return (response.data || []) as ProductRow[]
}

export async function ensureCategoryId(categoryName: string) {
  const { client } = getRepositoryContext()
  const slug = categoryName.toLowerCase().replaceAll(' ', '-')
  const existing = await client.from('categories').select('id').eq('slug', slug).maybeSingle()

  if (existing.data?.id) {
    return existing.data.id
  }

  const created = await client
    .from('categories')
    .insert({ name: categoryName, slug })
    .select('id')
    .single()

  const data = assertRepositoryData(created.data, created.error)
  return data.id
}

export async function insertProductRow(values: ProductFormValues) {
  const { client } = getRepositoryContext()
  const categoryId = await ensureCategoryId(values.category)
  const response = await client
    .from('products')
    .insert({
      name: values.name,
      category_id: categoryId,
      description: values.description,
      image_url: values.imageUrl,
      price: values.price,
      stock: values.stock,
      commission_percent: values.commissionPercent,
    })
    .select('id, name, description, image_url, price, stock, commission_percent, categories(name)')
    .single()

  return assertRepositoryData(response.data as ProductRow | null, response.error)
}
