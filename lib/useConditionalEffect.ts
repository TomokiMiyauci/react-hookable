import { useEffect, useLayoutEffect } from 'react'

import type { Maybe } from '@/utils/types'
import type { DependencyList, EffectCallback } from 'react'

/**
 * `useEffect` with conditional function
 * @param effect - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @param effectHook - Which effect hooks to use
 *
 * @example
 * ```tsx
 * useConditionalEffect(effect, deps, () => boolean | undefined)
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/enhancement-useconditionaleffect
 * @beta
 */
const useConditionalEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
  condition?: () => Maybe<boolean>,

  /**
   * @defaultValue `useEffect`
   */
  effectHook?: typeof useEffect | typeof useLayoutEffect
): void => {
  const useEffectHook = effectHook ?? useEffect
  useEffectHook(() => {
    if (typeof condition === 'function' && condition() !== true) return
    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { useConditionalEffect }
