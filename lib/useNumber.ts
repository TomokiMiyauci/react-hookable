import { useReducer } from 'react'

import type { Reducer } from 'react'

type ActionTypesOfUseNumber = 'increment' | 'decrement' | 'set'
type StateUpdater = {
  inc: (delta?: number) => void
  dec: (delta?: number) => void
  set: (value: number) => void
}

const reducer: Reducer<
  number,
  { type: ActionTypesOfUseNumber; payload?: number }
> = (state, { type, payload }) => {
  switch (type) {
    case 'increment':
      return state + (payload ?? 1)

    case 'decrement':
      return state - (payload ?? 1)

    case 'set': {
      return payload ?? 0
    }
  }
}
/**
 * Hooks for basic number counter
 * @param initialState - The initial value
 * @returns A stateful value, and a named functions to update it
 *
 * @example
 * ```tsx
 * const [state, { inc, dec, set }] = useNumber()
 * // state(default): 0
 * inc()
 * // state: 1
 * inc(5)
 * // state: 6
 * dec()
 * // state: 5
 * dec(5)
 * // state: 0
 * set(100)
 * set(100)// state: 100
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/state-usenumber
 * @beta
 */
const useNumber = (
  /**
   * @defaultValue 0
   */
  initialState = 0
): [number, StateUpdater] => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return [
    state,
    {
      inc: (delta?: number): void =>
        dispatch({
          type: 'increment',
          payload: delta
        }),
      dec: (delta?: number): void =>
        dispatch({
          type: 'decrement',
          payload: delta
        }),

      set: (value: number): void =>
        dispatch({
          type: 'set',
          payload: value
        })
    }
  ]
}

export { reducer, useNumber }
export type { ActionTypesOfUseNumber, StateUpdater }
