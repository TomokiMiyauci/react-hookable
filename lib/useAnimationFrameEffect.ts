import { useConditionalEffect } from '@/useConditionalEffect'

import type { UseEffect } from '@/shared/types'

type UseAnimationFrameEffectOptions = {
  /**
   * The function to call when it's time to update your animation for the next repaint
   */
  callback: FrameRequestCallback
}

/**
 * Effect for `requestAnimationFrame` that clear automatically when unmount
 * @param options - `requestAnimationFrame` options
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 *
 * @example
 * ```tsx
 * useAnimationFrameEffect({
 *   callback: () => {
 *     // requestAnimationFrame
 *   }
 * })
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-useanimationframeeffect
 * @beta
 *
 */
const useAnimationFrameEffect: UseEffect<UseAnimationFrameEffectOptions> = (
  { callback },
  deps,
  condition
) => {
  useConditionalEffect(
    () => {
      const requestID = requestAnimationFrame(callback)

      return () => cancelAnimationFrame(requestID)
    },
    deps,
    condition
  )
}

export { useAnimationFrameEffect }
export type { UseAnimationFrameEffectOptions }
