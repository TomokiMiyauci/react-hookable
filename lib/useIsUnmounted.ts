import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

/**
 * Ref of isUnmounted or not
 * @returns Ref of `boolean`
 *
 * @example
 * ```tsx
 * const isUnmounted = useIsUnmounted()
 * isUnmounted.current // false
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/lifecycle-useisunmounted
 * @see https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 * @beta
 */
const useIsUnmounted = (): MutableRefObject<boolean> => {
  const isMounted = useRef<boolean>(false)

  useEffect(
    () => () => {
      isMounted.current = true
    },
    []
  )

  return isMounted
}

export { useIsUnmounted }
