import { useState } from 'react'

import { AnyFn } from '@/utils/types'
type UseSequenceStateReturn = [boolean, (fn: AnyFn) => Promise<void>]

/**
 * Prevents other processes from running until the end of the process. This is ideal for preventing chattering.
 * @returns Set of state of pending and sequence function
 *
 * @example
 * ```tsx
 * const [pending, sequence] = useSequenceState()
 * // pending: false
 * sequence(AnyFn)
 * // pending: true
 * sequence(AnyFn) // not call
 * // End of function processing
 * // pending: false
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/stateset-usesequencestate
 * @beta
 */
const useSequenceState = (): UseSequenceStateReturn => {
  const [pending, setPending] = useState<boolean>(false)

  const use = async (fn: AnyFn) => {
    if (pending) return
    setPending(true)
    try {
      await fn()
    } finally {
      setPending(false)
    }
  }

  return [pending, use]
}

export { useSequenceState }
