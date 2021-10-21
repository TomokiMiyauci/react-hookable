import { useConditionalEffect } from '@/useConditionalEffect'

import type { UseEffect } from '@/shared/types'
import type { VFn } from '@/utils/types'

type UseTimeoutEffectOptions = {
  /**
   * A function to be executed after delay milliseconds
   */
  callback: VFn

  /**
   * The time, in milliseconds (thousandths of a second), the timer should delay
   */
  ms?: number
}

/**
 * `Timeout` effect
 * @param options - Timeout options
 * @param deps - If present, effect will only activate if the values in the list change.
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 *
 * @example
 * ```tsx
 * useTimeoutEffect(
 *   {
 *     callback: SyncFn,
 *     ms: 1000
 *   },
 *   deps,
 *   condition
 * )
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-usetimeouteffect
 * @beta
 */
const useTimeoutEffect: UseEffect<UseTimeoutEffectOptions> = (
  { callback, ms },
  deps,
  condition
) => {
  useConditionalEffect(
    () => {
      const timeoutId = setTimeout(callback, ms)

      return () => clearTimeout(timeoutId)
    },
    deps,
    condition
  )
}

export { useTimeoutEffect }
export type { UseTimeoutEffectOptions }
