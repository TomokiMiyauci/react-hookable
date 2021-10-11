/* eslint-disable react-hooks/exhaustive-deps */
import type { MutableRefObject } from 'react'
import { useEffect } from 'react'

import { useRefArray } from '@/shared'
import { EventLoopDefaultOptions } from '@/shared/constants'
import type { EventLoopOptions } from '@/shared/types'
import type { AnyFn, VFn } from '@/utils/types'

/**
 * Types of `useTimeout` return values
 */
type UseTimeoutReturn = {
  /**
   * Invoke `setTimeout`
   */
  use: (invoke: AnyFn, ms: number) => void
  /**
   * Invoke `clearTimeout` safety
   */
  disuse: VFn
  /**
   * Timers `ref`
   *
   * This is used for edge cases.
   */
  _ref: MutableRefObject<ReturnType<typeof setTimeout>[]>
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
}: EventLoopOptions = EventLoopDefaultOptions): UseTimeoutReturn => {
  const { _ref, add, clear } = useRefArray<ReturnType<typeof setTimeout>>()

  const use = (invoke: AnyFn, ms: number): void => add(setTimeout(invoke, ms))

  const disuse: VFn = () => {
    _ref.current.forEach((timer) => {
      clearTimeout(timer)
    })
    clear()
  }

  useEffect(
    () => () => {
      if (clearAuto) {
        disuse()
      }
    },
    [clearAuto]
  )

  return {
    use,
    disuse,
    _ref
  }
}

export { useTimeout }
export type { UseTimeoutReturn }
