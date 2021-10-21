import { useState } from 'react'

import type { VFn } from '@/utils/types'

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
 *
 * @see https://react-hookable.vercel.app/?path=/story/state-useboolean
 * @beta
 */
const useBoolean = (
  initialState: boolean | (() => boolean) = false
): [boolean, { on: VFn; off: VFn; toggle: VFn }] => {
  const [state, setState] = useState<boolean>(initialState)

  const on: VFn = () => setState(true)
  const off: VFn = () => setState(false)
  const toggle: VFn = () => setState(!state)

  return [state, { on, off, toggle }]
}

export { useBoolean }
