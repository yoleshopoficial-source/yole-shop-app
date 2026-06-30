import { mapProductRow } from '../repositories/products/product-mappers'
import {
  fetchProductRows,
  insertProductRow,
} from '../repositories/products/product-repository'
import type { ProductFilterValues, ProductFormValues } from '../types/product'

export async function listProducts(filters: ProductFilterValues) {
  const rows = await fetchProductRows(filters)
  const mapped = rows.map(mapProductRow)

  if (filters.category === 'Todas') {
    return mapped
  }

  return mapped.filter((item) => item.category === filters.category)
}

export async function createProduct(values: ProductFormValues) {
  const row = await insertProductRow(values)
  return mapProductRow(row)
}
