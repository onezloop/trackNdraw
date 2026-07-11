import type { ChangeEvent } from 'react'
import type { AgeGroup, Artwork } from '../types'
import ImageGallery from './ImageGallery'

interface ControlDrawerProps {
  open: boolean
  artworks: Artwork[]
  selectedId: string | null
  ageGroup: AgeGroup
  onAgeGroupChange: (ageGroup: AgeGroup) => void
  onSelect: (artwork: Artwork) => void
  onUpload: (file: File) => void
  onFlipCamera: () => void
  opacity: number
  onOpacityChange: (opacity: number) => void
  onClose: () => void
}

function ControlDrawer({
  open,
  artworks,
  selectedId,
  ageGroup,
  onAgeGroupChange,
  onSelect,
  onUpload,
  onFlipCamera,
  opacity,
  onOpacityChange,
  onClose,
}: ControlDrawerProps) {
  function handleOpacityChange(event: ChangeEvent<HTMLInputElement>) {
    onOpacityChange(Number(event.target.value))
  }

  return (
    <div
      className={open ? 'drawer drawer--open' : 'drawer'}
      aria-hidden={!open}
    >
      <div className="drawer-top-row">
        <button type="button" className="flip-button" onClick={onFlipCamera}>
          🔄 Flip camera
        </button>

        <button
          type="button"
          className="drawer-close"
          onClick={onClose}
          aria-label="Hide picture picker"
        >
          ✕
        </button>
      </div>

      {selectedId && (
        <label className="opacity-control">
          <span>Picture fade</span>
          <input
            type="range"
            min={10}
            max={95}
            value={opacity}
            onChange={handleOpacityChange}
            aria-label="Picture transparency"
          />
        </label>
      )}

      <ImageGallery
        artworks={artworks}
        selectedId={selectedId}
        ageGroup={ageGroup}
        onAgeGroupChange={onAgeGroupChange}
        onSelect={onSelect}
        onUpload={onUpload}
      />
    </div>
  )
}

export default ControlDrawer
