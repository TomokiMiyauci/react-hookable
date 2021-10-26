import { useMemo, useRef, useEffect, useLayoutEffect } from 'react'

import {
  cleanSplittedClassName,
  takeTarget,
  useUniversalEffect
} from '@/shared'
import { useConditionalEffect } from '@/useConditionalEffect'
import { useIsFirstMountRef } from '@/useIsFirstMountRef'
import { useTransitionTimingEffect } from '@/useTransitionTimingEffect'
import { isBrowser } from '@/utils'

import type { Target, UseEffect } from '@/shared/types'

const useClassMemo = (className?: string): string[] =>
  useMemo<string[]>(() => cleanSplittedClassName(className ?? ''), [className])

const addClassList = (
  target: Target<HTMLElement | SVGElement>,
  ...tokens: string[]
): void => {
  if (tokens.length) {
    takeTarget(target)?.classList.add(...tokens)
  }
}

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
  show?: boolean
} & Partial<TransitionClassName>

/**
 * Effect for transition
 * @param options - transition options
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @example
 * ```tsx
 * useTransitionEffect(
 *   {
 *     target: ref,
 *     enterFrom,
 *     enter,
 *     enterTo,
 *     leaveFrom,
 *     leave,
 *     leaveTo
 *   },
 *   deps,
 *   condition
 * )
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
  target,
  show
}) => {
  const _enter = useClassMemo(enter)
  const _enterTo = useClassMemo(enterTo)
  const _enterFrom = useClassMemo(enterFrom)
  const _leave = useClassMemo(leave)
  const _leaveTo = useClassMemo(leaveTo)
  const _leaveFrom = useClassMemo(leaveFrom)

  const classNameToken = useRef<string[]>([])
  useUniversalEffect(() => {
    const ref = takeTarget(target)

    if (!ref) return
    classNameToken.current = cleanSplittedClassName(ref.classList.value)
  }, [])

  const cleanUp = (): void => {
    removeClassList(
      target,
      ..._enter,
      ..._enterTo,
      ..._enterFrom,
      ..._leave,
      ..._leaveTo,
      ..._leaveFrom
    )
    if (classNameToken.current.length) {
      addClassList(target, ...classNameToken.current)
    }
  }

  const { isFirstMount } = useIsFirstMountRef()
  useConditionalEffect(
    () => {
      const ref = takeTarget(target)
      if (ref) {
        ref.style.display = 'none'
      }
    },
    [],
    () => isFirstMount && show === false,
    isBrowser ? useLayoutEffect : useEffect
  )

  useTransitionTimingEffect(
    {
      target,
      entered: show,
      onBeforeEnter: () => {
        cleanUp()
        const ref = takeTarget(target)
        if (ref && ref.style.display === 'none') {
          ref.style.display = ''
        }
        addClassList(target, ..._enterFrom)
      },

      onEnter: () => {
        removeClassList(target, ..._enterFrom)
        addClassList(target, ...classNameToken.current)
        addClassList(target, ..._enterTo, ..._enter)
      },
      onAfterEnter: () => {
        removeClassList(target, ..._enterTo, ..._enter)
        addClassList(target, ...classNameToken.current)
      },

      onBeforeLeave: () => {
        cleanUp()
        addClassList(target, ..._leaveFrom)
      },

      onLeave: () => {
        removeClassList(target, ..._leaveFrom)
        addClassList(target, ...classNameToken.current)
        addClassList(target, ..._leaveTo, ..._leave)
      },

      onAfterLeave: () => {
        removeClassList(target, ..._leaveTo, ..._leave)
        addClassList(target, ...classNameToken.current)

        const ref = takeTarget(target)
        if (ref) {
          ref.style.display = 'none'
        }
      }
    },
    []
  )
}

export { useTransitionEffect }
export type { UseTransitionEffectOptions, TransitionClassName, Transition }
