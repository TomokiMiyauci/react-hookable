/* eslint-disable @typescript-eslint/no-explicit-any */
import { useConditionalEffect } from '@/useConditionalEffect'

import type { UseEffect } from '@/shared/types'

type UseFetchEffectOptions = {
  /**
   * This defines the resource that you wish to fetch
   */
  input: RequestInfo

  /**
   * An object containing any custom settings that you want to apply to the request
   */
  init?: RequestInit

  /**
   * Called when the fetch request succeeds
   */
  onResolve?: (res: Response) => PromiseLike<void> | void

  /**
   * Called when fetch request has aborted
   */
  onAbort?: (e: Error) => PromiseLike<void> | void

  /**
   * Called when a fetch request fails except for abort
   */
  onReject?: (reason: any) => PromiseLike<void> | void

  /**
   * Called at the end of the promise chain
   */
  onFinally?: () => PromiseLike<void> | void
}

/**
 * Effect for `fetch` API that abort automatically when unmount
 * @param options - `Fetch` options
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @example
 * ```tsx
 * useFetchEffect(
 *   {
 *     input: 'URL',
 *     onResolve: (res) => {},
 *     onAbort: (e) => {},
 *     onReject: (e) => {},
 *     onFinally: () => {}
 *   },
 *   deps,
 *   condition
 * )
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-usefetcheffect
 * @beta
 */
const useFetchEffect: UseEffect<UseFetchEffectOptions> = (
  { input, init, onResolve, onAbort, onReject, onFinally },
  deps,
  condition
) => {
  const abortController = new AbortController()

  useConditionalEffect(
    () => {
      const res = fetch(input, {
        signal: abortController.signal,
        ...init
      })

      res
        .catch((e: Error) => {
          if (e.name === 'AbortError') {
            return onAbort?.(e)
          } else {
            throw e
          }
        })
        .then((res) => {
          if (!res) return
          return onResolve?.(res)
        })
        .catch(onReject)
        .finally(onFinally)

      return () => {
        abortController.abort()
      }
    },
    deps,
    condition
  )
}

export { useFetchEffect }
export type { UseFetchEffectOptions }
