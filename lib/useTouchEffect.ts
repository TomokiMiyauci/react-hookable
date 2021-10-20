/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react'

import type { Target, UseEffect } from '@/shared/types'
import { useEventListenerEffect } from '@/useEventListenerEffect'
import { useUpdateEffect } from '@/useUpdateEffect'

type UseTouchEffect =
  | {
      target: Target<Window | Document | HTMLElement | SVGElement>
      /**
       * Callback on touch start
       */
      onTouchStart?: (e: TouchEvent) => void

      /**
       * Callback on touch moves
       */
      onTouchMove?: (e: TouchEvent) => void

      /**
       * Callback on touch ends
       */
      onTouchEnd?: (e: TouchEvent) => void

      /**
       * EventListener passive option
       * @defaultValue - true
       */
      passive?: AddEventListenerOptions['passive']
    } & Partial<Omit<AddEventListenerOptions, 'once' | 'passive'>>

/**
 * `TouchEvents` effect
 * @param touchEffect - Define binding `target` with `TouchEvents`, effect `onTouchStart`, `onTouchMove` and `onTouchEnd`
 * @param deps - If present, effect will only activate if the values in the list change.
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 *
 * @example
 * ```tsx
 * useTouchEffect({
 *   target: window,
 *   onTouchStart: (ev) => {
 *     // onTouchStart
 *   },
 *   []
 * })
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-usetoucheffect
 * @beta
 */
const useTouchEffect: UseEffect<UseTouchEffect> = (
  {
    target,
    onTouchMove,
    onTouchEnd,
    onTouchStart,
    passive = true,
    ...addEventListenerOptions
  },
  deps,
  condition
): void => {
  const [startEvent, setStartEvent] = useState<TouchEvent>()
  const [event, setEvent] = useState<TouchEvent>()
  const [endEvent, setEndEvent] = useState<TouchEvent>()

  useEventListenerEffect(
    {
      target,
      listeners: [
        {
          type: 'touchstart',
          listener: setStartEvent,
          options: {
            ...addEventListenerOptions,
            passive
          }
        },
        {
          type: 'touchmove',
          listener: setEvent,
          options: {
            ...addEventListenerOptions,
            passive
          }
        },
        {
          type: 'touchend',
          listener: setEndEvent,
          options: { ...addEventListenerOptions, passive }
        }
      ]
    },
    deps,
    condition
  )

  useUpdateEffect(() => {
    onTouchStart?.(startEvent!)
  }, [startEvent])

  useUpdateEffect(() => {
    onTouchMove?.(event!)
  }, [event])

  useUpdateEffect(() => {
    onTouchEnd?.(endEvent!)
  }, [endEvent])
}

export { useTouchEffect }
export type { UseTouchEffect }
