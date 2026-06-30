import type { OrderImageDraft } from '../types/order'

async function fileToImageBitmap(file: File) {
  return createImageBitmap(file)
}

async function canvasToWebp(canvas: HTMLCanvasElement, fileName: string) {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((value) => resolve(value), 'image/webp', 0.82),
  )

  if (!blob) {
    throw new Error('No se pudo optimizar la imagen.')
  }

  return new File([blob], fileName.replace(/\.[^.]+$/, '.webp'), {
    type: 'image/webp',
  })
}

export async function optimizeOrderImages(files: FileList | File[]) {
  const selected = Array.from(files).slice(0, 10)

  return Promise.all(
    selected.map(async (file, index) => {
      const bitmap = await fileToImageBitmap(file)
      const maxWidth = 1400
      const ratio = Math.min(1, maxWidth / bitmap.width)
      const width = Math.round(bitmap.width * ratio)
      const height = Math.round(bitmap.height * ratio)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')

      if (!context) {
        throw new Error('No se pudo preparar el optimizador de imágenes.')
      }

      context.drawImage(bitmap, 0, 0, width, height)
      const optimizedFile = await canvasToWebp(canvas, file.name)
      const previewUrl = URL.createObjectURL(optimizedFile)

      return {
        id: `${file.name}-${index}`,
        fileName: optimizedFile.name,
        mimeType: optimizedFile.type,
        previewUrl,
        sizeKb: Math.round(optimizedFile.size / 1024),
        width,
        height,
        file: optimizedFile,
        status: 'ready',
        progress: 100,
      } satisfies OrderImageDraft
    }),
  )
}
