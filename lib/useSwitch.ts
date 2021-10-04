import { useState } from 'react'

/**
 * Hooks for switchable named function
 * @param initialState - default:`false`
 * @returns A stateful value, and a named `on` and `off` function to update it.
 *
 * @example
 * ```ts
 * const [state, { on, off }] = useSwitch()
 * on() // true
 * state // true
 * off() // false
 * state // false
 * ```
 */
const useSwitch = (
  initialState: boolean | (() => boolean) = false
): [boolean, { on: () => true; off: () => false }] => {
  const [state, setState] = useState<boolean>(initialState)
  const on = (): true => {
    setState(true)
    return true
  }
  const off = (): false => {
    setState(false)
    return false
  }

  return [state, { on, off }]
}

export { useSwitch }
