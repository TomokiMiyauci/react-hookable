import { useTransitionStart } from '@/_/useTransitionStart'

import type { UseEffect } from '@/shared/types'
import type { VFn } from '@/utils/types'
import type { RefObject } from 'react'

type Timing =
  | 'onBeforeEnter'
  | 'onEnter'
  | 'onAfterEnter'
  | 'onBeforeLeave'
  | 'onLeave'
  | 'onAfterLeave'

type TransitionTiming = Record<Timing, VFn>

type UseTransitionTimingEffectOptions = {
  target: RefObject<HTMLElement | SVGElement>
  show?: boolean
} & Partial<TransitionTiming>

/**
 *
 * @example
 * ```tsx
 *
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-usetransitiontimingeffect
 * @beta
 */
const useTransitionTimingEffect: UseEffect<UseTransitionTimingEffectOptions> =
  ({
    target,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    show
  }) => {
    useTransitionStart(
      {
        target,
        onStart: onBeforeEnter,
        onMiddle: onEnter,
        onEnd: onAfterEnter
      },
      [show],
      () => !show
    )

    useTransitionStart(
      {
        target,
        onStart: onBeforeLeave,
        onMiddle: onLeave,
        onEnd: onAfterLeave
      },
      [show],
      () => show
    )
  }

export { useTransitionTimingEffect }
export type { UseTransitionTimingEffectOptions }
