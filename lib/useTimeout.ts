import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

import type { AnyFn, VFn } from '@/utils/types'

type Timeout = ReturnType<typeof setTimeout>
const useTimeoutDefaultOptions: UseTimeoutOptions = {
  clearAuto: true
}

type UseTimeoutOptions = {
  /**
   * Whether to automatically clear the timeout timer when unmount
   * @defaultValue `true`
   */
  clearAuto: boolean
}

/**
 * Safe timeout function that provides named timer setter and clearer, auto clear timer when unmounted
 * @param options - Timeout options
 * @returns A stateful timers ref value, and a named `add` and `clear` function to use timeout
 *
 * @example
 * ```tsx
 * const [, { add, clear }] = useTimeout()
 * const handleClick = () => {
 *   add(() => alert('timeout', 1000))
 *   add(() => console.log('timeout', 2000))
 * }
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/utility-usetimeout
 * @beta
 */
const useTimeout = ({
  clearAuto
}: UseTimeoutOptions = useTimeoutDefaultOptions): [
  MutableRefObject<Timeout[]>,
  { clear: VFn; add: (invoke: AnyFn, ms: number) => VFn }
] => {
  const timers = useRef<Timeout[]>([])

  const add = (invoke: AnyFn, ms: number): typeof clear => {
    timers.current.push(setTimeout(invoke, ms))
    return clear
  }
  const clear: VFn = () => {
    timers.current.forEach((timer) => {
      clearTimeout(timer)
    })
    timers.current = []
  }

  useEffect(
    () => () => {
      if (clearAuto) {
        clear()
      }
    },
    [clearAuto]
  )

  return [
    timers,
    {
      add,
      clear
    }
  ]
}

export { useTimeout, useTimeoutDefaultOptions }
export type { UseTimeoutOptions }
