import type { UseEffect } from '@/shared/types'
import { useConditionalEffect } from '@/useConditionalEffect'
import type { VFn } from '@/utils/types'

type UseTimeoutEffectOptions = {
  callback: VFn
  ms?: number
}

/**
 * `Timeout` effect
 * @param options - Timeout options
 * @param deps - If present, effect will only activate if the values in the list change
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
