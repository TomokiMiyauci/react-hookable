import type { RefAttributes } from 'react'
import { useRef } from 'react'

import { useSwipeEffectState } from '@/useSwipeEffectState'
import {
  UseSwipeEffectDispatch,
  UseSwipeEffectState
} from '@/useSwipeEffectState'

type SwipeProps = {
  children: (
    stateSet: UseSwipeEffectState & UseSwipeEffectDispatch
  ) => JSX.Element
  onSwipeStart?: (
    ev: TouchEvent,
    stateSet: UseSwipeEffectState & UseSwipeEffectDispatch
  ) => void
  onSwipe?: (
    ev: TouchEvent,
    stateSet: UseSwipeEffectState & UseSwipeEffectDispatch
  ) => void
  onSwipeEnd?: (
    ev: TouchEvent,
    stateSet: UseSwipeEffectState & UseSwipeEffectDispatch
  ) => void
}

/**
 * Reactive swipe state wrapper
 * @param props - Swipe props
 *
 * @beta
 */
const Swipe = ({
  children,
  onSwipe,
  onSwipeEnd,
  onSwipeStart
}: SwipeProps): JSX.Element => {
  const ref = useRef<HTMLElement | SVGElement>(null)
  const [state, dispatch] = useSwipeEffectState(
    {
      target: ref,
      onSwipe: (ev) => onSwipe?.(ev, stateSet),
      onSwipeEnd: (ev) => onSwipeEnd?.(ev, stateSet),
      onSwipeStart: (ev) => onSwipeStart?.(ev, stateSet)
    },
    []
  )
  const stateSet = { ...state, ...dispatch }

  const Children = children(stateSet) as JSX.Element &
    RefAttributes<HTMLElement | SVGElement>
  Children.ref = ref

  return Children
}

export default Swipe

export type { SwipeProps }
