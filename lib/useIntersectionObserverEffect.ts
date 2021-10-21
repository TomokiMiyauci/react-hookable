import { takeTarget } from '@/shared'
import { useConditionalEffect } from '@/useConditionalEffect'

import type { Target, UseEffect } from '@/shared/types'

type UseIntersectionObserverEffectOptions = {
  /**
   * Observe target
   */
  target: Target<Element>

  /**
   * Observe callback
   */
  callback: IntersectionObserverCallback

  /**
   * `IntersectionObserver` options
   */
  options?: IntersectionObserverInit | undefined
}

/**
 * Effect for `IntersectionObserver` that disconnect automatically when unmount
 * @param options - `IntersectionObserver` args
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @example
 * ```tsx
 * const target = useRef<Element>(null)
 * useIntersectionObserverEffect({
 *   target,
 *   callback: (entry) => {
 *     // intersection callback
 *   }
 * })
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-useintersectionobservereffect
 * @beta
 */
const useIntersectionObserverEffect: UseEffect<UseIntersectionObserverEffectOptions> =
  ({ target, callback, options }, deps, condition) => {
    useConditionalEffect(
      () => {
        const _target = takeTarget(target)
        if (!_target) return

        const observer = new IntersectionObserver(callback, options)
        observer.observe(_target)

        return () => observer.disconnect()
      },
      deps,
      condition
    )
  }

export { useIntersectionObserverEffect }
export type { UseIntersectionObserverEffectOptions }
