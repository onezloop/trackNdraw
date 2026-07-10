import { useEffect, useRef, useState } from 'react'
import type { WheelEvent } from 'react'

export type CameraFacingMode = 'environment' | 'user'
type CameraStatus = 'requesting' | 'ready' | 'error'

type CameraErrorReason =
  | 'insecure-context'
  | 'unsupported'
  | 'permission-denied'
  | 'not-found'
  | 'in-use'
  | 'unknown'

interface TorchCapabilities extends MediaTrackCapabilities {
  torch?: boolean
}

interface TorchConstraintSet extends MediaTrackConstraintSet {
  torch?: boolean
}

interface CameraViewProps {
  facingMode: CameraFacingMode
}

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.25

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

const ERROR_COPY: Record<CameraErrorReason, { title: string; body: string }> = {
  'insecure-context': {
    title: 'Needs a secure connection',
    body: "Browsers only allow the camera on https:// pages or on localhost. This page was opened over a plain http:// address (like a network IP), so the camera is blocked. Open the site over https, or use localhost on this device.",
  },
  unsupported: {
    title: 'Camera not supported',
    body: 'This browser cannot access a camera. Try a recent version of Chrome, Edge, Firefox or Safari.',
  },
  'permission-denied': {
    title: 'Camera permission blocked',
    body: 'Camera access was denied for this site. Allow the camera permission in your browser settings, then try again.',
  },
  'not-found': {
    title: 'No camera found',
    body: "We couldn't find a camera on this device. Connect a camera and try again.",
  },
  'in-use': {
    title: 'Camera is busy',
    body: 'Another app or browser tab may already be using the camera. Close it and try again.',
  },
  unknown: {
    title: 'Camera unavailable',
    body: 'Something went wrong starting the camera.',
  },
}

function classifyError(err: unknown): CameraErrorReason {
  if (err instanceof DOMException) {
    if (err.name === 'NotAllowedError' || err.name === 'SecurityError') {
      return 'permission-denied'
    }
    if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      return 'not-found'
    }
    if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
      return 'in-use'
    }
  }
  return 'unknown'
}

function CameraView({ facingMode }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const trackRef = useRef<MediaStreamTrack | null>(null)
  const [status, setStatus] = useState<CameraStatus>('requesting')
  const [errorReason, setErrorReason] = useState<CameraErrorReason>('unknown')
  const [errorDetail, setErrorDetail] = useState('')
  const [torchSupported, setTorchSupported] = useState(false)
  const [torchOn, setTorchOn] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [zoom, setZoom] = useState(MIN_ZOOM)

  useEffect(() => {
    setZoom(MIN_ZOOM)
  }, [facingMode])

  useEffect(() => {
    let stream: MediaStream | null = null
    let cancelled = false

    function fail(reason: CameraErrorReason, detail: string) {
      if (cancelled) return
      setStatus('error')
      setErrorReason(reason)
      setErrorDetail(detail)
    }

    async function startCamera() {
      setStatus('requesting')
      setTorchSupported(false)
      setTorchOn(false)

      if (!window.isSecureContext) {
        fail('insecure-context', '')
        return
      }

      if (!navigator.mediaDevices) {
        fail('unsupported', '')
        return
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        const [videoTrack] = stream.getVideoTracks()
        trackRef.current = videoTrack ?? null

        try {
          const capabilities = videoTrack
            ? (videoTrack.getCapabilities() as TorchCapabilities)
            : undefined
          setTorchSupported(Boolean(capabilities?.torch))
        } catch {
          setTorchSupported(false)
        }

        setStatus('ready')
      } catch (err) {
        fail(
          classifyError(err),
          err instanceof Error ? err.message : String(err),
        )
      }
    }

    startCamera()

    return () => {
      cancelled = true
      trackRef.current = null
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [facingMode, retryCount])

  async function toggleTorch() {
    const track = trackRef.current
    if (!track) return
    const next = !torchOn
    try {
      await track.applyConstraints({
        advanced: [{ torch: next } as TorchConstraintSet],
      })
      setTorchOn(next)
    } catch {
      setTorchSupported(false)
    }
  }

  function zoomBy(delta: number) {
    setZoom((z) => clamp(Math.round((z + delta) * 100) / 100, MIN_ZOOM, MAX_ZOOM))
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (status !== 'ready') return
    zoomBy(-event.deltaY * 0.0015)
  }

  const errorCopy = ERROR_COPY[errorReason]

  return (
    <div className="camera-view" onWheel={handleWheel}>
      <video
        ref={videoRef}
        className="camera-video"
        style={{ transform: `scale(${zoom})` }}
        autoPlay
        playsInline
        muted
      />

      {status === 'ready' && (
        <div className="zoom-control">
          <button
            type="button"
            onClick={() => zoomBy(ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
          >
            +
          </button>
          <span className="zoom-level">{Number(zoom.toFixed(2))}×</span>
          <button
            type="button"
            onClick={() => zoomBy(-ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      )}

      {status === 'ready' && torchSupported && (
        <button
          type="button"
          className={torchOn ? 'torch-button torch-button--on' : 'torch-button'}
          onClick={toggleTorch}
          aria-label={torchOn ? 'Turn off flashlight' : 'Turn on flashlight'}
        >
          {torchOn ? '🔦' : '💡'}
        </button>
      )}

      {status === 'requesting' && (
        <div className="camera-message">Starting camera…</div>
      )}

      {status === 'error' && (
        <div className="camera-modal-backdrop" role="alertdialog" aria-modal="true">
          <div className="camera-modal">
            <span className="camera-modal-icon" aria-hidden="true">
              📷
            </span>
            <h2>{errorCopy.title}</h2>
            <p>{errorCopy.body}</p>
            {errorDetail && <p className="camera-modal-detail">{errorDetail}</p>}
            <button
              type="button"
              className="camera-modal-retry"
              onClick={() => setRetryCount((count) => count + 1)}
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CameraView
