import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import { useIsUnmounted } from '@/useIsUnmounted'

/**
 * Update the state only while mounted `useState`
 * @param initialState - initialState — The initial value (or a function that returns the initial value)
 * @returns Returns a stateful value, and a function to update it.
 * @example
 * ```tsx
 * const [state, setState] = useSafeState()
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/enhancement-usesafestate
 * @beta
 */
const useSafeState = <S = undefined>(
  initialState?: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const [state, _setState] = useState(initialState)
  const isUnmounted = useIsUnmounted()

  const setState: typeof _setState = (state) => {
    if (!isUnmounted.current) {
      _setState(state)
    }
  }

  return [state, setState] as never
}

export { useSafeState }
