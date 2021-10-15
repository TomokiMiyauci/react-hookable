/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RefObject, useState } from 'react'

import { takeCurrent } from '@/shared'
import type { UseEffect } from '@/shared/types'
import { useConditionalEffect } from '@/useConditionalEffect'
import { useEventListener } from '@/useEventListener'
import { useUpdateEffect } from '@/useUpdateEffect'

type UseTouchEffect =
  | {
      target:
        | Window
        | Document
        | HTMLElement
        | SVGElement
        | RefObject<HTMLElement | SVGElement>
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
 * @param deps - Effect will only activate if the values in the list change
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
  const { add, remove } = useEventListener()
  const [startEvent, setStartEvent] = useState<TouchEvent>()
  const [event, setEvent] = useState<TouchEvent>()
  const [endEvent, setEndEvent] = useState<TouchEvent>()

  useUpdateEffect(() => {
    onTouchStart?.(startEvent!)
  }, [startEvent])

  useUpdateEffect(() => {
    onTouchMove?.(event!)
  }, [event])

  useUpdateEffect(() => {
    onTouchEnd?.(endEvent!)
  }, [endEvent])

  useConditionalEffect(
    () => {
      const current = takeCurrent(target)
      if (!current) return

      add(
        current,
        'touchstart',
        (e) => {
          setStartEvent(e)
        },
        { ...addEventListenerOptions, passive }
      )

      add(
        current,
        'touchmove',
        (e) => {
          setEvent(e)
        },
        { ...addEventListenerOptions, passive }
      )

      add(
        current,
        'touchend',
        (e) => {
          setEndEvent(e)
        },
        { ...addEventListenerOptions, passive }
      )

      return remove
    },
    deps,
    condition
  )
}

export { useTouchEffect }
export type { UseTouchEffect }
