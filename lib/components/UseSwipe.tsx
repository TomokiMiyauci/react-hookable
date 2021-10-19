import type { RefObject } from 'react'
import { useRef } from 'react'

import type {
  UseSwipeEffectDispatch,
  UseSwipeEffectState
} from '@/useSwipeEffectState'
import { useSwipeEffectState } from '@/useSwipeEffectState'
import type { Maybe } from '@/utils/types'

type UseSwipeProps<
  T extends HTMLElement | SVGElement,
  X extends Maybe<Window | Document | (() => Window | Document)> = undefined
> = {
  children: (
    stateSet: UseSwipeEffectState &
      UseSwipeEffectDispatch &
      (X extends undefined ? { ref: RefObject<T> } : { ref: never })
  ) => JSX.Element
  target?: X
  onSwipeStart?: (
    ev: TouchEvent,
    stateSet: UseSwipeEffectState &
      UseSwipeEffectDispatch &
      (X extends undefined ? { ref: RefObject<T> } : { ref: never })
  ) => void
  onSwipe?: (
    ev: TouchEvent,
    stateSet: UseSwipeEffectState &
      UseSwipeEffectDispatch &
      (X extends undefined ? { ref: RefObject<T> } : { ref: never })
  ) => void
  onSwipeEnd?: (
    ev: TouchEvent,
    stateSet: UseSwipeEffectState &
      UseSwipeEffectDispatch &
      (X extends undefined ? { ref: RefObject<T> } : { ref: never })
  ) => void
}

/**
 * Reactive swipe state wrapper
 * @param props - Swipe props
 *
 * @example
 * ```tsx
 * <UseSwipe onSwipe={(ev, stateState) => {}}>
 *   {({ isSwiping, lengthY, ref }) => (
 *     <div>
 *       <div ref={ref}></div>
 *     </div>
 *   )}
 * </UseSwipe>
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/component-useswipe
 * @beta
 */
const UseSwipe = <
  T extends HTMLElement | SVGElement,
  X extends Maybe<Window | Document | (() => Window | Document)> = undefined
>({
  children,
  target,
  onSwipe,
  onSwipeEnd,
  onSwipeStart
}: UseSwipeProps<T, X>): JSX.Element => {
  const ref = useRef<T>(null)
  const [state, dispatch] = useSwipeEffectState(
    {
      target: target ?? ref,
      onSwipe: (ev) => onSwipe?.(ev, stateSet),
      onSwipeEnd: (ev) => onSwipeEnd?.(ev, stateSet),
      onSwipeStart: (ev) => onSwipeStart?.(ev, stateSet)
    },
    []
  )
  const stateSet: UseSwipeEffectState &
    UseSwipeEffectDispatch &
    (X extends undefined
      ? {
          ref: RefObject<T>
        }
      : {
          ref: never
        }) = {
    ...state,
    ...dispatch,
    ref: (target ? { ref: {} } : ref) as never
  }
  const Children = children(stateSet)

  return Children
}

export default UseSwipe

export type { UseSwipeProps }
