import type { SubmitHandler } from 'react-hook-form'
import { FormInput } from '../../components/ui/form-input'
import { GlassCard } from '../../components/ui/glass-card'
import { useProductForm } from '../../hooks/use-product-form'
import type { ProductFormValues } from '../../types/product'

interface ProductsFormProps {
  onSubmit: SubmitHandler<ProductFormValues>
}

export function ProductsForm({ onSubmit }: ProductsFormProps) {
  const form = useProductForm()

  return (
    <GlassCard>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          label="Nombre del producto"
          placeholder="Combo Smart Pro"
          registration={form.register('name')}
          error={form.formState.errors.name?.message}
        />
        <FormInput
          label="Categoría"
          placeholder="Tecnología"
          registration={form.register('category')}
          error={form.formState.errors.category?.message}
        />
        <div className="grid gap-4 md:grid-cols-3">
          <FormInput
            label="Precio"
            type="number"
            placeholder="350"
            registration={form.register('price', { valueAsNumber: true })}
            error={form.formState.errors.price?.message}
          />
          <FormInput
            label="Stock"
            type="number"
            placeholder="25"
            registration={form.register('stock', { valueAsNumber: true })}
            error={form.formState.errors.stock?.message}
          />
          <FormInput
            label="Comisión %"
            type="number"
            placeholder="12"
            registration={form.register('commissionPercent', { valueAsNumber: true })}
            error={form.formState.errors.commissionPercent?.message}
          />
        </div>
        <FormInput
          label="URL de imagen"
          placeholder="https://images.example.com/product.png"
          registration={form.register('imageUrl')}
          error={form.formState.errors.imageUrl?.message}
        />
        <FormInput
          label="Descripción"
          placeholder="Describe el producto y su propuesta comercial"
          registration={form.register('description')}
          error={form.formState.errors.description?.message}
        />
        <button className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-medium text-slate-950">
          Guardar producto
        </button>
      </form>
    </GlassCard>
  )
}
