import { getRepositoryContext } from '../shared/repository-context'
import type { OrderImageDraft } from '../../types/order'

const bucket = 'order-images'

async function uploadSingleOrderImage(
  orderId: string,
  image: OrderImageDraft,
  sortOrder: number,
  onProgress?: (imageId: string, progress: number, status: OrderImageDraft['status']) => void,
) {
  const { client } = getRepositoryContext()

  if (!image.file) {
    throw new Error('La imagen optimizada no está disponible para subir.')
  }

  onProgress?.(image.id, 15, 'uploading')
  const path = `${orderId}/${sortOrder}-${image.fileName}`
  const upload = await client.storage.from(bucket).upload(path, image.file, {
    contentType: image.mimeType,
    upsert: true,
  })

  if (upload.error) {
    onProgress?.(image.id, 100, 'error')
    throw upload.error
  }

  onProgress?.(image.id, 100, 'uploaded')

  return {
    order_id: orderId,
    storage_path: upload.data.path,
    sort_order: sortOrder,
    mime_type: image.mimeType,
    width: image.width || null,
    height: image.height || null,
    size_kb: image.sizeKb,
  }
}

export async function insertOrderImages(
  orderId: string,
  images: OrderImageDraft[],
  onProgress?: (imageId: string, progress: number, status: OrderImageDraft['status']) => void,
) {
  if (images.length === 0) {
    return
  }

  const { client } = getRepositoryContext()
  const payload = []

  for (const [index, image] of images.entries()) {
    payload.push(await uploadSingleOrderImage(orderId, image, index, onProgress))
  }

  const response = await client.from('order_images').insert(payload)

  if (response.error) {
    throw response.error
  }
}
