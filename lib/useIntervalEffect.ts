import { useConditionalEffect } from '@/useConditionalEffect'

import type { UseEffect } from '@/shared/types'

type UseIntervalEffectOptions = {
  /**
   * A function to be executed every delay milliseconds
   */
  callback: Parameters<typeof setInterval>[0]

  /**
   * The time, in milliseconds (thousandths of a second), the timer should delay in between executions of the specified function or code.
   */
  ms?: Parameters<typeof setInterval>[1]
}

/**
 * Effect for `setInterval` that clear automatically when unmount
 * @param options - `setInterval` options
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.

 * @example
 * ```tsx
 * useIntervalEffect({
 *   callback: () => {
 *     // setInterval
 *   },
 *   ms: 1000 // ms
 * })
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-useintervaleffect
 * @beta
 */
const useIntervalEffect: UseEffect<UseIntervalEffectOptions> = (
  { callback, ms },
  deps,
  condition
) => {
  useConditionalEffect(
    () => {
      const timerId = setInterval(callback, ms)

      return () => clearInterval(timerId)
    },
    deps,
    condition
  )
}

export { useIntervalEffect }
export type { UseIntervalEffectOptions }
