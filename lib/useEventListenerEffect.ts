/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DependencyList } from 'react'

import { takeTarget } from '@/shared'
import type { Target } from '@/shared/types'
import { useConditionalEffect } from '@/useConditionalEffect'
import type { IsNever, Maybe } from '@/utils/types'

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

type UseEventListenerEffectOptions<
  T extends EventTarget,
  K extends keyof EventMap<T>
> = {
  target: Target<T>
  type: IsNever<K> extends true ? string : K
  listener: (
    this: T,
    ev: IsNever<EventMap<T>> extends true ? Event : EventMap<T>[K]
  ) => any
  options?: AddEventListenerOptions | boolean
}

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
 * @see https://react-hookable.vercel.app/?path=/story/effect-useeventlistenereffect
 * @beta
 */
const useEventListenerEffect = <
  T extends EventTarget,
  K extends keyof EventMap<T>
>(
  { target, type, listener, options }: UseEventListenerEffectOptions<T, K>,
  deps?: DependencyList,
  condition?: () => Maybe<boolean>
): void => {
  useConditionalEffect(
    () => {
      const _target = takeTarget(target)
      if (!_target) return
      _target.addEventListener(type as any, listener as any, options)

      return () => {
        _target.removeEventListener(type as any, listener as any, options)
      }
    },
    deps,
    condition
  )
}

export { useEventListenerEffect }
export type { UseEventListenerEffectOptions }
