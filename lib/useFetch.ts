import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

import { useUnmount } from '@/useUnmount'

type UseFetchReturn = {
  use: typeof fetch
  _ref: MutableRefObject<AbortController>
}

/**
 * Safe fetch hooks that abort http request on unmount
 * @returns `use` function that almost identical to `fetch`
 *
 * @example
 * ```tsx
 * const { use: fetch } = useFetch()
 * fecth(input, requestInit).catch((e: Error) => {
 *   if (e.name === 'AbortError') {
 *     // catch abort error
 *   }
 * })
 *
 * // unmount
 * // fetch will abort automatically
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/procedure-usefetch
 * @beta
 */
const useFetch = (): UseFetchReturn => {
  const abortController = useRef<AbortController>(new AbortController())

  const { use: onUnmount } = useUnmount()

  onUnmount(() => {
    abortController.current.abort()
  })

  const use: typeof fetch = (input, init) =>
    fetch(input, { signal: abortController.current.signal, ...init })

  useEffect(
    () => () => {
      abortController.current.abort()
    },
    []
  )

  return { use, _ref: abortController }
}

export { useFetch }
export type { UseFetchReturn }
