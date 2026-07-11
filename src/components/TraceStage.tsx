import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { Artwork } from '../types'
import CameraView from './CameraView'
import type { CameraFacingMode } from './CameraView'

interface TraceStageProps {
  artwork: Artwork | null
  facingMode: CameraFacingMode
  opacity: number
}

interface DragState {
  pointerId: number
  startX: number
  startY: number
  originX: number
  originY: number
}

interface PinchState {
  startDistance: number
  startScale: number
  startAngle: number
  startRotation: number
}

const MIN_SCALE = 0.4
const MAX_SCALE = 3

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function distanceBetween(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

/** Angle of the line through the two touch points, in degrees. */
function angleBetween(a: { x: number; y: number }, b: { x: number; y: number }) {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
}

/**
 * Two fingers rotating past the ±180° seam would otherwise make the picture
 * spin the long way round, so fold each step back into (-180, 180].
 */
function shortestAngleDelta(from: number, to: number) {
  return ((to - from + 540) % 360) - 180
}

function TraceStage({ artwork, facingMode, opacity }: TraceStageProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map())
  const dragRef = useRef<DragState | null>(null)
  const pinchRef = useRef<PinchState | null>(null)

  useEffect(() => {
    setOffset({ x: 0, y: 0 })
    setScale(1)
    setRotation(0)
  }, [artwork?.id])

  // Native (non-passive) listener so we can preventDefault on desktop
  // trackpad pinch/scroll without React's passive wheel-listener warning.
  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    function onWheel(event: WheelEvent) {
      event.preventDefault()
      // Mouse/trackpad has no second finger, so Shift+wheel stands in for the
      // rotate half of the pinch gesture.
      if (event.shiftKey) {
        setRotation((r) => r + event.deltaY * 0.2)
        return
      }
      setScale((s) => clamp(s - event.deltaY * 0.0015, MIN_SCALE, MAX_SCALE))
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  function resetTransform() {
    setOffset({ x: 0, y: 0 })
    setScale(1)
    setRotation(0)
  }

  function beginPinch() {
    const [p1, p2] = Array.from(pointersRef.current.values())
    pinchRef.current = {
      startDistance: distanceBetween(p1, p2),
      startScale: scale,
      startAngle: angleBetween(p1, p2),
      startRotation: rotation,
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLImageElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointersRef.current.size === 1) {
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: offset.x,
        originY: offset.y,
      }
    } else if (pointersRef.current.size === 2) {
      dragRef.current = null
      beginPinch()
    }
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLImageElement>) {
    if (!pointersRef.current.has(event.pointerId)) return
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    const pinch = pinchRef.current
    if (pointersRef.current.size >= 2 && pinch) {
      const [p1, p2] = Array.from(pointersRef.current.values())

      const distance = distanceBetween(p1, p2)
      setScale(
        clamp((pinch.startScale * distance) / pinch.startDistance, MIN_SCALE, MAX_SCALE),
      )

      const delta = shortestAngleDelta(pinch.startAngle, angleBetween(p1, p2))
      setRotation(pinch.startRotation + delta)
      return
    }

    const drag = dragRef.current
    if (drag && drag.pointerId === event.pointerId) {
      setOffset({
        x: drag.originX + (event.clientX - drag.startX),
        y: drag.originY + (event.clientY - drag.startY),
      })
    }
  }

  function endPointer(event: ReactPointerEvent<HTMLImageElement>) {
    pointersRef.current.delete(event.pointerId)

    if (pointersRef.current.size < 2) {
      pinchRef.current = null
    }

    if (pointersRef.current.size >= 2) {
      // Lifting one of three fingers hands the pinch to a different pair —
      // re-anchor on them so the picture doesn't jump.
      beginPinch()
    } else if (pointersRef.current.size === 1) {
      const [[pointerId, pos]] = Array.from(pointersRef.current.entries())
      dragRef.current = {
        pointerId,
        startX: pos.x,
        startY: pos.y,
        originX: offset.x,
        originY: offset.y,
      }
    } else {
      dragRef.current = null
    }
  }

  const isTransformed =
    offset.x !== 0 || offset.y !== 0 || scale !== 1 || rotation !== 0

  return (
    <div className="trace-stage">
      <CameraView facingMode={facingMode} />

      {artwork ? (
        <img
          ref={imgRef}
          src={artwork.src}
          alt=""
          className="trace-overlay"
          draggable={false}
          style={{
            opacity: opacity / 100,
            transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${scale})`,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onDoubleClick={resetTransform}
        />
      ) : (
        <div className="trace-placeholder">
          <p>Tap 🎨 below to pick a picture and start tracing</p>
        </div>
      )}

      {artwork && isTransformed && (
        <button
          type="button"
          className="reset-button"
          onClick={resetTransform}
          aria-label="Reset picture position, size and rotation"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="12" cy="12" r="7" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default TraceStage
