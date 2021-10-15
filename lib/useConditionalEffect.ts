import type { DependencyList, EffectCallback } from 'react'
import { useEffect } from 'react'

/**
 * `useEffect` with conditional function
 * @param effect - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. Args is updated states
 *
 * @example
 * ```tsx
 * useConditionalEffect(effect, deps, (...deps) => boolean | undefined)
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/enhancement-useconditionaleffect
 * @beta
 */
const useConditionalEffect = <T extends DependencyList>(
  effect: EffectCallback,
  deps: T,
  condition: (...args: T) => boolean | undefined
): void => {
  useEffect(() => {
    if (condition(...deps) !== true) return
    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { useConditionalEffect }