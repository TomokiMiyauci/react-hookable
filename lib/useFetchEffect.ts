import { useConditionalEffect } from '@/useConditionalEffect'

import type { UseEffect } from '@/shared/types'
const useFetchEffect: UseEffect<{
  input: RequestInfo
  init?: RequestInit
  onResolve?: (res: Response) => PromiseLike<void> | void
  onAbort?: (e: Error) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReject?: (reason: any) => PromiseLike<void> | void
  onFinally?: () => void
}> = (
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
            onAbort?.(e)
          } else {
            throw e
          }
        })
        .then((res) => {
          if (!res) return
          onResolve?.(res)
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
