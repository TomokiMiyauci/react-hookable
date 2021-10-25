import { useMemo } from 'react'

import { cleanClassName, takeTarget } from '@/shared'
import { useTransitionTimingEffect } from '@/useTransitionTimingEffect'

import type { Target, UseEffect } from '@/shared/types'

const useClassMemo = (className?: string): string[] =>
  useMemo(() => cleanClassName(className ?? ''), [className])

const addClassList = (
  target: Target<HTMLElement | SVGElement>,
  ...tokens: string[]
): void => takeTarget(target)?.classList.add(...tokens)

const removeClassList = (
  target: Target<HTMLElement | SVGElement>,
  ...tokens: string[]
): void => takeTarget(target)?.classList.remove(...tokens)

type Enter = 'enter'
type Leave = 'leave'
type From = 'From'
type To = 'To'

type Transition =
  | Enter
  | `${Enter}${From}`
  | `${Enter}${To}`
  | Leave
  | `${Leave}${From}`
  | `${Leave}${To}`

type TransitionClassName = Record<Transition, string>

type UseTransitionEffectOptions = {
  target: Target<HTMLElement | SVGElement>
} & Partial<TransitionClassName>

/**
 *
 * @example
 * ```tsx
 *
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-usetransitioneffect
 * @beta
 */
const useTransitionEffect: UseEffect<UseTransitionEffectOptions> = ({
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  target
}) => {
  const _enter = useClassMemo(enter)
  const _enterTo = useClassMemo(enterTo)
  const _enterFrom = useClassMemo(enterFrom)
  const _leave = useClassMemo(leave)
  const _leaveTo = useClassMemo(leaveTo)
  const _leaveFrom = useClassMemo(leaveFrom)

  useTransitionTimingEffect({
    target,
    show: undefined,
    onBeforeEnter: () => addClassList(target, ..._enterFrom),

    onEnter: () => {
      removeClassList(target, ..._enterFrom)
      addClassList(target, ..._enterTo, ..._enter)
    },
    onAfterEnter: () => removeClassList(target, ..._enterTo, ..._enter),

    onBeforeLeave: () => addClassList(target, ..._leaveFrom),

    onLeave: () => {
      removeClassList(target, ..._leaveFrom)
      addClassList(target, ..._leaveTo, ..._leave)
    },

    onAfterLeave: () => {
      removeClassList(target, ..._leaveTo, ..._leave)
      const ref = takeTarget(target)
      if (ref) {
        ref.style.display = 'none'
      }
    }
  })
}

export { useTransitionEffect }
export type { UseTransitionEffectOptions, TransitionClassName, Transition }
