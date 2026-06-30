import { ScreenContainer } from '../components/ui/screen-container'
import { ScreenHeader } from '../components/ui/screen-header'
import { ProductsPanel } from '../features/products'

export function ProductsPage() {
  return (
    <ScreenContainer>
      <ScreenHeader
        title="Catálogo de productos"
        description="Fase 6: CRUD visual de productos con categorías, imágenes, stock, comisiones y filtros listo para conexión real."
      />
      <ProductsPanel />
    </ScreenContainer>
  )
}

export default ProductsPage
