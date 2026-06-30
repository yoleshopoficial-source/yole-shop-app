import type { OrderImageDraft } from '../../types/order'

interface ImageUploadGridProps {
  images: OrderImageDraft[]
  onChange: (files: FileList | null) => void
}

function getStatusLabel(status: OrderImageDraft['status']) {
  const labels = {
    pending: 'Pendiente',
    optimizing: 'Optimizando',
    ready: 'Lista',
    uploading: 'Subiendo',
    uploaded: 'Subida',
    error: 'Error',
  }

  return labels[status]
}

export function ImageUploadGrid({ images, onChange }: ImageUploadGridProps) {
  return (
    <div className="space-y-3">
      <label className="block rounded-3xl border border-dashed border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
        <span>Subir hasta 10 imágenes del pedido</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => onChange(event.target.files)}
          className="mt-3 block w-full"
        />
      </label>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((image) => (
          <div key={image.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-2">
            <img src={image.previewUrl} alt={image.fileName} className="h-28 w-full rounded-xl object-cover" />
            <p className="mt-2 truncate text-xs text-slate-300">{image.fileName}</p>
            <p className="text-[11px] text-slate-500">{image.sizeKb} KB</p>
            <div className="mt-2 h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${image.progress}%` }} />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">{getStatusLabel(image.status)}</p>
            {image.errorMessage ? (
              <p className="text-[11px] text-rose-300">{image.errorMessage}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
