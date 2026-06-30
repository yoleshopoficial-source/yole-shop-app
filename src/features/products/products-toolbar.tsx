import { SearchInput } from '../../components/ui/search-input'
import { SelectInput } from '../../components/ui/select-input'

interface ProductsToolbarProps {
  query: string
  category: string
  stockState: string
  onQueryChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onStockStateChange: (value: string) => void
}

export function ProductsToolbar({
  query,
  category,
  stockState,
  onQueryChange,
  onCategoryChange,
  onStockStateChange,
}: ProductsToolbarProps) {
  return (
    <div className="grid gap-4">
      <SearchInput value={query} onChange={onQueryChange} />
      <div className="grid gap-4 md:grid-cols-2">
        <SelectInput
          label="Categoría"
          value={category}
          onChange={onCategoryChange}
          options={['Todas', 'Tecnología', 'Audio', 'Accesorios']}
        />
        <SelectInput
          label="Estado de stock"
          value={stockState}
          onChange={onStockStateChange}
          options={['all', 'in-stock', 'low-stock']}
        />
      </div>
    </div>
  )
}
