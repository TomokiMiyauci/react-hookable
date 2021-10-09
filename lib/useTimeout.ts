import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

import type { AnyFn, VFn } from '@/utils/types'

type Timeout = ReturnType<typeof setTimeout>
const useTimeoutDefaultOptions: UseTimeoutOptions = {
  clearAuto: true
}

/**
 * Types of `useTimeout` first arg
 */
type UseTimeoutOptions = {
  /**
   * Whether to automatically clear the timeout timer when unmount
   * @defaultValue `true`
   */
  clearAuto: boolean
}

/**
 * Types of `useTimeout` return values
 */
type UseTimeoutReturn = {
  /**
   * Invoke `setTimeout` universally
   */
  set: (invoke: AnyFn, ms: number) => void
  /**
   * Invoke `clearTimeout` safety
   */
  clear: VFn
  /**
   * Timers `ref`
   *
   * This is used for edge cases.
   */
  _ref: MutableRefObject<Timeout[]>
}

/**
 * Safe timeout function that provides named timer setter and clearer, auto clear timer when unmounted
 * @param options - Timeout options
 * @returns A stateful timers ref value, and a named `set` and `clear` function to use timeout
 *
 * @example
 * ```tsx
 * const { set, clear } = useTimeout()
 * const handleClick = () => {
 *   set(() => alert('timeout', 1000))
 *   clear(() => console.log('timeout', 2000))
 * }
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/procedure-usetimeout
 * @beta
 */
const useTimeout = ({
  clearAuto
}: UseTimeoutOptions = useTimeoutDefaultOptions): UseTimeoutReturn => {
  const timers = useRef<Timeout[]>([])

  const set = (invoke: AnyFn, ms: number): void => {
    timers.current.push(setTimeout(invoke, ms))
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

  return {
    set,
    clear,
    _ref: timers
  }
}

export { useTimeout, useTimeoutDefaultOptions }
export type { UseTimeoutOptions }
