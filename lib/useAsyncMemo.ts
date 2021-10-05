import { DependencyList, useEffect, useState } from 'react'
import { useRef } from 'react'

/**
 * `useAsyncMemo` will only recompute the memoized `async` value when one of the deps has changed.
 * @param factory - Memorized async function
 * @param deps - If present, effect will only activate if the values in the list change.
 * @param initialState - default:`undefined`
 * @returns If calling `useAsyncMemo` with a referentially stable async function, also give it as the input in the second argument.
 *
 * @example
 * ```tsx
 * const [email, setEmail] = useState<string>('')
 * const isValid = useAsyncMemo(async () => {
 *   if (!email) return
 *   const { default: isEmail } = await import('is-email')
 *
 *   return isEmail(email)
 * }, [email])
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/hooks-useboolean
 * @beta
 */
const useAsyncMemo = <T, K = undefined>(
  factory: () => Promise<T>,
  deps?: DependencyList,
  initialState?: K
): T | K => {
  const isUnmounted = useRef<boolean>(false)
  const [state, setState] = useState<T | K>(initialState as T | K)

  useEffect(() => {
    isUnmounted.current = false
    factory().then((value) => {
      if (isUnmounted.current) return
      setState(value)
    })

    return () => {
      isUnmounted.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}

export { useAsyncMemo }
