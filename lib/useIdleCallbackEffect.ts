import { useConditionalEffect } from '@/useConditionalEffect'

import type { UseEffect } from '@/shared/types'
import type { EffectCallback } from 'react'

type UseIdleCallbackEffectOptions = {
  /**
   * A reference to a function that should be called in the near future, when the event loop is idle
   */
  callback: IdleRequestCallback

  /**
   * Called if `requestIdleCallback` is not supported
   */
  fallback?: EffectCallback

  /**
   * Contains optional configuration parameters
   */
  options?: IdleRequestOptions
}

/**
 * Effect for `requestIdleCallback` with fallback that clear automatically when unmount
 * @param options - requestIdleCallback options
 * @param deps - If present, effect will only activate if the values in the list change.
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @example
 * ```tsx
 * useIdleCallbackEffect(
 *  {
 *    callback: () => {
 *      // requestIdleCallback
 *    },
 *    fallback: () => {
 *      // call when requestIdleCallback is not supported
 *    },
 *    options
 *  },
 *  deps,
 *  condition
 * )
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-useidlecallbackeffect
 * @beta
 */
const useIdleCallbackEffect: UseEffect<UseIdleCallbackEffectOptions> = (
  { callback, fallback, options },
  deps,
  condition
) => {
  useConditionalEffect(
    () => {
      const isSupport = 'requestIdleCallback' in window
      if (isSupport) {
        const id = requestIdleCallback(callback, options)

        return () => cancelIdleCallback(id)
      } else {
        return fallback?.()
      }
    },
    deps,
    condition
  )
}

export { useIdleCallbackEffect }
export type { UseIdleCallbackEffectOptions }
