import { useEffect, useRef, useState } from 'react'
import './App.css'
import { builtInArtworks } from './data/artworks'
import type { Artwork } from './types'
import type { CameraFacingMode } from './components/CameraView'
import ControlDrawer from './components/ControlDrawer'
import TraceStage from './components/TraceStage'

const DEFAULT_OPACITY = 55
const AUTO_HIDE_DELAY_MS = 900

function App() {
  const [uploadedArtworks, setUploadedArtworks] = useState<Artwork[]>([])
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(
    builtInArtworks[0] ?? null,
  )
  const [facingMode, setFacingMode] = useState<CameraFacingMode>('environment')
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY)
  const [panelOpen, setPanelOpen] = useState(false)
  const autoHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const artworks = [...uploadedArtworks, ...builtInArtworks]

  useEffect(() => {
    return () => {
      if (autoHideTimer.current) clearTimeout(autoHideTimer.current)
    }
  }, [])

  function handleSelect(artwork: Artwork) {
    setSelectedArtwork(artwork)
    if (autoHideTimer.current) clearTimeout(autoHideTimer.current)
    autoHideTimer.current = setTimeout(() => {
      setPanelOpen(false)
    }, AUTO_HIDE_DELAY_MS)
  }

  function handleUpload(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') return
      const artwork: Artwork = {
        id: `upload-${file.name}-${file.lastModified}-${file.size}`,
        name: file.name.replace(/\.[^./]+$/, '') || 'My drawing',
        src: reader.result,
      }
      setUploadedArtworks((prev) => [artwork, ...prev])
      handleSelect(artwork)
    }
    reader.readAsDataURL(file)
  }

  function handleFlipCamera() {
    setFacingMode((mode) => (mode === 'environment' ? 'user' : 'environment'))
  }

  function togglePanel() {
    if (autoHideTimer.current) clearTimeout(autoHideTimer.current)
    setPanelOpen((open) => !open)
  }

  function closePanel() {
    if (autoHideTimer.current) clearTimeout(autoHideTimer.current)
    setPanelOpen(false)
  }

  return (
    <div className="app">
      <TraceStage
        artwork={selectedArtwork}
        facingMode={facingMode}
        opacity={opacity}
      />

      {panelOpen && <div className="drawer-backdrop" onClick={closePanel} />}

      <ControlDrawer
        open={panelOpen}
        artworks={artworks}
        selectedId={selectedArtwork?.id ?? null}
        onSelect={handleSelect}
        onUpload={handleUpload}
        onFlipCamera={handleFlipCamera}
        opacity={opacity}
        onOpacityChange={setOpacity}
        onClose={closePanel}
      />

      {!panelOpen && (
        <button
          type="button"
          className="fab"
          onClick={togglePanel}
          aria-label="Show picture picker"
        >
          🎨
        </button>
      )}
    </div>
  )
}

export default App
