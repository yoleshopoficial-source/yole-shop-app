import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormInput } from '../../components/ui/form-input'
import { GlassCard } from '../../components/ui/glass-card'
import { ImageUploadGrid } from '../../components/ui/image-upload-grid'
import { NotificationBanner } from '../../components/ui/notification-banner'
import { OrderSummaryCard } from '../../components/ui/order-summary-card'
import { SelectInput } from '../../components/ui/select-input'
import { TextareaInput } from '../../components/ui/textarea-input'
import { useOrderForm } from '../../hooks/use-order-form'
import { optimizeOrderImages } from '../../lib/image-optimizer'
import type { OrderFormFields, OrderFormValues, OrderImageDraft } from '../../types/order'

interface OrdersFormProps {
  onSubmit: SubmitHandler<OrderFormValues>
  onImageProgress?: (imageId: string, progress: number, status: OrderImageDraft['status']) => void
}

export function OrdersForm({ onSubmit }: OrdersFormProps) {
  const form = useOrderForm()
  const [images, setImages] = useState<OrderImageDraft[]>([])
  const [uploadMessage, setUploadMessage] = useState('')

  async function handleFiles(files: FileList | null) {
    if (!files) {
      return
    }

    setUploadMessage('Optimizando imágenes...')
    const optimized = await optimizeOrderImages(files)
    setImages(optimized)
    setUploadMessage('Imágenes preparadas correctamente.')
  }

  async function handleLocalSubmit(values: OrderFormFields) {
    setUploadMessage('Creando pedido y subiendo imágenes...')
    await onSubmit({
      ...values,
      images,
    })
    setUploadMessage('Pedido creado correctamente.')
  }

  return (
    <GlassCard>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleLocalSubmit)}>
        {uploadMessage ? <NotificationBanner message={uploadMessage} tone="info" /> : null}
        <OrderSummaryCard
          productName={form.watch('productName')}
          sizes={form.watch('sizes')}
          paymentType={form.watch('paymentType')}
        />
        <FormInput label="Producto" placeholder="Vestido rojo manga larga" registration={form.register('productName')} error={form.formState.errors.productName?.message} />
        <FormInput label="Talla o tallas" placeholder="XL y L" registration={form.register('sizes')} error={form.formState.errors.sizes?.message} />
        <FormInput label="Precio del producto" type="number" placeholder="35" registration={form.register('productPrice', { valueAsNumber: true })} error={form.formState.errors.productPrice?.message} />
        <FormInput label="Dirección" placeholder="Avenida Central 55, puerta 3" registration={form.register('address')} error={form.formState.errors.address?.message} />
        <FormInput label="Número de teléfono" placeholder="+34 600 000 000" registration={form.register('phone')} error={form.formState.errors.phone?.message} />
        <FormInput label="Precio del domicilio" type="number" placeholder="0" registration={form.register('deliveryPrice', { valueAsNumber: true })} error={form.formState.errors.deliveryPrice?.message} />
        <FormInput label="Nombre del cliente" placeholder="María López" registration={form.register('customerName')} error={form.formState.errors.customerName?.message} />
        <SelectInput label="Tipo de pago" value={form.watch('paymentType')} onChange={(value) => form.setValue('paymentType', value as OrderFormFields['paymentType'])} options={['transferencia', 'efectivo', 'zelle', 'otro']} />
        <FormInput label="Hora de entrega" type="time" placeholder="" registration={form.register('deliveryTime')} error={form.formState.errors.deliveryTime?.message} />
        <TextareaInput label="Observaciones" placeholder="Llevar dos tallas para probar. No tocar el timbre. Llamar antes de llegar." registration={form.register('notes')} error={form.formState.errors.notes?.message} />
        <ImageUploadGrid images={images} onChange={handleFiles} />
        <button className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-medium text-slate-950">
          Crear pedido
        </button>
      </form>
    </GlassCard>
  )
}
