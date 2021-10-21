/* eslint-disable @typescript-eslint/no-explicit-any */

import { takeTarget } from '@/shared'
import { useConditionalEffect } from '@/useConditionalEffect'

import type { Target } from '@/shared/types'
import type { IsNever, Maybe } from '@/utils/types'
import type { DependencyList } from 'react'
import type { Exclusive } from 'utilitypes'

type EventMap<T extends EventTarget> = T extends HTMLElement
  ? HTMLElementEventMap
  : T extends SVGElement
  ? SVGElementEventMap
  : T extends Element
  ? ElementEventMap
  : T extends Document
  ? DocumentEventMap
  : T extends Window
  ? WindowEventMap
  : never

type EventListenerParameters<
  T extends EventTarget,
  K extends keyof EventMap<T>
> = {
  /**
   * Event type
   */
  type: IsNever<K> extends true ? string : K

  /**
   * The object that receives a notification when an event of the specified type occurs
   */
  listener: (
    this: T,
    ev: IsNever<EventMap<T>> extends true ? Event : EventMap<T>[K]
  ) => any

  /**
   * An options object specifies characteristics about the event listener
   */
  options?: AddEventListenerOptions | boolean
}

type UseEventListenerEffectOptions<
  T extends EventTarget,
  K extends keyof EventMap<T>
> = {
  /**
   * `EventListener` target
   */
  target: Target<T>

  /**
   * `addEventListener` arguments. Configure multiple event listeners from `listeners`.
   *
   * @example
   * ```ts
   * {
   *  target: window,
   *  type: 'click',
   *  listener: () => {},
   *  options: { passive: true }
   * }
   * ```
   *
   * @example
   * ```ts
   * {
   *  target: window,
   *  listeners: [
   *    { type: 'touchstart', listener: () => {} }, { type: 'touchmove', listener: () => {} }
   *  ]
   * }
   * ```
   */
} & Exclusive<
  EventListenerParameters<T, K>,
  { listeners: EventListenerParameters<T, K>[] }
>

/**
 * `EventListener` effect that clean up automatically
 * @param options - EventListener options
 * @param deps - If present, effect will only activate if the values in the list change.
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 *
 * @example
 * ```tsx
 * useEventListenerEffect({
 *   target: () => document,
 *   type: 'resize',
 *   listener: (ev) => {
 *     // fire on resize
 *   },
 *   []
 * })
 * ```
 *
 * @example
 * ```tsx
 * useEventListenerEffect({
 *   target: window,
 *   listeners: [
 *     {
 *       type: 'touchstart',
 *       listener: () => {
 *         // fire on touchstart
 *       },
 *       options: { passive: true }
 *     },
 *     {
 *       type: 'touchmove',
 *       listener: () => {
 *         // fire on touchmove
 *       }
 *     }
 *   ]
 * })
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-useeventlistenereffect
 * @beta
 */
const useEventListenerEffect = <
  T extends EventTarget,
  K extends keyof EventMap<T>
>(
  {
    target,
    type,
    listener,
    options,
    listeners = []
  }: UseEventListenerEffectOptions<T, K>,
  deps?: DependencyList,
  condition?: () => Maybe<boolean>
): void => {
  useConditionalEffect(
    () => {
      const _target = takeTarget(target)
      if (!_target) return

      const eventListeners =
        typeof listener === 'undefined'
          ? listeners
          : [{ type, listener, options }]

      eventListeners.forEach(({ type, listener, options }) => {
        _target.addEventListener(type as any, listener as any, options)
      })

      return () => {
        eventListeners.forEach(({ type, listener, options }) => {
          _target.removeEventListener(type as any, listener as any, options)
        })
      }
    },
    deps,
    condition
  )
}

export { useEventListenerEffect }
export type { UseEventListenerEffectOptions }
