import type { RefObject } from 'react'
import { useRef } from 'react'

import type {
  UseSwipeEffectDispatch,
  UseSwipeEffectState
} from '@/useSwipeEffectState'
import { useSwipeEffectState } from '@/useSwipeEffectState'

type SwipeProps<T extends HTMLElement | SVGElement> = {
  children: (
    stateSet: UseSwipeEffectState &
      UseSwipeEffectDispatch & { ref: RefObject<T> }
  ) => JSX.Element
  onSwipeStart?: (
    ev: TouchEvent,
    stateSet: UseSwipeEffectState &
      UseSwipeEffectDispatch & { ref: RefObject<T> }
  ) => void
  onSwipe?: (
    ev: TouchEvent,
    stateSet: UseSwipeEffectState &
      UseSwipeEffectDispatch & { ref: RefObject<T> }
  ) => void
  onSwipeEnd?: (
    ev: TouchEvent,
    stateSet: UseSwipeEffectState &
      UseSwipeEffectDispatch & { ref: RefObject<T> }
  ) => void
}

/**
 * Reactive swipe state wrapper
 * @param props - Swipe props
 *
 * @beta
 */
const Swipe = <T extends HTMLElement | SVGElement>({
  children,
  onSwipe,
  onSwipeEnd,
  onSwipeStart
}: SwipeProps<T>): JSX.Element => {
  const ref = useRef<T>(null)
  const [state, dispatch] = useSwipeEffectState(
    {
      target: ref,
      onSwipe: (ev) => onSwipe?.(ev, stateSet),
      onSwipeEnd: (ev) => onSwipeEnd?.(ev, stateSet),
      onSwipeStart: (ev) => onSwipeStart?.(ev, stateSet)
    },
    []
  )
  const stateSet = { ...state, ...dispatch, ref }
  const Children = children(stateSet)

  return Children
}

export default Swipe

export type { SwipeProps }
