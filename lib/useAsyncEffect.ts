import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

import type { VFn } from '@/utils/types'

type AsyncEffectCallback = () => Promise<void | VFn>

/**
 * Hooks for asynchronous `useEffect`
 * @param effect - Any function that can return a cleanup function
 * @param deps -  If present, effect will only activate if the values in the list change
 *
 * @example
 * ```ts
 * useAsyncEffect(async () => {
 *   const { run } = await import('any/module')
 *   run()
 * })
 *
 * @see https://react-hookable.vercel.app/?path=/story/enhancement-useasynceffect
 * @beta
 * ```
 */
const useAsyncEffect = (
  effect: EffectCallback | AsyncEffectCallback,
  deps?: DependencyList | undefined
): void => {
  const ref = useRef<VFn>()

  useEffect(() => {
    Promise.resolve(effect()).then((destructor) => {
      if (typeof destructor !== 'function') return
      ref.current = destructor
    })

    return (): void => {
      ref.current?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { useAsyncEffect }
