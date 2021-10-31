import { onTakeTarget } from './shared'

import { useMemo } from 'react'

import { useEventListenerEffect } from '@/useEventListenerEffect'
import type { EventListenerParameters } from '@/useEventListenerEffect'

import type { Target, UseEffect } from '@/shared/types'

const DEFAULT_CLICK_OUTSIDE_EVENTS: (
  | keyof HTMLElementEventMap
  | keyof SVGElementEventMap
)[] = ['click']

type UseClickOutsideEffectOptions = {
  /**
   * Target of attaching event listener
   */
  target: Target<HTMLElement | SVGElement>

  /**
   * Called when occur event at outside target
   */
  onClickOutside: (ev: Event) => void

  /**
   * Called when occur event at inside target
   */
  onClickInside?: (ev: Event) => void

  /**
   * Events that listen to
   * @defaultValue - ['click']
   */
  events?: (keyof HTMLElementEventMap | keyof SVGElementEventMap)[]
}

/**
 * Effect for click outside of target
 * @param options - Click outside options
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @example
 * ```tsx
 * useClickOutsideEffect(
 *   {
 *     target: ref,
 *     onClickOutside: () => {
 *       // call on click outside
 *     }
 *   },
 *   deps,
 *   condition
 * )
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-useclickoutsideeffect
 * @beta
 */
const useClickOutsideEffect: UseEffect<UseClickOutsideEffectOptions> = (
  {
    target,
    onClickOutside,
    onClickInside,
    events = DEFAULT_CLICK_OUTSIDE_EVENTS
  },
  deps,
  condition
) => {
  const listeners = useMemo<
    EventListenerParameters<Document, keyof DocumentEventMap>[]
  >(
    () =>
      events.map((event) => ({
        type: event,
        listener: (ev) => {
          if (!ev.target) return

          onTakeTarget(target, (el) => {
            if (!el.contains(ev.target as Element)) {
              onClickOutside(ev)
            } else {
              onClickInside?.(ev)
            }
          })
        }
      })),
    [events, target, onClickOutside, onClickInside]
  )
  useEventListenerEffect(
    {
      target: () => document,
      listeners
    },
    [deps, listeners],
    condition
  )
}

export { useClickOutsideEffect, DEFAULT_CLICK_OUTSIDE_EVENTS }
export type { UseClickOutsideEffectOptions }
