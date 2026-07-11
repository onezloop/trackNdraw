import type { ChangeEvent } from 'react'
import type { AgeGroup, Artwork } from '../types'
import { ageGroups } from '../types'

interface ImageGalleryProps {
  artworks: Artwork[]
  selectedId: string | null
  ageGroup: AgeGroup
  onAgeGroupChange: (ageGroup: AgeGroup) => void
  onSelect: (artwork: Artwork) => void
  onUpload: (file: File) => void
}

function ImageGallery({
  artworks,
  selectedId,
  ageGroup,
  onAgeGroupChange,
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

  // Uploaded pictures carry no age group, so they stay visible in every tab.
  const visible = artworks.filter(
    (artwork) => !artwork.ageGroup || artwork.ageGroup === ageGroup,
  )

  return (
    <>
      <div className="age-tabs" role="tablist" aria-label="Age group">
        {ageGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={group.id === ageGroup}
            className={
              group.id === ageGroup ? 'age-tab age-tab--active' : 'age-tab'
            }
            onClick={() => onAgeGroupChange(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="gallery">
        <label className="gallery-item gallery-upload">
          <input type="file" accept="image/*" onChange={handleFileChange} hidden />
          <span className="gallery-upload-icon" aria-hidden="true">
            +
          </span>
          <span className="gallery-item-label">Upload art</span>
        </label>
        {visible.map((artwork) => (
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
            <img
              src={artwork.src}
              alt={artwork.name}
              loading="lazy"
              decoding="async"
            />
            <span className="gallery-item-label">{artwork.name}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export default ImageGallery
