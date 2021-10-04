import { useState } from 'react'

import type { Noop } from '@/utils/types'
/**
 * Hooks for switchable `boolean` function
 * @param initialState - default:`false`
 * @returns A stateful value, and a named `on`, `off` and `toggle` function to update it.
 *
 * @example
 * ```ts
 * const [state, { on, off, toggle }] = useBoolean()
 * on()
 * state // true
 * off()
 * state // false
 * toggle()
 * state // true
 * toggle()
 * state // false
 * ```
 */
const useBoolean = (
  initialState: boolean | (() => boolean) = false
): [boolean, { on: Noop; off: Noop; toggle: Noop }] => {
  const [state, setState] = useState<boolean>(initialState)

  const on: Noop = () => setState(true)
  const off: Noop = () => setState(false)
  const toggle: Noop = () => setState(!state)

  return [state, { on, off, toggle }]
}

export { useBoolean }
