import { useEffect } from 'react'
import type { Artwork } from './types'

type IdleHandle = ReturnType<typeof setTimeout> | number

const START_DELAY_MS = 1500

function whenIdle(callback: () => void): IdleHandle {
  if (typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(callback, { timeout: 2000 })
  }
  return setTimeout(callback, 200)
}

function cancelIdle(handle: IdleHandle) {
  if (typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(handle as number)
    return
  }
  clearTimeout(handle as ReturnType<typeof setTimeout>)
}

/**
 * Warms the browser cache with the artwork the child hasn't looked at yet.
 *
 * Only the pictures in the open age group are fetched up front (the gallery's
 * <img> tags are lazy), so without this, switching to Under 15 stalls while its
 * detailed drawings download. Fetching one at a time on idle keeps those
 * downloads out of the way of the camera and the current tab.
 *
 * Pictures small enough for Vite to inline are already data: URIs inside the JS
 * bundle, so there is nothing to fetch for those.
 */
export function usePrefetchArtworks(artworks: Artwork[]) {
  useEffect(() => {
    const urls = artworks
      .map((artwork) => artwork.src)
      .filter((src) => !src.startsWith('data:'))

    let cancelled = false
    let index = 0

    // Hold off briefly: getting the camera up and the chosen picture drawn
    // matters more than warming pictures nobody has asked for yet.
    let handle: IdleHandle = setTimeout(() => {
      handle = whenIdle(fetchNext)
    }, START_DELAY_MS)

    function fetchNext() {
      if (cancelled || index >= urls.length) return
      const image = new Image()
      image.onload = image.onerror = () => {
        if (!cancelled) handle = whenIdle(fetchNext)
      }
      image.src = urls[index++]
    }

    return () => {
      cancelled = true
      cancelIdle(handle)
    }
    // Built-in artwork is a module-level constant, so this runs once.
  }, [artworks])
}
