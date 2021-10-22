import { useState } from 'react'

import type { VFn } from '@/utils/types'

/**
 * Stateful state
 */
type State = boolean

/**
 * Functions to update state
 */
type StateUpdater = { on: VFn; off: VFn; toggle: VFn }

/**
 * Hooks for switchable `boolean` function
 * @param initialState - The initial value (or a function that returns the initial value)
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
  /**
   * @defaultValue false
   */
  initialState: boolean | (() => boolean) = false
): [State, StateUpdater] => {
  const [state, setState] = useState<boolean>(initialState)

  const on: VFn = () => setState(true)
  const off: VFn = () => setState(false)
  const toggle: VFn = () => setState((state) => !state)

  return [state, { on, off, toggle }]
}

export { useBoolean }
export type { State, StateUpdater }
