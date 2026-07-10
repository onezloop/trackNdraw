import type { ChangeEvent } from 'react'
import type { Artwork } from '../types'

interface ImageGalleryProps {
  artworks: Artwork[]
  selectedId: string | null
  onSelect: (artwork: Artwork) => void
  onUpload: (file: File) => void
}

function ImageGallery({
  artworks,
  selectedId,
  onSelect,
  onUpload,
}: ImageGalleryProps) {
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      onUpload(file)
    }
    event.target.value = ''
  }

  return (
    <div className="gallery">
      <label className="gallery-item gallery-upload">
        <input type="file" accept="image/*" onChange={handleFileChange} hidden />
        <span className="gallery-upload-icon" aria-hidden="true">
          +
        </span>
        <span>Upload art</span>
      </label>
      {artworks.map((artwork) => (
        <button
          key={artwork.id}
          type="button"
          className={
            artwork.id === selectedId
              ? 'gallery-item gallery-item--selected'
              : 'gallery-item'
          }
          onClick={() => onSelect(artwork)}
        >
          <img src={artwork.src} alt={artwork.name} />
          <span>{artwork.name}</span>
        </button>
      ))}
    </div>
  )
}

export default ImageGallery
