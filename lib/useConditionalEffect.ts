import type { DependencyList, EffectCallback } from 'react'
import { useEffect } from 'react'

/**
 * `useEffect` with conditional function
 * @param effect - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
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
  deps: DependencyList,
  condition?: () => boolean | undefined
): void => {
  useEffect(() => {
    if (typeof condition === 'function' && condition() !== true) return
    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { useConditionalEffect }
