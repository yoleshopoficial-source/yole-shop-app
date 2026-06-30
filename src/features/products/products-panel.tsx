import { useCallback, useEffect, useMemo, useState } from 'react'
import { EmptyState } from '../../components/ui/empty-state'
import { ProductCard } from '../../components/ui/product-card'
import { SectionTitle } from '../../components/ui/section-title'
import { createProduct, listProducts } from '../../services/product-service'
import type { ProductFormValues, ProductViewModel } from '../../types/product'
import { ProductsForm } from './products-form'
import { ProductsToolbar } from './products-toolbar'

export function ProductsPanel() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas')
  const [stockState, setStockState] = useState('all')
  const [catalog, setCatalog] = useState<ProductViewModel[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const filters = useMemo(
    () => ({
      query,
      category,
      stockState: stockState as 'all' | 'in-stock' | 'low-stock',
    }),
    [query, category, stockState],
  )

  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const data = await listProducts(filters)
      setCatalog(data)
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo cargar el catálogo desde la base de datos.',
      )
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  async function handleCreateProduct(values: ProductFormValues) {
    try {
      await createProduct(values)
      await loadProducts()
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo guardar el producto en la base de datos.',
      )
    }
  }

  return (
    <div className="space-y-5">
      <ProductsToolbar
        query={query}
        category={category}
        stockState={stockState}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onStockStateChange={setStockState}
      />
      <ProductsForm onSubmit={handleCreateProduct} />
      <section className="space-y-3">
        <SectionTitle title="Catálogo desde base de datos" action="Recargar" />
        {isLoading ? (
          <EmptyState
            title="Cargando productos"
            description="Consultando productos reales desde la base de datos del proyecto activo."
          />
        ) : null}
        {!isLoading && errorMessage ? (
          <EmptyState title="Error de carga" description={errorMessage} />
        ) : null}
        {!isLoading && !errorMessage && catalog.length === 0 ? (
          <EmptyState
            title="Sin productos cargados"
            description="Todavía no hay productos guardados en la base de datos de este proyecto."
          />
        ) : null}
        {!isLoading && !errorMessage
          ? catalog.map((product) => <ProductCard key={product.id} product={product} />)
          : null}
      </section>
    </div>
  )
}
