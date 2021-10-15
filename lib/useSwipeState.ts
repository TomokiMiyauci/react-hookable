import { useMemo, useState } from 'react'

import type { Position } from '@/shared/types'
import { useBoolean } from '@/useBoolean'
import { useEventListener } from '@/useEventListener'
import type { VFn } from '@/utils/types'

type UseFnOptions = {
  /**
   * Callback on swipe start
   */
  onSwipeStart: (e: TouchEvent) => void

  /**
   * Callback on swipe moves
   */
  onSwipe: (e: TouchEvent) => void

  /**
   * Callback on swipe ends
   */
  onSwipeEnd: (e: TouchEvent) => void

  /**
   * EventListener passive option
   * @defaultValue - true
   */
  passive: AddEventListenerOptions['passive']
} & Omit<AddEventListenerOptions, 'once' | 'passive'>

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

type UseSwipeStateReturn = [
  {
    isSwiping: boolean
    coordsStart: Position
    coordsEnd: Position
    lengthX: number
    lengthY: number
    direction: Direction | 'NONE'
  },
  {
    use: (
      target: Window | Document | HTMLElement,
      options?: Partial<UseFnOptions>
    ) => void
    disuse: VFn
    reset: VFn
  }
]

const getTouchEventCoords = (e: TouchEvent): { x: number; y: number } => ({
  x: e.touches[0].clientX,
  y: e.touches[0].clientY
})

const initialPosition: Position = { x: 0, y: 0 }

/**
 * Reactive swipe detection based on `TouchEvents`
 * @returns Stateset of swipe and dispatcher
 *
 * @example
 * ```tsx
 * const [
 *   { isSwiping, direction, lengthX, lengthY, coordsStart, coordsEnd },
 *   { use, disuse, reset }
 * ] = useSwipeState()
 * const ref = useRef<HTMLDivElement>(null)
 *
 * useEffect(() => {
 *   if (!ref.current) return
 *   use(ref.current)
 * }, [])
 *
 * return <div ref={ref} />
 * ```
 *
 * @see
 * @beta
 */
const useSwipeState = (): UseSwipeStateReturn => {
  const [isSwiping, { on: swipeOn, off: swipeOff }] = useBoolean()
  const [coordsStart, setCoordsStart] = useState<Position>(initialPosition)
  const [coordsEnd, setCoordsEnd] = useState<Position>(initialPosition)
  const { add, remove } = useEventListener()
  const { abs } = Math

  const diffX = useMemo<number>(() => {
    const result = coordsStart.x - coordsEnd.x
    return result === 0 ? result : -result
  }, [coordsStart.x, coordsEnd.x])
  const diffY = useMemo<number>(
    () => coordsStart.y - coordsEnd.y,
    [coordsStart.y, coordsEnd.y]
  )

  const direction = useMemo<Direction | 'NONE'>(() => {
    if (diffX === 0 && diffY === 0) return 'NONE'
    if (abs(diffX) > abs(diffY)) {
      return diffX > 0 ? 'RIGHT' : 'LEFT'
    } else {
      return diffY > 0 ? 'UP' : 'DOWN'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diffX, diffY])

  const use = (
    target: Window | Document | HTMLElement,
    options?: Partial<UseFnOptions>
  ) => {
    const {
      onSwipe,
      onSwipeEnd,
      onSwipeStart,
      passive: _passive,
      ...addEventListenerOptions
    } = options ?? {}
    const passive = _passive ?? true
    add(
      target,
      'touchstart',
      (e) => {
        const coords = getTouchEventCoords(e)
        setCoordsStart(coords)
        setCoordsEnd(coords)

        onSwipeStart?.(e)
      },
      { ...addEventListenerOptions, passive }
    )

    add(
      target,
      'touchmove',
      (e) => {
        const coords = getTouchEventCoords(e)
        setCoordsEnd(coords)

        swipeOn()
        onSwipe?.(e)
      },
      { ...addEventListenerOptions, passive }
    )

    add(
      target,
      'touchend',
      (e) => {
        onSwipeEnd?.(e)
        swipeOff()
      },
      { ...addEventListenerOptions, passive }
    )
  }

  const reset: VFn = () => {
    swipeOff()
    setCoordsStart(initialPosition)
    setCoordsEnd(initialPosition)
  }

  return [
    {
      isSwiping,
      coordsStart,
      coordsEnd,
      lengthX: diffX,
      lengthY: diffY,
      direction
    },
    { use, disuse: remove, reset }
  ]
}

export { initialPosition, useSwipeState }
export type { UseFnOptions, UseSwipeStateReturn }
