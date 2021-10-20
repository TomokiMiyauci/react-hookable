import { useMemo, useState } from 'react'

import type { Position } from '@/shared/types'
import type { UseEffect } from '@/shared/types'
import { useBoolean } from '@/useBoolean'
import type { UseTouchEffect } from '@/useTouchEffect'
import { useTouchEffect } from '@/useTouchEffect'
import type { VFn } from '@/utils/types'

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

type UseSwipeEffectState = {
  /**
   * Whether are swiping or not
   */
  isSwiping: boolean

  /**
   * Starting point of the swipe
   */
  coordsStart: Position

  /**
   * End point of swipe
   */
  coordsEnd: Position

  /**
   * The length of the X-axis you are swiping
   */
  lengthX: number

  /**
   * The length of the Y-axis you are swiping
   */
  lengthY: number

  /**
   * Swipe direction
   */
  direction: Direction | 'NONE'
}

type UseSwipeEffectDispatch = {
  reset: VFn
}

const getTouchEventCoords = (e: TouchEvent): Position => ({
  x: e.touches[0].clientX,
  y: e.touches[0].clientY
})

const calcDirection = ({
  diffX,
  diffY
}: {
  diffX: number
  diffY: number
}): Direction | 'NONE' => {
  if (diffX === 0 && diffY === 0) return 'NONE'
  if (Math.abs(diffX) > Math.abs(diffY)) {
    return diffX > 0 ? 'RIGHT' : 'LEFT'
  } else {
    return diffY > 0 ? 'UP' : 'DOWN'
  }
}

const calcDiffX = ({
  startX,
  endX
}: {
  startX: number
  endX: number
}): number => {
  const result = startX - endX
  return result === 0 ? result : -result
}

const initialPosition: Position = { x: 0, y: 0 }

type UseSwipeEffectStateOptions = Omit<
  UseTouchEffect,
  'onTouchStart' | 'onTouchMove' | 'onTouchEnd'
> & {
  /**
   * Call on swipe start
   */
  onSwipeStart?: (ev: TouchEvent) => void

  /**
   * Keeps being called while swiping
   */
  onSwipe?: (ev: TouchEvent) => void

  /**
   * Call on swipe end
   */
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

  const diffX = useMemo<number>(
    () => calcDiffX({ startX: coordsStart.x, endX: coordsEnd.x }),
    [coordsStart.x, coordsEnd.x]
  )

  const diffY = useMemo<number>(
    () => coordsStart.y - coordsEnd.y,
    [coordsStart.y, coordsEnd.y]
  )

  const direction = useMemo<Direction | 'NONE'>(
    () =>
      calcDirection({
        diffX,
        diffY
      }),
    [diffX, diffY]
  )

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

export { calcDiffX, calcDirection, initialPosition, useSwipeEffectState }
export type {
  Direction,
  UseSwipeEffectDispatch,
  UseSwipeEffectState,
  UseSwipeEffectStateOptions
}
