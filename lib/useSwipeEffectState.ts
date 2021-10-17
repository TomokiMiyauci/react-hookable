import { useMemo, useState } from 'react'

import type { Position } from '@/shared/types'
import type { UseEffect } from '@/shared/types'
import { useBoolean } from '@/useBoolean'
import type { UseTouchEffect } from '@/useTouchEffect'
import { useTouchEffect } from '@/useTouchEffect'
import type { VFn } from '@/utils/types'

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

type UseSwipeEffectState = {
  isSwiping: boolean
  coordsStart: Position
  coordsEnd: Position
  lengthX: number
  lengthY: number
  direction: Direction | 'NONE'
}

type UseSwipeEffectDispatch = {
  reset: VFn
}

const getTouchEventCoords = (e: TouchEvent): Position => ({
  x: e.touches[0].clientX,
  y: e.touches[0].clientY
})

const initialPosition: Position = { x: 0, y: 0 }

type UseSwipeEffectStateOptions = Omit<
  UseTouchEffect,
  'onTouchStart' | 'onTouchMove' | 'onTouchEnd'
> & {
  onSwipeStart?: (ev: TouchEvent) => void
  onSwipe?: (ev: TouchEvent) => void
  onSwipeEnd?: (ev: TouchEvent) => void
}

/**
 * Reactive swipe detection based on `TouchEvents`
 * @param useSwipeEffectStateOptions - Define binding `target` with `TouchEvents`
 * @param deps - Effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @returns Stateset of swipe and dispatcher
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const [
 *   { isSwiping, direction, lengthX, lengthY, coordsStart, coordsEnd },
 *   { reset }
 * ] = useSwipeEffectState({ target: ref }, [])
 *
 * return <div ref={ref} />
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effectstate-useswipeeffectstate
 * @beta
 */
const useSwipeEffectState: UseEffect<
  UseSwipeEffectStateOptions,
  [UseSwipeEffectState, UseSwipeEffectDispatch]
> = ({ onSwipe, onSwipeEnd, onSwipeStart, ...rest }, deps, condition) => {
  useTouchEffect(
    {
      onTouchStart: (ev) => {
        const coords = getTouchEventCoords(ev)
        setCoordsStart(coords)
        setCoordsEnd(coords)

        onSwipeStart?.(ev)
      },
      onTouchMove: (ev) => {
        const coords = getTouchEventCoords(ev)
        setCoordsEnd(coords)

        swipeOn()
        onSwipe?.(ev)
      },
      onTouchEnd: (ev) => {
        swipeOff()

        onSwipeEnd?.(ev)
      },
      ...rest
    },
    deps,
    condition
  )
  const [isSwiping, { on: swipeOn, off: swipeOff }] = useBoolean()
  const [coordsStart, setCoordsStart] = useState<Position>(initialPosition)
  const [coordsEnd, setCoordsEnd] = useState<Position>(initialPosition)
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
    { reset }
  ]
}

export { initialPosition, useSwipeEffectState }
export type {
  UseSwipeEffectDispatch,
  UseSwipeEffectState,
  UseSwipeEffectStateOptions
}
